import * as React from "react"
import { thirdwebClient } from "../lib/thirdweb"
import { ConnectButton } from "thirdweb/react";

const ConnectWallet: React.FC = () => {
  return (
    <div className="mt-8">
      <ConnectButton
        client={thirdwebClient}
      />
    </div>
  )
}

export default ConnectWallet