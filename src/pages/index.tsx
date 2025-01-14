import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout"
import PriceWidget from "../components/PriceWidget"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <div className="max-w-[500px] mx-auto">
        <PriceWidget />
      </div>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>