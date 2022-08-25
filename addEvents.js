const Moralis = require("moralis/node")
require("dotenv").config()
const contractAddresses = require("./constants/networkMapping.json")
let chainId = process.env.chainId || 31337
let moralisChainId = chainId == "31337" ? "1337" : chainId // MORALIS UNDERSTANDS THAT LOCAL DEV IS 1337

const assetKidNftAddress = contractAddresses[chainId]["assetKidNft"][0] // MOST RECENT DEPLOYMENT
const gallery1Address = contractAddresses[chainId]["gallery1"][0] // MOST RECENT DEPLOYMENT

const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL
const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID
const masterKey = process.env.masterKey

async function main() {
    await Moralis.start({ serverUrl, appId, masterKey })

    console.log(`Listening for  Events in Gallery1 @ ${gallery1Address}`)

    let collectionVerified = {
        // telling moralis to listen for specific events
        chainId: moralisChainId,
        sync_historical: true,
        topic: "collectionVerified(address,uint256)",
        address: gallery1Address,
        abi: {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "address",
                "name": "creatorAddress",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "collectionId",
                "type": "uint256"
              }
            ],
            "name": "collectionVerified",
            "type": "event"
          },
        tableName: "VerifiedCollection",
    }

    let simpleCollectionCreated = {
        // telling moralis to listen for specific events
        chainId: moralisChainId,
        address: gallery1Address,
        sync_historical: true,
        topic: "simpleCollectableCreated(uint256,uint256[],address)",
        abi: {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "collectionId",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "uint256[]",
                    name: "tokenIds",
                    type: "uint256[]",
                },
                {
                    indexed: false,
                    internalType: "address",
                    name: "creator",
                    type: "address",
                },
            ],
            name: "simpleCollectableCreated",
            type: "event",
        },
        tableName: "SimpleCollectable",
    }

    let tierCollectionCreated = {
        // telling moralis to listen for specific events
        chainId: moralisChainId,
        address: gallery1Address,
        sync_historical: true,
        topic: "tierCollectableCreated(uint256,uint256[],address)",
        abi: {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "collectionId",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "uint256[]",
                    name: "tokenIds",
                    type: "uint256[]",
                },
                {
                    indexed: false,
                    internalType: "address",
                    name: "creator",
                    type: "address",
                },
            ],
            name: "tierCollectableCreated",
            type: "event",
        },
        tableName: "TierCollectable",
    }

    let tierExchange = {
        // telling moralis to listen for specific events
        chainId: moralisChainId,
        address: gallery1Address,
        sync_historical: true,
        topic: "tierExchange(uint256,uint256,uint256,address)",
        abi: {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "collectionId",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "exchangeFrom",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "exchangeTo",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "address",
                    name: "exchanger",
                    type: "address",
                },
            ],
            name: "tierExchange",
            type: "event",
        },
        tableName: "TierExchanges",
    }

    let collectionCommercialized = {
        // telling moralis to listen for specific events
        chainId: moralisChainId,
        address: gallery1Address,
        sync_historical: true,
        topic: "collectionCommercialized(address,uint256)",
        abi: {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "address",
                name: "creatorAddress",
                type: "address"
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "collectionId",
                type: "uint256"
              }
            ],
            name: "collectionCommercialized",
            type: "event"
        },
        tableName: "SeekingSupport",
    }

    console.log(`Listening for  Events in AssetKidNft @ ${assetKidNftAddress}`)

    let approvalForAll = {
        chainId: moralisChainId,
        address: assetKidNftAddress,
        sync_historical: true,
        topic: "ApprovalForAll(address,address,bool)",
        abi: {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "account",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "address",
                    name: "operator",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "bool",
                    name: "approved",
                    type: "bool",
                },
            ],
            name: "ApprovalForAll",
            type: "event",
        },
        tableName: "ApprovedAddress",
    }

    const collectionVerifiedResponse = await Moralis.Cloud.run(
        "watchContractEvent",
        collectionVerified,
        {
            useMasterKey: true,
        }
    )
    console.log(collectionVerifiedResponse)
    
    const simpleCollectionCreatedResponse = await Moralis.Cloud.run(
        "watchContractEvent",
        simpleCollectionCreated,
        {
            useMasterKey: true,
        }
    )
    console.log(simpleCollectionCreatedResponse)

    const tierCollectionCreatedResponse = await Moralis.Cloud.run(
        "watchContractEvent",
        tierCollectionCreated,
        {
            useMasterKey: true,
        }
    )
    console.log(tierCollectionCreatedResponse)

    const tierExchangeResponse = await Moralis.Cloud.run("watchContractEvent", tierExchange, {
        useMasterKey: true,
    })
    console.log(tierExchangeResponse)

    const approvalForAllResponse = await Moralis.Cloud.run("watchContractEvent", approvalForAll, {
        useMasterKey: true,
    })
    console.log(approvalForAllResponse)

    const  collectionCommercializedResponse = await Moralis.Cloud.run("watchContractEvent", collectionCommercialized, {
        useMasterKey: true,
    })
    console.log(collectionCommercializedResponse)
    if (
        collectionVerifiedResponse.success &&
        simpleCollectionCreatedResponse.success &&
        tierCollectionCreatedResponse.success &&
        tierExchangeResponse.success &&
        approvalForAllResponse.success &&
        collectionCommercializedResponse.success
    ) {
        console.log("Success, database updated with watching event")
    } else {
        console.log("Something wrong ...")
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exitCode = 1
    })
