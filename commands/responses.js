const THAM_LAM_IMAGE_URL = "https://i.ibb.co/XS0rPNd/tham-lam.jpg"
const NGU_DOT_IMAGE_URL = "https://i.ibb.co/pJ1ZLYF/ngu-dot.jpg"
const CON_CAI_NIT_IMAGE_URL = "https://i.ibb.co/B6D36h8/con-cai-nit.jpg"
const PHAN_VAN_IMAGE_URL = "https://i.ibb.co/8mHwCv5/phan-van.png"
const X_PAIN_IMAGE_URL = "https://i.ibb.co/QFDhn4G/x-pain.png"

module.exports = [
  {
    match(content) {
      return content.toLowerCase().includes("tham lam");
    },
    execute(channel) {
      channel.send(THAM_LAM_IMAGE_URL);
    },
  },
  {
    match(content) {
      return content.toLowerCase().includes("ngu dốt");
    },
    execute(channel) {
      channel.send(NGU_DOT_IMAGE_URL);
    },
  },
  {
    match(content) {
      return content.toLowerCase().includes("nịt");
    },
    execute(channel) {
      channel.send(CON_CAI_NIT_IMAGE_URL);
    },
  },
  {
    match(content) {
      return content.toLowerCase().includes("phan van") || content.toLowerCase().includes("phân vân");
    },
    execute(channel) {
      channel.send(PHAN_VAN_IMAGE_URL);
    },
  },
  {
    match(content) {
      return content.toLowerCase().includes("future") || content.toLowerCase().includes("shitcoin");
    },
    execute(channel) {
      channel.send(X_PAIN_IMAGE_URL);
    },
  },
];
