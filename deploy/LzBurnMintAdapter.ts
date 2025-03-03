import assert from 'assert'

import { type DeployFunction } from 'hardhat-deploy/types'

const contractName = 'LzBurnMintAdapter'
const TOKEN_CONTRACT = "0x35393114a9294cc8e26a1fb344063115c07596b8";
const BURNER_MINTER_CONTRACT = "0x7d9be5161cdfB3Bc903E05D54D91b6339DDc624a";
const OWNER = "0xFe7528b04DE8B10a9E50FA92CDD0d87d31c0b1e6"

const deploy: DeployFunction = async (hre) => {
    const { getNamedAccounts, deployments, ...rest } = hre

    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()

    assert(deployer, 'Missing named deployer account')

    console.log(`Network: ${hre.network.name}`)
    console.log(`Deployer: ${deployer}`)

    // This is an external deployment pulled in from @layerzerolabs/lz-evm-sdk-v2
    //
    // @layerzerolabs/toolbox-hardhat takes care of plugging in the external deployments
    // from @layerzerolabs packages based on the configuration in your hardhat config
    //
    // For this to work correctly, your network config must define an eid property
    // set to `EndpointId` as defined in @layerzerolabs/lz-definitions
    //
    // For example:
    //
    // networks: {
    //   fuji: {
    //     ...
    //     eid: EndpointId.AVALANCHE_V2_TESTNET
    //   }
    // }
    const endpointV2Deployment = await hre.deployments.get('EndpointV2')

    const { address } = await deploy(contractName, {
        from: deployer,
        args: [
            TOKEN_CONTRACT,
            BURNER_MINTER_CONTRACT,
            endpointV2Deployment.address, // LayerZero's EndpointV2 address
            OWNER, // owner
        ],
        log: true,
        skipIfAlreadyDeployed: false,
    })

    console.log(`Deployed contract: ${contractName}, network: ${hre.network.name}, address: ${address}`)
}

deploy.tags = [contractName]

export default deploy
