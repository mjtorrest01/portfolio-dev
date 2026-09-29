export const prerender = true;

export function GET() {
	const body = [
		'User-agent: *',
		'Allow: /',
		'',
		'# Content Signals (draft-romm-aipref-contentsignals): AI content usage preferences.',
		'# ai-train=no → no usar este sitio para entrenar modelos.',
		'# search=yes → sí indexar/citar en búsquedas y respuestas.',
		'# ai-input=yes → sí usar el contenido como entrada/contexto de agentes.',
		'Content-Signal: ai-train=no, search=yes, ai-input=yes',
		'',
		'Sitemap: https://mjtorres.dev/sitemap.xml',
		''
	].join('\n');
	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
}
