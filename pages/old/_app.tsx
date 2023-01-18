import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil"; //追加
import { ChakraProvider } from "@chakra-ui/react";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <h1>test</h1>
        <Component {...pageProps} />
      </ChakraProvider>
    </RecoilRoot>
  );
}
