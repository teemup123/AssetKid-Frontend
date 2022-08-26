import { ConnectButton } from "web3uikit"
import Link from "next/link"

export default function Header() {
    return (
        <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
            <h1 className="py-4 px-4 font-bold text-3xl">AssetKid SME Marketplace</h1>
            <div className="flex flex-row items-center">
                <Link href="/">
                    <a className="mr-4 p-6">Home</a>
                </Link>
                <Link href="/projects">
                    <a className="mr-4 p-6">Tier Collectables</a>
                </Link>
                <Link href="/account">
                    <a className="mr-4 p-6">Your Wallet</a>
                </Link>
                <Link href="/upload">
                    <a className="mr-4 p-6">Create Project</a>
                </Link>
                <ConnectButton moralisAuth={true} />
            </div>
        </nav>
    )
}

