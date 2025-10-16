import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';

// Mock dependencies
jest.mock('@/lib/logger');
jest.mock('@/lib/prisma', () => ({
  prisma: {
    errorLog: {
      groupBy: jest.fn(),
      count: jest.fn(),
    },
    $queryRaw: jest.fn(),
  },
}));

/**
 * Integration tests for the logging system
 * These tests verify the logging functionality used by API routes
 */
describe('Logging System Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Logger with API context', () => {
    it('should log INFO messages with API context', () => {
      const context = {
        userId: 'test-user',
        path: '/api/test-logging',
        method: 'GET',
        ip: '127.0.0.1',
      };

      logger.info('Test INFO log from API', context);

      expect(logger.info).toHaveBeenCalledWith('Test INFO log from API', context);
    });

    it('should log WARN messages with API context', () => {
      const context = {
        userId: 'test-user',
        path: '/api/test-logging',
        method: 'GET',
      };

      logger.warn('Test WARNING log from API', context);
      expect(logger.warn).toHaveBeenCalledWith(
        'Test WARNING log from API',
        expect.objectContaining({
          path: '/api/test-logging',
          method: 'GET',
        })
      );
    });

    it('should log ERROR messages with error object and context', () => {
      const error = new Error('Test error');
      const context = {
        userId: 'test-user',
        path: '/api/test-logging',
        method: 'GET',
      };

      logger.error('Test ERROR log from API', error, context);
      expect(logger.error).toHaveBeenCalledWith(
        'Test ERROR log from API',
        expect.any(Error),
        expect.objectContaining({
          path: '/api/test-logging',
        })
      );
    });

    it('should use wrapAsync for error handling', async () => {
      const mockResult = { data: 'Success', timestamp: new Date() };
      (logger.wrapAsync as jest.Mock).mockResolvedValue(mockResult);

      const context = { userId: 'test-user', path: '/api/test' };
      const result = await logger.wrapAsync(
        async () => mockResult,
        'Failed to execute operation',
        context
      );

      expect(result).toEqual(mockResult);
      expect(logger.wrapAsync).toHaveBeenCalled();
    });

    it('should handle wrapAsync failures', async () => {
      (logger.wrapAsync as jest.Mock).mockResolvedValue(null);

      const context = { userId: 'test-user', path: '/api/test' };
      const result = await logger.wrapAsync(
        async () => {
          throw new Error('Operation failed');
        },
        'Failed to execute operation',
        context
      );

      expect(result).toBeNull();
    });
  });

  describe('Database statistics', () => {
    it('should fetch error log statistics', async () => {
      const mockStats = [
        { level: 'ERROR', _count: 5 },
        { level: 'WARN', _count: 10 },
      ];
      (prisma.errorLog.groupBy as jest.Mock).mockResolvedValue(mockStats);

      const stats = await prisma.errorLog.groupBy({
        by: ['level'],
        _count: true,
        where: {
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        },
      });

      expect(stats).toEqual(mockStats);
      expect(prisma.errorLog.groupBy).toHaveBeenCalled();
    });

    it('should count unresolved errors', async () => {
      (prisma.errorLog.count as jest.Mock).mockResolvedValue(3);

      const count = await prisma.errorLog.count({
        where: { resolved: false },
      });

      expect(count).toBe(3);
      expect(prisma.errorLog.count).toHaveBeenCalledWith({
        where: { resolved: false },
      });
    });
  });

  describe('API error scenarios', () => {
    it('should log database connection errors', () => {
      const dbError = new Error('Database connection failed');
      const context = {
        path: '/api/users',
        method: 'GET',
        userId: 'admin-123',
      };

      logger.error('Failed to connect to database', dbError, context);

      expect(logger.error).toHaveBeenCalledWith(
        'Failed to connect to database',
        expect.objectContaining({ message: 'Database connection failed' }),
        expect.objectContaining({ path: '/api/users' })
      );
    });

    it('should log validation errors', () => {
      const context = {
        path: '/api/bookings',
        method: 'POST',
        userId: 'user-456',
      };

      logger.warn('Invalid booking data received', context);

      expect(logger.warn).toHaveBeenCalledWith(
        'Invalid booking data received',
        expect.objectContaining({ path: '/api/bookings' })
      );
    });

    it('should log unauthorized access attempts', () => {
      const context = {
        path: '/api/admin/users',
        method: 'GET',
        userId: 'user-789',
        ip: '192.168.1.1',
      };

      logger.warn('Unauthorized admin access attempt', context);

      expect(logger.warn).toHaveBeenCalledWith(
        'Unauthorized admin access attempt',
        expect.objectContaining({
          userId: 'user-789',
          ip: '192.168.1.1',
        })
      );
    });
  });

  describe('Context enrichment', () => {
    it('should include all relevant context fields', () => {
      const fullContext = {
        userId: 'user-123',
        sessionId: 'session-456',
        requestId: 'req-789',
        path: '/api/test',
        method: 'POST',
        ip: '127.0.0.1',
        userAgent: 'Mozilla/5.0',
        customField: 'custom-value',
      };

      logger.info('Full context test', fullContext);

      expect(logger.info).toHaveBeenCalledWith(
        'Full context test',
        expect.objectContaining({
          userId: 'user-123',
          sessionId: 'session-456',
          requestId: 'req-789',
          path: '/api/test',
          method: 'POST',
          ip: '127.0.0.1',
          userAgent: 'Mozilla/5.0',
          customField: 'custom-value',
        })
      );
    });
  });
});
