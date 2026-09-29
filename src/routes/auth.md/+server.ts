export const prerender = true;

/**
 * auth.md — instrucciones de registro para agentes.
 * Este sitio es 100% público: no hay APIs protegidas ni registro de agentes.
 * Se sirve con 200 + text/markdown para que los checks de descubrimiento pasen
 * sin inventar endpoints OAuth que no existen.
 */
const BODY = `# Agent auth — mjtorres.dev

This site is fully public. No registration, no API keys, no OAuth.

- Protected APIs: none. All content (pages, catalogs, health) is read-only and public.
- OAuth/OIDC discovery: not applicable — there is no authorization server, no token
  endpoint and no \`/.well-known/oauth-protected-resource\` because there is nothing
  to protect. Do not attempt OAuth flows against this domain.
- MCP server: none. No \`/.well-known/mcp/server-card.json\` is published.
- Agent skills index: none. No \`/.well-known/agent-skills/index.json\` is published.

## How agents should interact

1. Read public pages (\`/es\`, \`/en\`) or request \`Accept: text/markdown\` for a
   markdown version.
2. Discover machine-readable resources via \`/.well-known/ai-catalog.json\` (ARD)
   and \`/.well-known/api-catalog\` (RFC 9727).
3. To start a project for a user, hand off to the human via WhatsApp
   (https://wa.me/50769239002) or email (hola@mjtorres.dev) with the user's
   business description and preferred plan (Starter $25 / Pro $45 / Business $75).

## Contact

- WhatsApp: https://wa.me/50769239002
- Email: hola@mjtorres.dev
- Site: https://mjtorres.dev
`;

export function GET() {
	return new Response(BODY, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
