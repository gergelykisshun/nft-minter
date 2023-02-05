import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ICollection } from "../models/collection";
import { sanityClient, urlFor } from "../sanity";

type HomeProps = {
  collections: ICollection[];
};

const Home: NextPage<HomeProps> = ({ collections }) => {
  const router = useRouter();
  return (
    <div className=" max-w-7xl mx-auto px-10 py-20 lg:px-0">
      <Head>
        <title>NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-red-500 text-4xl font-extralight text-center mb-10">
        Welcome to NFT DROP
      </h1>

      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-10 bg-slate-100 shadow-xl shadow-rose-400/20 rounded-xl">
        {collections.map((collection) => (
          <div
            onClick={() =>
              collection.mintable
                ? router.push(`/nft/${collection.slug.current}`)
                : null
            }
            key={collection._id}
            className="flex flex-col items-center cursor-pointer transition-all duration-200 hover:scale-105"
          >
            <div className="relative">
              {/* Coming soon... */}
              {!collection.mintable && (
                <div className="absolute flex items-center justify-center h-full w-full z-10 bg-gray-400/70 rounded-2xl ">
                  <p className="text-white font-normal uppercase">
                    Coming soon
                  </p>
                </div>
              )}

              {/* TODO use next image */}
              <img
                src={urlFor(collection.mainImage).url()}
                alt={collection.title}
                className="h-96 w-60 rounded-2xl object-cover"
              />
            </div>

            <div>
              <h2 className="text-3xl mt-2">{collection.title}</h2>
              <p className="mt-2 text-sm text-gray-400">
                {collection.description}
              </p>
            </div>
          </div>
        ))}
      </div>
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
  },
  mintable
}`;

  const collections = await sanityClient.fetch(query);

  return { props: { collections } };
};
