const { Web3Storage, getFilesFromPath } = require("web3.storage")
require("dotenv").config()

const WEB3_STORAGE_TOKEN_ID = process.env.web3StorageTokenId

async function uploadPath2Web3(path) {
    // Construct with token and endpoint
    const storage = new Web3Storage({ token: WEB3_STORAGE_TOKEN_ID })
    const files = []

    const pathFiles = await getFilesFromPath(path)
    files.push(...pathFiles)

    console.log(`Uploading ${files.length} files`)
    let cid = await storage.put(files, { wrapWithDirectory: true })
    console.log("Content added with CID:", cid)

    return { cid }
}

async function upload2Web3(file_obj) {
    // Construct with token and endpoint
    const storage = new Web3Storage({ token: WEB3_STORAGE_TOKEN_ID })
    console.log(`Uploading Object`)
    let ipfs_cid = await storage.put(file_obj)
    console.log("Content added with CID:", ipfs_cid)
    return { ipfs_cid }
}

module.exports = { uploadPath2Web3, upload2Web3 }
