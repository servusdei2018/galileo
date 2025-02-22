import { describe, it, expect } from 'vitest';
import worker from '../src/index';

const IncomingRequest = Request<unknown, IncomingRequestCfPropertiesBase>;

describe('Galileo worker', () => {
	/**
	 * Test case to verify that the Cloudflare Worker correctly extracts and returns geolocation data
	 * from the request.
	 *
	 * The request is simulated with specific Cloudflare geolocation headers, including country,
	 * region, city, coordinates, timezone, ASN, and ISP. The worker is expected to process this
	 * information and return a JSON response matching the input values.
	 *
	 * @async
	 * @function
	 * @throws {Error} If the response does not match the expected geolocation data.
	 */
	it('responds with geolocation data', async () => {
		const request = new IncomingRequest('http://example.com', {
			headers: { 'CF-Connecting-IP': '8.8.8.8' },
			cf: {
				...({
					country: 'US',
					region: 'California',
					city: 'Mountain View',
					latitude: '37.3861',
					longitude: '-122.0839',
					timezone: 'America/Los_Angeles',
					asn: 15169,
					asOrganization: 'Google LLC',
				} as Partial<IncomingRequestCfProperties> as IncomingRequestCfProperties),
			},
		});
		const response = await worker.fetch(request);
		const jsonResponse = await response.json();
		expect(jsonResponse).toMatchObject({
			ip: '8.8.8.8',
			country: 'US',
			region: 'California',
			city: 'Mountain View',
			latitude: '37.3861',
			longitude: '-122.0839',
			timezone: 'America/Los_Angeles',
			asn: 15169,
			isp: 'Google LLC',
		});
	});
});
