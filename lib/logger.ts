import { prisma } from './prisma';

export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
}

export type LogCategory =
  | 'auth'
  | 'user'
  | 'booking'
  | 'property'
  | 'payment'
  | 'system'
  | 'admin'
  | 'notification'
  | 'other';

export type LogSource = 'api' | 'cron' | 'worker' | 'webhook' | 'job';

export interface LogContext {
  category?: LogCategory;
  source?: LogSource;
  userId?: string;
  adminId?: string;
  sessionId?: string;
  requestId?: string;
  path?: string;
  method?: string;
  statusCode?: number;
  ip?: string;
  userAgent?: string;
  [key: string]: any;
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  context?: LogContext;
  error?: Error;
  timestamp: Date;
}

class Logger {
  private static instance: Logger;
  private isDevelopment: boolean;

  private constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatLog(entry: LogEntry): string {
    const timestamp = entry.timestamp.toISOString();
    const contextStr = entry.context ? JSON.stringify(entry.context) : '';
    const errorStr = entry.error
      ? `\nError: ${entry.error.message}\nStack: ${entry.error.stack}`
      : '';
    return `[${timestamp}] [${entry.level}] ${entry.message} ${contextStr}${errorStr}`;
  }

  private async persistLog(entry: LogEntry): Promise<void> {
    try {
      // Only persist ERROR and WARN logs to database
      if (entry.level === LogLevel.ERROR || entry.level === LogLevel.WARN) {
        await prisma.errorLog.create({
          data: {
            level: entry.level,
            message: entry.message,
            context: entry.context ? JSON.stringify(entry.context) : null,
            stack: entry.error?.stack || null,
            errorName: entry.error?.name || null,
            userId: entry.context?.userId || null,
            path: entry.context?.path || null,
            method: entry.context?.method || null,
            createdAt: entry.timestamp,
          },
        });
      }
    } catch (error) {
      // Fallback to console if DB persistence fails
      console.error('Failed to persist log to database:', error);
    }
  }

  private log(level: LogLevel, message: string, context?: LogContext, error?: Error): void {
    const entry: LogEntry = {
      level,
      message,
      context,
      error,
      timestamp: new Date(),
    };

    // Console output
    const formattedLog = this.formatLog(entry);
    switch (level) {
      case LogLevel.ERROR:
        console.error(formattedLog);
        break;
      case LogLevel.WARN:
        console.warn(formattedLog);
        break;
      case LogLevel.INFO:
        console.info(formattedLog);
        break;
      case LogLevel.DEBUG:
        if (this.isDevelopment) {
          console.debug(formattedLog);
        }
        break;
    }

    // Persist to database (async, non-blocking)
    this.persistLog(entry).catch((err) => {
      console.error('Logger persistence error:', err);
    });
  }

  public info(message: string, context?: LogContext): void {
    this.log(LogLevel.INFO, message, context);
  }

  public warn(message: string, context?: LogContext): void {
    this.log(LogLevel.WARN, message, context);
  }

  public error(message: string, error?: Error, context?: LogContext): void {
    this.log(LogLevel.ERROR, message, context, error);
  }

  public fatal(message: string, error?: Error, context?: LogContext): void {
    this.log(LogLevel.FATAL, message, context, error);
  }

  // Helper method to wrap async functions with error logging
  public async wrapAsync<T>(
    fn: () => Promise<T>,
    errorMessage: string,
    context?: LogContext
  ): Promise<T | null> {
    try {
      return await fn();
    } catch (error) {
      this.error(errorMessage, error as Error, context);
      return null;
    }
  }

  // Helper method to wrap sync functions with error logging
  public wrapSync<T>(fn: () => T, errorMessage: string, context?: LogContext): T | null {
    try {
      return fn();
    } catch (error) {
      this.error(errorMessage, error as Error, context);
      return null;
    }
  }
}

// Export singleton instance
export const logger = Logger.getInstance();

// Export helper functions for common use cases
export const logError = (message: string, error?: Error, context?: LogContext) => {
  logger.error(message, error, context);
};

export const logWarn = (message: string, context?: LogContext) => {
  logger.warn(message, context);
};

export const logInfo = (message: string, context?: LogContext) => {
  logger.info(message, context);
};

export const logFatal = (message: string, error?: Error, context?: LogContext) => {
  logger.fatal(message, error, context);
};
