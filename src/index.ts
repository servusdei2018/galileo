export default {
	/**
	 * Processes incoming requests and returns geolocation data.
	 *
	 * Extracts the client's IP and location details from Cloudflare’s `cf` object.
	 * If geolocation data is unavailable, returns an error response.
	 *
	 * @param {Request} request - The incoming request.
	 * @param {Env} env - Cloudflare environment bindings (unused).
	 * @param {ExecutionContext} ctx - Execution context (unused).
	 * @returns {Promise<Response>} JSON response with geolocation data or an error message.
	 */
	async fetch(request: Request) {
		const { cf } = request;

		if (!cf) {
			return new Response(JSON.stringify({ error: 'Geolocation data not available' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		const geoData = {
			ip: request.headers.get('CF-Connecting-IP'),
			country: cf.country,
			region: cf.region,
			city: cf.city,
			latitude: cf.latitude,
			longitude: cf.longitude,
			timezone: cf.timezone,
			asn: cf.asn,
			isp: cf.asOrganization,
		};

		return new Response(JSON.stringify(geoData, null, 2), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	},
};
