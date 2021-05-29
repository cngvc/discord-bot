const smartChainAdressRE = /^0x[a-zA-HJ-NP-Z0-9]{40}$/g
const coinSymbolRE = /^\?[a-zA-Z0-9]{2,10}/g
const colors = {
    primary: 3105157,
    warning: 13609260,
    danger: 13577004
}
module.exports = {smartChainAdressRE, colors, coinSymbolRE}