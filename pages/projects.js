import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import { useMoralisQuery, useWeb3Contract } from "react-moralis"
import NftBox from "../components/NftBox"
import NetworkMap from "../constants/networkMapping.json"
import assetKidNftAbi from "../constants/AssetKidNft.json"
import galleryAbi from "../constants/Gallery.json"

export default function Home() {
    const { data: verifiedProject, isFetching: fetchingVerifyCollection } = useMoralisQuery(
        // Table name
        // Query Function
        "VerifiedCollection",
        (query) => query.limit(10).descending("collectionId")
    )
    console.log(verifiedProject)

    const { data: TierCollectable, isFetching: fetchingTierCollectable } = useMoralisQuery(
        // Table name
        // Query Function
        "TierCollectable",
        (query) => query.limit(10).descending("collectionId")
    )

    return (
        <div className={styles.container}>
            Tier Collectable Will be Displayed Here !
            {fetchingTierCollectable ? (
                <div> Loading ... </div>
            ) : (
                TierCollectable.map((tier) => {
                    console.log(tier.attributes)
                    const { creator, collectionId, tokenIds } = tier.attributes
                    const nftAddress = NetworkMap[31337].assetKidNft
                    console.log(`pages nft address ${nftAddress[0]}`)
                    const galleryAddress = NetworkMap[31337].gallery1
                    console.log(`pages gallery address ${galleryAddress[0]}`)
                    // const galleryaddress = NetworkMap[31337].gallery1
                    return (
                        <div>
                            <NftBox
                                nftAddress={nftAddress}
                                galleryAddress={galleryAddress}
                                tokenId={tokenIds}
                                key={`${creator}${tokenIds}`}
                            />
                            Creator Address: {creator}. Collection Id: {collectionId}. Token Ids:
                            {` ${tokenIds}`}. Nft Address: {nftAddress}. Gallery Address:
                            {galleryAddress}.
                        </div>
                    )
                })
            )}
        </div>
    )
}
