import { useMemo } from 'react';
import { getSubdomain, isAdminSubdomain } from '../utils/subdomainHelper';

export function useSubdomain() {
  const appDomain = import.meta.env.VITE_APP_DOMAIN;
  const adminSubdomain = import.meta.env.VITE_ADMIN_SUBDOMAIN || 'admin';

  return useMemo(() => {
    const hostname = window.location.hostname;

    // Dev fallback: check URL params
    const params = new URLSearchParams(window.location.search);
    const devTenant = params.get('tenant');

    const slug = devTenant || getSubdomain(hostname, appDomain);
    const isAdmin = isAdminSubdomain(hostname, appDomain, adminSubdomain);

    return { slug, isAdmin };
  }, [appDomain, adminSubdomain]);
}
