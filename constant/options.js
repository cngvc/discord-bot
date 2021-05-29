const tokenPrice = (symbol) => ({
    method: "GET",
    uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
    qs: {
      symbol,
      convert: "USD",
    },
    headers: {
      "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
    },
    json: true,
    gzip: true,
  });

  module.exports = tokenPrice