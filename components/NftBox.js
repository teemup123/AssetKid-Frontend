import { useEffect, useState } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import galleryAbi from "../constants/Gallery.json"
import assetKidNftAbi from "../constants/AssetKidNft.json"
import Image from "next/image"
import {Card} from "web3uikit"

export default function NftBox(data) {
    
    const { isWeb3Enabled, account } = useMoralis()

    const [imageURI, setImageURI] = useState("")

    const [tokenName, setTokenName ]  = useState("")
    const [tokenDescription, setTokenDescription] = useState("")

    const tokenId = data["tokenId"]

    const { runContractFunction: getTokenURI } = useWeb3Contract({
        abi: assetKidNftAbi,
        contractAddress: data["nftAddress"][0],
        functionName: "uri",
        params: {
            _tokenID: data["tokenId"][0], 
        },
    })

    async function updateUI() {

        const tokenURI_array = []

        console.log(`Getting URI ...`)

        for (let i = 0; i<tokenId.length; i++){
            let current_id = data["tokenId"][i]
            if (current_id == 0){
                break
            }
            
            let current_uri = await getTokenURI()
            tokenURI_array.push(current_uri)
            console.log(`TOKEN ID : ${data["tokenId"][i]}`)  
        }

        for (let i = 0; i<tokenId.length; i++){
            console.log(`TOKEN URI ID: ${i} : ${tokenURI_array[i]}`)
        }

        
        const tokenURI = await getTokenURI()

        console.log(`URI: ${tokenURI}`)
        // get token URI
        if (tokenURI) {
            const requestURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
            const tokenURIResponse = await (await fetch(requestURL)).json() // await to get response, await to convert to json
            const imageURI = tokenURIResponse.image
            const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/")
            setImageURI(imageURIURL)
            setTokenName(tokenURIResponse.name)
            setTokenDescription(tokenURIResponse.description)
        }
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    return (
        <div>
            <div>
                {imageURI ? (
                    <div>
                        <Card title={tokenName} description={tokenDescription}>
                            {/* <div>#{tokenId}</div> */}
                            {/* <div className="italic text-sm">Owned by {tokenId}</div> */}
                            <Image loader={() => imageURI} unoptimized={true} src={imageURI} height="200" width="200"/>
                        </Card>
                    </div>
                ) : (
                    <div> Loading . . . </div>
                )}
            </div>
        </div>
    )
}
