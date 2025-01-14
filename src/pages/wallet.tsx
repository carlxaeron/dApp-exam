import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout"
import ConnectWallet from "../components/ConnectWallet"

const WalletPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <div className="flex items-center flex-col">
        <img src="/assets/metamask.svg" className="max-w-[200px]" />
        <h2 className="text-3xl">METAMASK</h2>
        <ConnectWallet />
      </div>
    </Layout>
  )
}

export default WalletPage

export const Head: HeadFC = () => <title>Wallet Page</title>