
const path = require('path').join(__dirname, 'indy_crypto_bg.wasm');
const bytes = require('fs').readFileSync(path);
let imports = {};
imports['./indy_crypto'] = require('./indy_crypto');

const wasmModule = new WebAssembly.Module(bytes);
const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
module.exports = wasmInstance.exports;
