import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.AvalancheFujiTestnet}>
      <Toaster position="bottom-right" />
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
