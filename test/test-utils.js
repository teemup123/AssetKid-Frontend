//const { assert, expect } = require("chai")

const { uploadPath2Web3, upload2Web3 } = require('../utils/put-files')


async function main() {
    let path = './sample_image/bia/image.png'
    await uploadPath2Web3(path)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})

