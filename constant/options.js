const tokenPrice = (symbol, convert = "USD") => ({
    method: "GET",
    uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
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
    uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/info",
    qs: {
      symbol,
    },
    headers: {
      "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
    },
    json: true,
    gzip: true,
  });

  module.exports = {tokenPrice, tokenInfo}