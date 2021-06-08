const { tokenPrice } = require("../fetch/cmc");
const { colors } = require("../constant/strings");

const getBtcPrice = async (btcPricePrev) => {
  const { price } = await tokenPrice({ symbol: "BTC" });
  const isIncreased = price > btcPricePrev;
  const percent = Number.parseFloat(
    (Math.abs(price - btcPricePrev) / btcPricePrev) * 100
  ).toFixed(2);
  const color = isIncreased ? colors.success : colors.danger;
  const description = `
    BTC: **${Number.parseFloat(price).toFixed(2)}** USD\n${
    isIncreased ? "Increased" : "Decreased"
  } by **${percent}%** in the last 1 hour`;
  return { price, color, description };
};

const getBnbPrice = async (bnbPricePrev) => {
  const { price } = await tokenPrice({ symbol: "BNB" });
  const isIncreased = price > bnbPricePrev;
  const percent = Number.parseFloat(
    (Math.abs(price - bnbPricePrev) / bnbPricePrev) * 100
  ).toFixed(2);
  const color = isIncreased ? colors.success : colors.danger;
  const description = `
    BNB: **${Number.parseFloat(price).toFixed(2)}** USD\n${
    isIncreased ? "Increased" : "Decreased"
  } by **${percent}%** in the last 1 hour`;
  return { price, color, description };
};

module.exports = { getBtcPrice, getBnbPrice };
