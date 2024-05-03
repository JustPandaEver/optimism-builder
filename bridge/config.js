const fs = require('fs');
const dotenv = require('dotenv');
const ini = require('ini');

/**
 * @typedef {Object} Config
 * @property {string} l1ProviderUrl
 * @property {string} l2ProviderUrl
 * @property {string} AddressManager
 * @property {string} L1CrossDomainMessenger
 * @property {string} L1StandardBridge
 * @property {string} OptimismPortal
 * @property {string} L2OutputOracle
 */

/**
 * Load configuration from environment variables and .env file.
 * @returns {Config} Loaded configuration.
 */
function loadConfig() {
    const env = dotenv.config({ path: './.env' }).parsed;
    if (!env.CONFIG_DIR) {
        throw new Error('CONFIG_DIR is not set');
    }
    const addresses = JSON.parse(fs.readFileSync(env.CONFIG_DIR + '/.deploy', 'utf8'));
    
    return {
        l1ProviderUrl: env.L1_RPC_URL,
        l2ProviderUrl: env.L2_RPC_URL,
        AddressManager: addresses.AddressManager,
        L1CrossDomainMessenger: addresses.L1CrossDomainMessengerProxy,
        L1StandardBridge: addresses.L1StandardBridgeProxy,
        OptimismPortal: addresses.OptimismPortalProxy,
        L2OutputOracle: addresses.L2OutputOracleProxy,
    };
}

module.exports = {
    loadConfig,
};