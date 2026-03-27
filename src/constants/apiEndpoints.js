export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  ME: '/auth/me',
  FORGOT_PASSWORD: '/auth/forgot-password',
  CSRF_COOKIE: '/sanctum/csrf-cookie',

  // Revenue
  REVENUES: '/revenues',
  REVENUE: (id) => `/revenues/${id}`,

  // Export
  EXPORT_EXCEL: '/export/excel',
  EXPORT_PDF: '/export/pdf',

  // Import
  IMPORT_EXCEL: '/import/excel',

  // Settings
  SETTINGS: '/settings',
  UPLOAD_LOGO: '/settings/logo',

  // Admin - Tenants
  TENANTS: '/admin/tenants',
  TENANT: (id) => `/admin/tenants/${id}`,
  TENANT_SUSPEND: (id) => `/admin/tenants/${id}/suspend`,
  TENANT_ACTIVATE: (id) => `/admin/tenants/${id}/activate`,

  // Admin - Auth
  ADMIN_LOGIN: '/admin/auth/login',
  ADMIN_LOGOUT: '/admin/auth/logout',
  ADMIN_ME: '/admin/auth/me',

  // Audit
  AUDIT_LOGS: '/audit-logs',
};
