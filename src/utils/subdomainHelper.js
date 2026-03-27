export function getSubdomain(hostname, appDomain) {
  if (!hostname || !appDomain) return null;

  // In development with localhost, check for tenant1.localhost pattern
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return null;
  }

  // Check for subdomain.localhost (e.g., tenant1.localhost)
  const localhostMatch = hostname.match(/^([^.]+)\.localhost$/);
  if (localhostMatch) {
    return localhostMatch[1];
  }

  // Production: extract subdomain from full domain
  const domainParts = hostname.replace(appDomain, '').split('.').filter(Boolean);
  return domainParts.length > 0 ? domainParts[0] : null;
}

export function isAdminSubdomain(hostname, appDomain, adminSubdomain = 'admin') {
  const subdomain = getSubdomain(hostname, appDomain);
  return subdomain === adminSubdomain;
}
