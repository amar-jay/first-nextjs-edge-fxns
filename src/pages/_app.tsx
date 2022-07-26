import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Footer } from "../components/Footer";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "./api/trpc/[trpc]";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="dark:bg-slate-700 m-0 relative max-h-screen">
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

function getBaseUrl() {
  if (process.browser) return ""; // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
  config() {
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
    };
  },
  ssr: false,
})(MyApp);
