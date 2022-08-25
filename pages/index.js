import Image from "next/image"
import styles from "../styles/Home.module.css"
import { useMoralisQuery } from "react-moralis"


export default function Home() {
    const { data: verifiedProject, isFetching: fetchingProject } = useMoralisQuery(
        // Table name
        // Query Function
        "VerifiedCollection",
        (query) => query.limit(10).descending("collectionId")
    )
    console.log(verifiedProject)

    return (
        <div className={styles.container}>
            Home Page: Put user collection Here !
        </div>
    )
}
