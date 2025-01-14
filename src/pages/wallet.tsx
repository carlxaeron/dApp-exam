import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout"

const WalletPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <img src="/assets/metamask.svg" />
    </Layout>
  )
}

export default WalletPage

export const Head: HeadFC = () => <title>Wallet Page</title>