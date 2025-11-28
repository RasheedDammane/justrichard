'use client';

import { useState, useEffect } from 'react';
import { LogLevel } from '@/lib/logger';

interface LogEntry {
  id: string;
  timestamp: string;
  level: string;
  category: string;
  message: string;
  source: string;
  environment: string;
  userId?: string | null;
  adminId?: string | null;
  requestId?: string | null;
  path?: string | null;
  method?: string | null;
  statusCode?: number | null;
  ip?: string | null;
  userAgent?: string | null;
}

interface AdminLogsClientProps {
  initialData: {
    items: LogEntry[];
    page: number;
    pageSize: number;
    total: number;
  };
}

export default function AdminLogsClient({ initialData }: AdminLogsClientProps) {
  const [logs, setLogs] = useState(initialData.items);
  const [page, setPage] = useState(initialData.page);
  const [total, setTotal] = useState(initialData.total);
  const [pageSize] = useState(initialData.pageSize);
  const [loading, setLoading] = useState(false);
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);

  // Filters
  const [selectedLevels, setSelectedLevels] = useState<string[]>(['ERROR', 'WARN', 'INFO', 'FATAL']);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dateRange, setDateRange] = useState<string>('24h');

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        level: selectedLevels.join(','),
      });

      if (selectedCategory) params.append('category', selectedCategory);
      if (searchQuery) params.append('search', searchQuery);
      
      // Date range
      if (dateRange !== 'all') {
        const now = new Date();
        const from = new Date();
        if (dateRange === '1h') from.setHours(now.getHours() - 1);
        else if (dateRange === '24h') from.setHours(now.getHours() - 24);
        else if (dateRange === '7d') from.setDate(now.getDate() - 7);
        else if (dateRange === '30d') from.setDate(now.getDate() - 30);
        params.append('from', from.toISOString());
      }

      const response = await fetch(`/api/admin/logs?${params.toString()}`);
      const data = await response.json();

      setLogs(data.items);
      setTotal(data.total);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page, selectedLevels, selectedCategory, searchQuery, dateRange]);

  const toggleLevel = (level: string) => {
    setSelectedLevels(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
    setPage(1);
  };

  const resetFilters = () => {
    setSelectedLevels(['ERROR', 'WARN', 'INFO', 'FATAL']);
    setSelectedCategory('');
    setSearchQuery('');
    setDateRange('24h');
    setPage(1);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'FATAL': return 'bg-red-600 text-white';
      case 'ERROR': return 'bg-red-500 text-white';
      case 'WARN': return 'bg-yellow-500 text-white';
      case 'INFO': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status?: number | null) => {
    if (!status) return 'text-gray-400';
    if (status >= 500) return 'text-red-600';
    if (status >= 400) return 'text-orange-600';
    if (status >= 300) return 'text-blue-600';
    return 'text-green-600';
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Application Logs</h1>
        <p className="text-gray-600 mt-1">Real-time monitoring of system and business events</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div className="text-sm text-gray-600">Total Logs (24h)</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{total}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div className="text-sm text-gray-600">Errors (24h)</div>
          <div className="text-2xl font-bold text-red-600 mt-1">
            {logs.filter(l => l.level === 'ERROR').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div className="text-sm text-gray-600">Warnings (24h)</div>
          <div className="text-2xl font-bold text-yellow-600 mt-1">
            {logs.filter(l => l.level === 'WARN').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div className="text-sm text-gray-600">Fatal (24h)</div>
          <div className="text-2xl font-bold text-red-700 mt-1">
            {logs.filter(l => l.level === 'FATAL').length}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow border border-gray-200 space-y-4">
        <div className="flex flex-wrap gap-4">
          {/* Level Filters */}
          <div className="flex gap-2">
            {['ERROR', 'WARN', 'INFO', 'FATAL'].map(level => (
              <button
                key={level}
                onClick={() => toggleLevel(level)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  selectedLevels.includes(level)
                    ? getLevelColor(level)
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          {/* Date Range */}
          <select
            value={dateRange}
            onChange={(e) => { setDateRange(e.target.value); setPage(1); }}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm"
          >
            <option value="1h">Last 1 hour</option>
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="all">All time</option>
          </select>

          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm"
          >
            <option value="">All Categories</option>
            <option value="auth">Auth</option>
            <option value="user">User</option>
            <option value="booking">Booking</option>
            <option value="property">Property</option>
            <option value="payment">Payment</option>
            <option value="system">System</option>
            <option value="admin">Admin</option>
            <option value="notification">Notification</option>
            <option value="other">Other</option>
          </select>

          {/* Search */}
          <input
            type="text"
            placeholder="Search in messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm flex-1 min-w-[200px]"
          />

          {/* Reset */}
          <button
            onClick={resetFilters}
            className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : logs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No logs found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Path</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                      <span title={new Date(log.timestamp).toLocaleString()}>
                        {formatTimestamp(log.timestamp)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getLevelColor(log.level)}`}>
                        {log.level}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{log.category}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 max-w-md truncate" title={log.message}>
                      {log.message}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate" title={log.path || ''}>
                      {log.path || '-'}
                    </td>
                    <td className={`px-4 py-3 text-sm font-medium ${getStatusColor(log.statusCode)}`}>
                      {log.statusCode || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={() => setSelectedLog(log)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, total)} of {total} logs
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Log Details Drawer */}
      {selectedLog && (
        <LogDetailsDrawer
          log={selectedLog}
          onClose={() => setSelectedLog(null)}
        />
      )}
    </div>
  );
}

// Simple drawer component for log details
function LogDetailsDrawer({ log, onClose }: { log: LogEntry; onClose: () => void }) {
  const [fullLog, setFullLog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/logs/${log.id}`)
      .then(res => res.json())
      .then(data => {
        setFullLog(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching log details:', err);
        setLoading(false);
      });
  }, [log.id]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(fullLog, null, 2));
    alert('Copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Log Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : fullLog ? (
            <>
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Timestamp</div>
                  <div className="text-sm text-gray-900">{new Date(fullLog.timestamp).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Level</div>
                  <div className="text-sm text-gray-900">{fullLog.level}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Category</div>
                  <div className="text-sm text-gray-900">{fullLog.category}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Source</div>
                  <div className="text-sm text-gray-900">{fullLog.source}</div>
                </div>
              </div>

              {/* Message */}
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Message</div>
                <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded">{fullLog.message}</div>
              </div>

              {/* Request Info */}
              {(fullLog.method || fullLog.path) && (
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-2">Request</div>
                  <div className="bg-gray-50 p-3 rounded space-y-1 text-sm">
                    {fullLog.method && <div><span className="font-medium">Method:</span> {fullLog.method}</div>}
                    {fullLog.path && <div><span className="font-medium">Path:</span> {fullLog.path}</div>}
                    {fullLog.statusCode && <div><span className="font-medium">Status:</span> {fullLog.statusCode}</div>}
                    {fullLog.ip && <div><span className="font-medium">IP:</span> {fullLog.ip}</div>}
                  </div>
                </div>
              )}

              {/* User Info */}
              {(fullLog.user || fullLog.admin) && (
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-2">User / Admin</div>
                  <div className="bg-gray-50 p-3 rounded space-y-1 text-sm">
                    {fullLog.user && (
                      <div><span className="font-medium">User:</span> {fullLog.user.email} ({fullLog.user.id})</div>
                    )}
                    {fullLog.admin && (
                      <div><span className="font-medium">Admin:</span> {fullLog.admin.email} ({fullLog.admin.id})</div>
                    )}
                  </div>
                </div>
              )}

              {/* Context */}
              {fullLog.context && (
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-2">Context (JSON)</div>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded text-xs overflow-x-auto">
                    {JSON.stringify(fullLog.context, null, 2)}
                  </pre>
                </div>
              )}

              {/* Copy Button */}
              <button
                onClick={copyToClipboard}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Copy Full JSON
              </button>
            </>
          ) : (
            <div className="text-center py-8 text-red-500">Failed to load log details</div>
          )}
        </div>
      </div>
    </div>
  );
}
