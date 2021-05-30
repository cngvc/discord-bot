const CMC_API = "https://pro-api.coinmarketcap.com/v1/cryptocurrency";
const WHALE_ALERT_API = "https://api.whale-alert.io/v1/";

const tokenPrice = (symbol, convert = "USD") => ({
  method: "GET",
  uri: `${CMC_API}/quotes/latest`,
  qs: {
    symbol,
    convert,
  },
  headers: {
    "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
  },
  json: true,
  gzip: true,
});

const tokenInfo = (symbol) => ({
  method: "GET",
  uri: `${CMC_API}/info`,
  qs: {
    symbol,
  },
  headers: {
    "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
  },
  json: true,
  gzip: true,
});

const whaleAlert = () => ({
  method: "GET",
  uri: `${WHALE_ALERT_API}/transactions`,
  qs: {
    limit: 1,
    min_value: 10000000
  },
  headers: {
    "X-WA-API-KEY": process.env.WHALE_ALERT_API_KEY,
  },
  json: true,
})
module.exports = { tokenPrice, tokenInfo, whaleAlert };
