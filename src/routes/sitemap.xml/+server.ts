const SITE_URL = 'https://mjtorres.dev';

export const prerender = true;

export function GET() {
	const now = new Date().toISOString();
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${SITE_URL}/es</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${SITE_URL}/es" />
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/en" />
  </url>
  <url>
    <loc>${SITE_URL}/en</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${SITE_URL}/es" />
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/en" />
  </url>
</urlset>`;
	return new Response(body, {
		headers: { 'Content-Type': 'application/xml' }
	});
}
