const rp = require("request-promise");
require("dotenv").config();
const { numberWithCommas } = require("../constant/helpers");

const WHALE_ALERT_API = "https://api.whale-alert.io/v1/";

const whaleAlert = {
  method: "GET",
  uri: `${WHALE_ALERT_API}/transactions`,
  qs: {
    limit: 1,
    min_value: 10000000,
  },
  headers: {
    "X-WA-API-KEY": process.env.WHALE_ALERT_API_KEY,
  },
  json: true,
};

const whaleTranfer = async () => {
  const result = await rp(whaleAlert);
  if (result) {
    const { timestamp, transactions } = result;
    const transaction = transactions[0];
    const {
      symbol,
      amount,
      amount_usd,
      hash,
      from: { owner_type: fromType },
      to: { owner_type: toType },
    } = transaction;
    const description = `${Math.round(
      amount
    )} #${symbol.toUpperCase()} (${numberWithCommas(
      amount_usd
    )} USD) transferred from #${fromType.toUpperCase()} to #${toType.toUpperCase()}`;
    return { timestamp, hash, description };
  }
  return null;
};

module.exports = {
  whaleTranfer,
};
