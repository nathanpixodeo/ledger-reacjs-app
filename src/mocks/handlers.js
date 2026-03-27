import { http, HttpResponse } from 'msw';
import revenues from './data/revenues.json';
import user from './data/user.json';
import tenants from './data/tenants.json';

let nextRevenueId = 100;

export const handlers = [
  // Auth
  http.post('*/api/auth/login', async ({ request }) => {
    const { email, password } = await request.json();
    if (email === 'admin@demo.com' && password === 'password') {
      return HttpResponse.json({
        user,
        token: 'mock-jwt-token-123',
      });
    }
    return HttpResponse.json(
      { message: 'Email hoặc mật khẩu không đúng' },
      { status: 401 }
    );
  }),

  http.post('*/api/auth/logout', () => {
    return HttpResponse.json({ message: 'Đã đăng xuất' });
  }),

  http.get('*/api/auth/me', () => {
    return HttpResponse.json({ user });
  }),

  http.post('*/api/auth/forgot-password', () => {
    return HttpResponse.json({
      message: 'Email đặt lại mật khẩu đã được gửi',
    });
  }),

  // CSRF Cookie (Sanctum)
  http.get('*/sanctum/csrf-cookie', () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // Revenues
  http.get('*/api/revenues', ({ request }) => {
    const url = new URL(request.url);
    const year = parseInt(url.searchParams.get('year')) || 2026;
    const filtered = revenues.filter((r) => r.year === year);
    return HttpResponse.json({ data: filtered });
  }),

  http.post('*/api/revenues', async ({ request }) => {
    const body = await request.json();
    const grossProfit = body.revenue - body.cogs;
    const marginPercent = body.revenue > 0 ? (grossProfit / body.revenue) * 100 : 0;
    const newRevenue = {
      id: nextRevenueId++,
      ...body,
      gross_profit: grossProfit,
      margin_percent: Math.round(marginPercent * 10) / 10,
    };
    revenues.push(newRevenue);
    return HttpResponse.json({ data: newRevenue }, { status: 201 });
  }),

  http.put('*/api/revenues/:id', async ({ params, request }) => {
    const body = await request.json();
    const index = revenues.findIndex((r) => r.id === parseInt(params.id));
    if (index === -1) {
      return HttpResponse.json({ message: 'Không tìm thấy' }, { status: 404 });
    }
    const grossProfit = body.revenue - body.cogs;
    const marginPercent = body.revenue > 0 ? (grossProfit / body.revenue) * 100 : 0;
    revenues[index] = {
      ...revenues[index],
      ...body,
      gross_profit: grossProfit,
      margin_percent: Math.round(marginPercent * 10) / 10,
    };
    return HttpResponse.json({ data: revenues[index] });
  }),

  http.delete('*/api/revenues/:id', ({ params }) => {
    const index = revenues.findIndex((r) => r.id === parseInt(params.id));
    if (index !== -1) {
      revenues.splice(index, 1);
    }
    return HttpResponse.json({ message: 'Đã xóa' });
  }),

  // Export
  http.get('*/api/export/excel', () => {
    return HttpResponse.json({ message: 'Mock: Excel export not available in mock mode' });
  }),

  http.get('*/api/export/pdf', () => {
    return HttpResponse.json({ message: 'Mock: PDF export not available in mock mode' });
  }),

  // Import
  http.post('*/api/import/excel', async ({ request }) => {
    const { records } = await request.json();
    return HttpResponse.json({
      data: { imported: records.length, skipped: 0 },
    });
  }),

  // Settings
  http.get('*/api/settings', () => {
    return HttpResponse.json({
      data: user.company,
    });
  }),

  http.put('*/api/settings', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ data: { ...user.company, ...body } });
  }),

  // Admin - Tenants
  http.get('*/api/admin/tenants', () => {
    return HttpResponse.json({ data: tenants });
  }),

  http.get('*/api/admin/tenants/:id', ({ params }) => {
    const tenant = tenants.find((t) => t.id === parseInt(params.id));
    if (!tenant) {
      return HttpResponse.json({ message: 'Không tìm thấy' }, { status: 404 });
    }
    return HttpResponse.json({ data: tenant });
  }),

  // Admin Auth
  http.post('*/api/admin/auth/login', async ({ request }) => {
    const { email, password } = await request.json();
    if (email === 'superadmin@ketoan.vn' && password === 'password') {
      return HttpResponse.json({
        user: { id: 1, name: 'Super Admin', email: 'superadmin@ketoan.vn', role: 'superadmin' },
        token: 'mock-admin-token-456',
      });
    }
    return HttpResponse.json({ message: 'Email hoặc mật khẩu không đúng' }, { status: 401 });
  }),
];
