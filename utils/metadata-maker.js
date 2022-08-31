import { CID } from 'multiformats/cid'
import * as json from 'multiformats/codecs/json'
import { base16 } from 'multiformats/bases/base16'
import { uploadPath2Web3, upload2Web3 } from './put-files.js'
import { File } from 'web3.storage'


function makeFileObjects (obj) {
    // You can create File objects from a Buffer of binary data
    // see: https://nodejs.org/api/buffer.html
    // Here we're just storing a JSON object, but you can store images,
    // audio, or whatever you want!
    const buffer = Buffer.from(JSON.stringify(obj))
  
    const files = [
      new File([buffer], 'metadata.json')
    ]
    return files
  }

async function main () {
    ////////////////////// web3Storage upload png /////////////////////////
   
    const collection_name = "Eastern DMT Experience" 
    const name = "The\ Golden\ Path"
    const description = "Example decription."

    let path = "./sample_image/EasternDMTExperience/" + name +".png"
    const { cid } = await uploadPath2Web3(path)
    console.log(`cid: ${cid}`)
    const image = "https://ipfs.io/ipfs/" + cid.toString() + `/${name}` + ".png"
    
    ////////////////////// creating a json file /////////////////////////
    const metadata_object = {
        "name" : name,
        "collection_name": collection_name,
        "description" : description,
        "image" : image,
        "attributes": [
            {
                "display_type":"",
                "trait_type" : "",
                "value" : ""
            }
        ]
    }

    let file = makeFileObjects(metadata_object)

    console.log(file)

    ////////////////////// web3Storage upload json /////////////////////////
    const { ipfs_cid } = await upload2Web3(file)
    console.log(`metadata cid: ${ipfs_cid}`)
    ////////////////////// tokenId creation from ipfs_cid /////////////////////////
    // const ipfs_cid = "bafybeicxlx7lkqxi5e5g4y6vgjjrovhed3heh6kggoo5iqckjwy4oa75by"
    const v1 = CID.parse(ipfs_cid)
    const tokenId = "0x"+v1.toString(base16).slice(9)
    console.log(`tokenId: ${tokenId}`) // slice the string and add 0x to create the tokenId
    console.log("https://ipfs.io/ipfs/" + ipfs_cid+ "/metadata.json")
    ///////////////////////////////////////////////
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})