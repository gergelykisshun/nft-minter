import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1 className="text-red-500 text-4xl font-bold">Welcome to NFT DROP</h1>
        <Link
          href={`/nft/test123`}
          className="flex items-center justify-center rounded-3xl bg-red-500 hover:bg-red-600 transition-colors text-white w-full py-2 mt-4 cursor-pointer"
        >
          Random NFT
        </Link>
      </div>
    </div>
  );
};

export default Home;
