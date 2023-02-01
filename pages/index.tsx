import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { ICollection } from "../models/collection";
import { sanityClient } from "../sanity";

type HomeProps = {
  collections: ICollection[];
};

const Home: NextPage<HomeProps> = ({ collections }) => {
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

      {collections.map((collection) => (
        <div key={collection._id}>{collection.title}</div>
      ))}
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == 'collection']{
  _id,
  title,
  address,
  description,
  nftCollectionName,
  mainImage {asset},
  previewImage {asset},
  slug{current},
  creator-> {
    _id,
    name,
    address,
    slug{current}
  }
}`;

  const collections = await sanityClient.fetch(query);

  return { props: { collections } };
};
