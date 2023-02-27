import Head from "next/head";
import Link from "next/link";

export const siteTitle = "Cuack";

export default function Layout({ children, home }) {
  return (
    <div className="p-4">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Cuack cuack cuack" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className="border-b py-3 mb-6 font-bold">
        <Link href="/about">About Us</Link>
      </header>
      <main>{children}</main>
      <footer className="border-t py-3 mt-6 font-bold">
        (c) 2023 Cuack cuack
      </footer>
    </div>
  );
}
