import { prisma } from './prisma';
import { ActivityAction } from '@prisma/client';

interface LogActivityParams {
  userId: string;
  action: ActivityAction;
  entityType: string;
  entityId?: string;
  description: string;
  metadata?: any;
  ipAddress?: string;
  userAgent?: string;
}

export async function logActivity(params: LogActivityParams) {
  try {
    await prisma.activityLog.create({
      data: {
        userId: params.userId,
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId || null,
        description: params.description,
        metadata: params.metadata || null,
        ipAddress: params.ipAddress || null,
        userAgent: params.userAgent || null,
      },
    });
  } catch (error) {
    console.error('Error logging activity:', error);
  }
}

// Helper functions for common actions
export const ActivityLogger = {
  create: (userId: string, entityType: string, entityId: string, description: string, metadata?: any) =>
    logActivity({ userId, action: 'CREATE', entityType, entityId, description, metadata }),

  update: (userId: string, entityType: string, entityId: string, description: string, metadata?: any) =>
    logActivity({ userId, action: 'UPDATE', entityType, entityId, description, metadata }),

  delete: (userId: string, entityType: string, entityId: string, description: string) =>
    logActivity({ userId, action: 'DELETE', entityType, entityId, description }),

  login: (userId: string, ipAddress?: string, userAgent?: string) =>
    logActivity({ 
      userId, 
      action: 'LOGIN', 
      entityType: 'User', 
      description: 'User logged in',
      ipAddress,
      userAgent,
    }),

  logout: (userId: string) =>
    logActivity({ userId, action: 'LOGOUT', entityType: 'User', description: 'User logged out' }),

  export: (userId: string, entityType: string, count: number) =>
    logActivity({ 
      userId, 
      action: 'EXPORT', 
      entityType, 
      description: `Exported ${count} ${entityType} records`,
    }),

  import: (userId: string, entityType: string, count: number) =>
    logActivity({ 
      userId, 
      action: 'IMPORT', 
      entityType, 
      description: `Imported ${count} ${entityType} records`,
    }),
};
