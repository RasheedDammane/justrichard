import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';

/**
 * @swagger
 * /api/test-logging:
 *   get:
 *     summary: Test logging system
 *     description: Create test logs to demonstrate the logging system
 *     tags: [Logging]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [info, warn, error, success, db-error, stats]
 *         required: false
 *         description: Type of log to create
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: false
 *         description: User ID for context
 *     responses:
 *       200:
 *         description: Log created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 type:
 *                   type: string
 *                 note:
 *                   type: string
 *       400:
 *         description: Invalid type parameter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') || 'info';
  const userId = searchParams.get('userId') || 'test-user';

  const context = {
    userId,
    path: '/api/test-logging',
    method: 'GET',
    ip: request.headers.get('x-forwarded-for') || 'unknown',
    userAgent: request.headers.get('user-agent') || 'unknown',
  };

  try {
    switch (type) {
      case 'info':
        logger.info('Test INFO log from API', context);
        return NextResponse.json({
          success: true,
          message: 'INFO log created successfully',
          type: 'INFO',
          note: 'This log is only in console, not persisted to database',
        });

      case 'warn':
        logger.warn('Test WARNING log from API', context);
        return NextResponse.json({
          success: true,
          message: 'WARN log created and persisted to database',
          type: 'WARN',
          note: 'Check /admin/logs to see this warning',
        });

      case 'error':
        const testError = new Error('This is a test error for demonstration');
        logger.error('Test ERROR log from API', testError, context);
        return NextResponse.json({
          success: true,
          message: 'ERROR log created and persisted to database',
          type: 'ERROR',
          note: 'Check /admin/logs to see this error with full stack trace',
        });

      case 'success':
        // Simulate a successful database operation with logging
        const result = await logger.wrapAsync(
          async () => {
            // Simulate some work
            await new Promise((resolve) => setTimeout(resolve, 100));
            return { data: 'Success', timestamp: new Date() };
          },
          'Failed to execute test operation',
          context
        );

        if (result) {
          logger.info('Test operation completed successfully', {
            ...context,
            result: result.data,
          });
          return NextResponse.json({
            success: true,
            message: 'Operation completed with logging',
            result,
          });
        } else {
          return NextResponse.json(
            {
              success: false,
              message: 'Operation failed',
            },
            { status: 500 }
          );
        }

      case 'db-error':
        // Simulate a database error
        await logger.wrapAsync(
          async () => {
            // This will fail because we're querying a non-existent table
            await prisma.$queryRaw`SELECT * FROM non_existent_table`;
          },
          'Database query failed in test endpoint',
          context
        );

        return NextResponse.json({
          success: true,
          message: 'Database error logged (check /admin/logs)',
          type: 'ERROR',
        });

      case 'stats':
        // Get logging statistics
        const stats = await prisma.errorLog.groupBy({
          by: ['level'],
          _count: true,
          where: {
            createdAt: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
            },
          },
        });

        const unresolvedCount = await prisma.errorLog.count({
          where: { resolved: false },
        });

        return NextResponse.json({
          success: true,
          message: 'Logging statistics',
          stats: {
            last24Hours: stats,
            unresolvedErrors: unresolvedCount,
          },
        });

      default:
        return NextResponse.json(
          {
            success: false,
            message: 'Invalid type parameter',
            validTypes: ['info', 'warn', 'error', 'success', 'db-error', 'stats'],
          },
          { status: 400 }
        );
    }
  } catch (error) {
    logger.error('Unexpected error in test-logging endpoint', error as Error, context);
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred',
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/test-logging:
 *   post:
 *     summary: Create custom log via POST
 *     description: Create a custom log entry with specified message and level
 *     tags: [Logging]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: Log message
 *                 example: Custom error message
 *               level:
 *                 type: string
 *                 enum: [info, warn, error]
 *                 description: Log level
 *                 example: error
 *               userId:
 *                 type: string
 *                 description: User ID for context
 *                 example: user-123
 *     responses:
 *       200:
 *         description: Log created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 logged:
 *                   type: object
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Server error
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, level = 'info', userId } = body;

    const context = {
      userId: userId || 'test-user',
      path: '/api/test-logging',
      method: 'POST',
      ip: request.headers.get('x-forwarded-for') || 'unknown',
    };

    switch (level.toLowerCase()) {
      case 'info':
        logger.info(message || 'Test INFO from POST', context);
        break;
      case 'warn':
        logger.warn(message || 'Test WARN from POST', context);
        break;
      case 'error':
        const error = new Error(message || 'Test ERROR from POST');
        logger.error(message || 'Test ERROR from POST', error, context);
        break;
      default:
        return NextResponse.json(
          { success: false, message: 'Invalid level' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      message: `${level.toUpperCase()} log created`,
      logged: { message, level, context },
    });
  } catch (error) {
    logger.error('Failed to process POST request', error as Error, {
      path: '/api/test-logging',
      method: 'POST',
    });
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to process request',
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
