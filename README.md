# K6 performance testing demo - Nimble test CoP - 20/02/25

## Installation

1. Install the [K6 CLI tool](https://grafana.com/docs/k6/latest/set-up/install-k6/)
2. Install [node](https://nodejs.org/en/download)
3. Navigate to the project directory and run `npm i` to install dependencies

## Useful commands

### Local testing

- Running local tests - `k6 run {script_name}`
- Running with quiet output - `k6 run {script_name} --quiet`
- Running with standrd output to a JSON file - `k6 run {script_name} --summary-export={file_name}.json`
- Running with verbose output to a JSON file - `k6 run {script_name} --out json={file_name}.json`
- Setting options in the CLI (long form) - `k6 run {script_name} --vus 2 --duration 11s --iterations 2`
- Setting options in the CLI (short form) - `k6 run {script_name} -u 2 -d 11s -i 2`
- Ignore insecure certs - `k6 run {script_name} --insecure-skip-tls-verify`
- Run browser tests with headless set to false = `K6_BROWSER_HEADLESS=false k6 run {script_name}`

### Cloud testing

- Logging into k6 cloud with UN & PW - `k6 cloud login` (promt for UN and PW will follow)
- Logging into k6 cloud with token - `k6 cloud login --token {api_token}`
- Upload script to k6 cloud to run there - `k6 cloud {script_name}`
- Running script locally then uploading results to k6 cloud - `k6 run {script_name} -o cloud`

### Useful links

Smoke tests - https://grafana.com/blog/2024/01/30/smoke-testing/
Stress tests - https://grafana.com/blog/2024/01/30/stress-testing/
Load tests - https://grafana.com/blog/2024/01/30/average-load-testing/
Spike tests - https://grafana.com/blog/2024/01/30/spike-testing/
Breakpoint tests - https://grafana.com/blog/2024/01/30/breakpoint-testing/
Soak tests - https://grafana.com/blog/2024/01/30/soak-testing/
Geting an k6 cloud API token - https://{k6_username}.grafana.net/a/k6-app/settings/api-token
