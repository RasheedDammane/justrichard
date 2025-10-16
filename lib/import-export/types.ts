export interface ImportOptions {
  validateOnly?: boolean;
  skipDuplicates?: boolean;
  updateExisting?: boolean;
  uploadMedia?: boolean;
}

export interface ExportOptions {
  includeMedia?: boolean;
  includeRelations?: string[];
  filters?: Record<string, any>;
  format?: 'zip' | 'json' | 'csv';
}

export interface ImportResult {
  success: number;
  failed: number;
  skipped: number;
  updated: number;
  errors: Array<{
    entity: string;
    error: string;
  }>;
}

export interface Metadata {
  version: string;
  entityType: string;
  exportDate: string;
  exportedBy?: string;
  totalRecords: number;
  includesMedia: boolean;
  mediaCount?: {
    images: number;
    videos: number;
    documents: number;
  };
  checksum?: string;
  platform: string;
  locale: string;
}
