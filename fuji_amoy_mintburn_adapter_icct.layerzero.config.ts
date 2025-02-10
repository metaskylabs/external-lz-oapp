import { EndpointId } from "@layerzerolabs/lz-definitions";
const amoy_testnetContract = {
    eid: EndpointId.AMOY_V2_TESTNET,
    contractName: "LzBurnMintAdapter"
};
const avalanche_testnetContract = {
    eid: EndpointId.AVALANCHE_V2_TESTNET,
    contractName: "LzBurnMintAdapter"
};
export default { contracts: [{ contract: amoy_testnetContract }, { contract: avalanche_testnetContract }], connections: [{ from: amoy_testnetContract, to: avalanche_testnetContract, config: { sendLibrary: "0x1d186C560281B8F1AF831957ED5047fD3AB902F9", receiveLibraryConfig: { receiveLibrary: "0x53fd4C4fBBd53F6bC58CaE6704b92dB1f360A648", gracePeriod: 0 }, sendConfig: { executorConfig: { maxMessageSize: 10000, executor: "0x4Cf1B3Fa61465c2c907f82fC488B43223BA0CF93" }, ulnConfig: { confirmations: 1, requiredDVNs: ["0x55c175DD5b039331dB251424538169D8495C18d1"], optionalDVNs: [], optionalDVNThreshold: 0 } }, receiveConfig: { ulnConfig: { confirmations: 6, requiredDVNs: ["0x55c175DD5b039331dB251424538169D8495C18d1"], optionalDVNs: [], optionalDVNThreshold: 0 } } } }, { from: avalanche_testnetContract, to: amoy_testnetContract, config: { sendLibrary: "0x69BF5f48d2072DfeBc670A1D19dff91D0F4E8170", receiveLibraryConfig: { receiveLibrary: "0x819F0FAF2cb1Fba15b9cB24c9A2BDaDb0f895daf", gracePeriod: 0 }, sendConfig: { executorConfig: { maxMessageSize: 10000, executor: "0xa7BFA9D51032F82D649A501B6a1f922FC2f7d4e3" }, ulnConfig: { confirmations: 6, requiredDVNs: ["0x9f0e79Aeb198750F963b6f30B99d87c6EE5A0467"], optionalDVNs: [], optionalDVNThreshold: 0 } }, receiveConfig: { ulnConfig: { confirmations: 1, requiredDVNs: ["0x9f0e79Aeb198750F963b6f30B99d87c6EE5A0467"], optionalDVNs: [], optionalDVNThreshold: 0 } } } }] };
