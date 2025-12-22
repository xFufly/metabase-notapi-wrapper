# Metabase NotApi Wrapper
This small library provides a minimal client to query databases connected to a Metabase server, without using the official API.

## Use case
You are a Data Analyst and only have access to Metabase to query company data. You need a visualization or analysis that Metabase doesn’t provide (e.g., a Venn diagram), and you can’t create an API key. This lightweight wrapper lets you run native SQL queries against databases connected to your Metabase instance by reusing your authenticated session (cookies), without relying on the official API. It makes it easy to export datasets directly into your Node.js scripts.

## Installation
```bash
npm install https://github.com/xFufly/metabase-notapi-wrapper.git
```

## Usage

1) Configure access

- Copy `config.example.json` to `config.json` at the project root.
- Fill in the following fields:
  - `cookie`: the full value of the `Cookie` header from an authenticated Metabase session. Open Metabase in your browser, sign in, then copy the complete cookie value from DevTools. If your cookie contains double quotes, escape them in JSON using backslashes (e.g., `\"`).
  - `dashboard-url`: the base URL of your Metabase instance (e.g., `https://dashboard.example.com`).

2) Run a native SQL query

Example (ESM):

```js
import metabase from 'metabase-notapi-wrapper/src/metabase.js';

const sql = 'SELECT 1';

const run = async () => {
  const result = await metabase.executeQuery(sql);
  console.log(result); // JSON response from /api/dataset
};

run();
```

Notes : Use your own credentials and comply with your organization’s access and security policies.

## Author
[DIDELOT Tim](https://timdidelot.fr) · contact@timdidelot.fr

## License
MIT