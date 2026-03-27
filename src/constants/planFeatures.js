export const PLANS = {
  FREE: 'free',
  PRO: 'pro',
  ENTERPRISE: 'enterprise',
};

export const PLAN_FEATURES = {
  [PLANS.FREE]: {
    name: 'Miễn phí',
    maxUsers: 1,
    exportExcel: true,
    exportPdf: false,
    importExcel: false,
    auditLog: false,
    maxCompanies: 1,
  },
  [PLANS.PRO]: {
    name: 'Chuyên nghiệp',
    maxUsers: 5,
    exportExcel: true,
    exportPdf: true,
    importExcel: true,
    auditLog: true,
    maxCompanies: 3,
  },
  [PLANS.ENTERPRISE]: {
    name: 'Doanh nghiệp',
    maxUsers: -1, // unlimited
    exportExcel: true,
    exportPdf: true,
    importExcel: true,
    auditLog: true,
    maxCompanies: -1, // unlimited
  },
};
