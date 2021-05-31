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
const tokenPriceAPI = ({ symbol, convert }) => ({
  ...config,
  uri: `${CMC_API}/quotes/latest?symbol=${symbol}&convert=${convert}`,
});
const tokenPrice = async ({ symbol, convert = "USD" }) => {
  const result = await rp(tokenPriceAPI({ symbol, convert }));
  if(result && result.data) {
    const obj = result.data[symbol]
    return `${symbol}: ${obj.quote["USD"].price} USD`;
  }
  return null;
};
module.exports = {
  tokenPrice,
};
