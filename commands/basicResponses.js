const THAM_LAM_IMAGE_URL = "https://i.ibb.co/XS0rPNd/tham-lam.jpg";
const NGU_DOT_IMAGE_URL = "https://i.ibb.co/pJ1ZLYF/ngu-dot.jpg";
const CON_CAI_NIT_IMAGE_URL = "https://i.ibb.co/B6D36h8/con-cai-nit.jpg";
const PHAN_VAN_IMAGE_URL = "https://i.ibb.co/8mHwCv5/phan-van.png";
const X_PAIN_IMAGE_URL = "https://i.ibb.co/QFDhn4G/x-pain.png";
const PRAY_GIF_URL = "http://gph.is/1rrG9vI";
const THANKS_YOU_GIF_URL = "https://gph.is/g/EvdgPYo";
const FUCK_YOU_GIF_URL = "https://media.giphy.com/media/KzGCAlMiK6hQQ/giphy.gif";
const SCAM_ALERT_GIF_URLS = [
  "https://i.ibb.co/ftqtTJV/tenor.gif",
  "https://media.giphy.com/media/XQKBuQmfjt1xm/giphy.gif",
  "https://media.giphy.com/media/2Y7nrBzXqhMpXubmJT/giphy.gif",
  "https://media.giphy.com/media/giLdGtRdBDxYVMoUw0/giphy.gif"
]
const ANGRY_GIF_URLS = [
  "https://media.giphy.com/media/AIuTKC0WnCgw0/giphy.gif",
  "https://media.giphy.com/media/J2D7HjS6sOsnjSadcA/giphy.gif"
]
const X_TK_GIF_URL = "https://media.giphy.com/media/RoS4JYcw0RvK8/giphy.gif"

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
      const strings = ["phan van", "phân vân"]
      return strings.some(srt => content.toLowerCase().includes(srt));
    },
    execute(channel) {
      channel.send(PHAN_VAN_IMAGE_URL);
    },
  },
  {
    match(content) {
      const strings = ["futu", "future", "shitcoin"]
      return strings.some(srt => content.toLowerCase().includes(srt));
    },
    execute(channel) {
      channel.send(X_PAIN_IMAGE_URL);
    },
  },
  {
    match(content) {
      const strings = ["please", "pls"]
      return strings.some(srt => content.toLowerCase().includes(srt));
    },
    execute(channel) {
      channel.send(PRAY_GIF_URL);
    },
  },
  {
    match(content) {
      const strings = ["thanks", "tks", "cam on", "cảm ơn"]
      return strings.some(srt => content.toLowerCase().includes(srt));
    },
    execute(channel) {
      channel.send(THANKS_YOU_GIF_URL);
    },
  },
  {
    match(content) {
      const strings = ["fuck", "dit", "địt", "dcm"]
      return strings.some(srt => content.toLowerCase().includes(srt));
    },
    execute(channel) {
      channel.send(FUCK_YOU_GIF_URL);
    },
  },
  {
    match(content) {
      return content.toLowerCase().includes("scam");
    },
    execute(channel) {
      const result = SCAM_ALERT_GIF_URLS[Math.floor(Math.random() * SCAM_ALERT_GIF_URLS.length)]
      channel.send(result);
    },
  },
  {
    match(content) {
      return content.toLowerCase().includes("dỗi");
    },
    execute(channel) {
      const result = ANGRY_GIF_URLS[Math.floor(Math.random() * ANGRY_GIF_URLS.length)]
      channel.send(result);
    },
  },
  {
    match(content) {
      return /^x[\d]{2,}g/.test(content);
    },
    execute(channel) {
      channel.send(X_TK_GIF_URL);
    },
  },
];
