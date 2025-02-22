# galileo

Galileo is a [Cloudflare Worker](https://developers.cloudflare.com/workers/) that provides geolocation data for incoming requests.

## Getting Started

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/servusdei2018/galileo.git
   cd galileo
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

### Development

To start a local development server:

```sh
npm run dev
```

### Deployment

To deploy the worker to Cloudflare:

```sh
npm run deploy
```

Ensure you've configured your Cloudflare account and namespace in the `wrangler.toml` file before deploying.

### Testing

To run tests:

```sh
npm run test
```

## Usage

Once deployed, make a GET request to your worker's URL:

```sh
curl -X GET https://your-worker.your-domain.workers.dev
```

The response will be a JSON object containing geolocation data:

```json
{
	"ip": "8.8.8.8",
	"country": "US",
	"region": "California",
	"city": "Mountain View",
	"latitude": "37.3861",
	"longitude": "-122.0839",
	"timezone": "America/Los_Angeles",
	"asn": 15169,
	"isp": "Google LLC"
}
```

## License

Galileo is distributed under the MIT License. Refer to the `LICENSE` file for details.
