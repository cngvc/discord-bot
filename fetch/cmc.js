const rp = require("request-promise");
require("dotenv").config();

const CMC_API = "https://pro-api.coinmarketcap.com/v1/cryptocurrency";
const config = {
  method: "GET",
  headers: {
    "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
  },
  json: true,
  gzip: true,
};
const quotesAPI = ({ symbol }) => ({
  ...config,
  uri: `${CMC_API}/quotes/latest?symbol=${symbol}&convert=USD`,
});
const tokenPrice = async ({ symbol }) => {
  const result = await rp(quotesAPI({ symbol }));
  if (result && result.data) {
    const obj = result.data[symbol];
    const { price } = obj.quote["USD"];
    return {
      description: `${symbol}: **${price}** USD`,
    };
  }
  return null;
};

const listingsAPI = ({ start }) => ({
  ...config,
  uri: `${CMC_API}/listings/latest?convert=USD&limit=5000&start=${start}`,
});

const deepTokenPrice = async ({ symbol }) => {
  let start = 1;
  let results = [];
  let description = "";

  for (let index = 0; index < 3; index++) {
    const result = await rp(listingsAPI({ start }));
    if (result && result.data) {
      const _coins = result.data.filter((_data) => _data.symbol === symbol);
      if (_coins) {
        const _convert = _coins.map(({ name, symbol, quote }) => ({
          name,
          symbol,
          price: quote["USD"].price,
        }));
        results = [...results, ..._convert];
      }
      start += 5000;
    }
  }
  results.forEach(({ name, symbol, price }) => {
    description += `${symbol}<${name}>: **${price}** USD\n`;
  });

  return { description };
};
module.exports = {
  tokenPrice,
  deepTokenPrice,
};
