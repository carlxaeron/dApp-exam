import "./src/styles/global.css"
import * as React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThirdwebProvider } from "thirdweb/react"

const queryClient = new QueryClient()

export const wrapRootElement = ({ element }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider clientId={process.env.GATSBY_THIRDWEB_CLIENT_ID}>
        {element}
      </ThirdwebProvider>
    </QueryClientProvider>
  )
}