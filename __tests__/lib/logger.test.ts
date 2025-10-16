import { logger, LogLevel, logError, logWarn, logInfo, logDebug } from '@/lib/logger';
import { prisma } from '@/lib/prisma';

// Mock Prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    errorLog: {
      create: jest.fn(),
    },
  },
}));

describe('Logger', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'info').mockImplementation();
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
    jest.spyOn(console, 'debug').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('info logging', () => {
    it('should log info messages to console', () => {
      logInfo('Test info message');
      expect(console.info).toHaveBeenCalled();
    });

    it('should log info with context', () => {
      const context = { userId: '123', path: '/test' };
      logInfo('Test info with context', context);
      expect(console.info).toHaveBeenCalled();
    });

    it('should not persist INFO logs to database', async () => {
      logInfo('Test info');
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(prisma.errorLog.create).not.toHaveBeenCalled();
    });
  });

  describe('warn logging', () => {
    it('should log warnings to console', () => {
      logWarn('Test warning');
      expect(console.warn).toHaveBeenCalled();
    });

    it('should persist WARN logs to database', async () => {
      const context = { userId: '123', path: '/api/test' };
      logWarn('Test warning', context);
      
      await new Promise((resolve) => setTimeout(resolve, 100));
      
      expect(prisma.errorLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            level: LogLevel.WARN,
            message: 'Test warning',
            userId: '123',
            path: '/api/test',
          }),
        })
      );
    });
  });

  describe('error logging', () => {
    it('should log errors to console', () => {
      const error = new Error('Test error');
      logError('Error occurred', error);
      expect(console.error).toHaveBeenCalled();
    });

    it('should persist ERROR logs to database with stack trace', async () => {
      const error = new Error('Test error');
      const context = { userId: '456', path: '/api/booking' };
      
      logError('Booking failed', error, context);
      
      await new Promise((resolve) => setTimeout(resolve, 100));
      
      expect(prisma.errorLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            level: LogLevel.ERROR,
            message: 'Booking failed',
            errorName: 'Error',
            userId: '456',
            path: '/api/booking',
            stack: expect.stringContaining('Test error'),
          }),
        })
      );
    });

    it('should handle errors without stack trace', async () => {
      const context = { path: '/test' };
      logError('Simple error', undefined, context);
      
      await new Promise((resolve) => setTimeout(resolve, 100));
      
      expect(prisma.errorLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            level: LogLevel.ERROR,
            message: 'Simple error',
            stack: null,
          }),
        })
      );
    });
  });

  describe('wrapAsync', () => {
    it('should execute async function successfully', async () => {
      const fn = jest.fn().mockResolvedValue('success');
      const result = await logger.wrapAsync(fn, 'Error message');
      
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalled();
      expect(console.error).not.toHaveBeenCalled();
    });

    it('should catch and log async errors', async () => {
      const error = new Error('Async error');
      const fn = jest.fn().mockRejectedValue(error);
      const context = { userId: '789' };
      
      const result = await logger.wrapAsync(fn, 'Async operation failed', context);
      
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('wrapSync', () => {
    it('should execute sync function successfully', () => {
      const fn = jest.fn().mockReturnValue('success');
      const result = logger.wrapSync(fn, 'Error message');
      
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalled();
      expect(console.error).not.toHaveBeenCalled();
    });

    it('should catch and log sync errors', () => {
      const error = new Error('Sync error');
      const fn = jest.fn().mockImplementation(() => {
        throw error;
      });
      const context = { path: '/sync-test' };
      
      const result = logger.wrapSync(fn, 'Sync operation failed', context);
      
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('debug logging', () => {
    it('should log debug messages', () => {
      logDebug('Debug message');
      // Debug logging behavior depends on NODE_ENV
    });

    it('should not persist DEBUG logs to database', async () => {
      logDebug('Debug message');
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(prisma.errorLog.create).not.toHaveBeenCalled();
    });
  });
});
