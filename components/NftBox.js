import { useEffect, useState } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import galleryAbi from "../constants/Gallery.json"
import assetKidNftAbi from "../constants/AssetKidNft.json"


export default function NftBox(nftAddress) {
    const [imageURI, setImageURI] = useState("")
    const { isWeb3Enabled, account } = useMoralis()
    
    console.log(`tokenId: ${JSON.stringify(nftAddress["tokenId"][0])}`)

    const { runContractFunction: getHexId } = useWeb3Contract({
        abi: galleryAbi,
        contractAddress: nftAddress["galleryAddress"][0], 
        functionName: "getHexId",
        params: {
            tokenId: nftAddress["tokenId"][0], // smt wrong with tokenId
        },
    })

    const { runContractFunction: getTokenURI } = useWeb3Contract({
        abi: assetKidNftAbi,
        contractAddress: nftAddress["nftAddress"][0], 
        functionName: "uri",
        params: {
            _tokenID: 0, // smt wrong with tokenId
        },
    })


    async function updateUI() {
        const tokenHex = await getHexId()
        console.log(`Token Hex Id: ${tokenHex}`)
        
        const tokenURI = await getTokenURI(tokenHex)
        console.log(`URI: ${String(tokenURI)}`)
        // get token URI
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])
}
