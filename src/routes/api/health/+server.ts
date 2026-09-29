const SITE_URL = 'https://mjtorres.dev';

export function GET() {
	return new Response(
		JSON.stringify({ status: 'ok', site: SITE_URL, time: new Date().toISOString() }),
		{
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Cache-Control': 'no-store'
			}
		}
	);
}
