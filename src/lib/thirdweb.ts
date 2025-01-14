import { createThirdwebClient } from "thirdweb";

// const clientId = process.env.GATSBY_THIRDWEB_CLIENT_ID;
const clientId = '85c9351b8d82e20b95979a4c60623eef';

if (!clientId) {
  throw new Error("No client ID provided. Set GATSBY_THIRDWEB_CLIENT_ID in your environment variables.");
}

export const thirdwebClient = createThirdwebClient({
  clientId: clientId,
});