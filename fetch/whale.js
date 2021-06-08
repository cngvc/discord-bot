const rp = require("request-promise");
require("dotenv").config();
const { numberWithCommas } = require("../constant/helpers");

const WHALE_ALERT_API = "https://api.whale-alert.io/v1";
const WHALE_SCAN_API = "https://whale-alert.io/transaction";

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
      blockchain,
      symbol,
      amount,
      amount_usd,
      hash,
      from: { owner_type: fromType },
      to: { owner_type: toType },
    } = transaction;
    let detailURL = `${WHALE_SCAN_API}/${blockchain}/${hash}`;
    if(hash === "Multiple Hashes") detailURL = null;
    let description = `**${Math.round(
      amount
    )}** #${symbol.toUpperCase()} (**${numberWithCommas(
      amount_usd
    )}** USD) transferred from #${fromType.toUpperCase()} to #${toType.toUpperCase()}`;
    if(detailURL) description += `\n\n:link: [See details here](${detailURL})`
    return { timestamp, hash, description };
  }
  return null;
};

module.exports = {
  whaleTranfer,
};
