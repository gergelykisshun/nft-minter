import {
  useAddress,
  useDisconnect,
  useMetamask,
  useContract,
} from "@thirdweb-dev/react";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { ICollection } from "../../models/collection";
import { sanityClient, urlFor } from "../../sanity";

type NftPageProps = {
  collection: ICollection;
};

const NftDropPage: NextPage<NftPageProps> = ({ collection }) => {
  const [claimed, setClaimed] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const nftDrop = useContract(collection.address, "nft-drop").contract;

  const getNftCollectionData = async () => {
    if (nftDrop) {
      try {
        const claimed = await nftDrop.getAllClaimed();
        const total = await nftDrop.getAll();

        setClaimed(claimed.length);
        setTotal(total.length);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getNftCollectionData();
  }, [nftDrop]);

  // AUTH
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const disconnect = useDisconnect();

  const handleAuth = useCallback(() => {
    if (address) {
      return disconnect();
    }
    return connectWithMetamask();
  }, [address]);

  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      {/* LEFT */}
      <div className="bg-gradient-to-br from-cyan-500 to-rose-500 flex px-5 justify-center items-center lg:col-span-4">
        <div className="flex flex-col items-center">
          <div className="rounded-xl p-2 bg-gradient-to-br from-yellow-300 to-purple-500">
            <img
              src={urlFor(collection.previewImage).url()}
              alt={collection.title}
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-72"
            />
          </div>
          <div className="text-center p-5 space-y-2">
            <h2 className="text-4xl bold text-white">{collection.title}</h2>
            <p className="text-xl text-gray-300">{collection.description}</p>
          </div>
        </div>
      </div>
      {/* RIGHT */}
      <div className="flex flex-col lg:col-span-6">
        {/* header */}
        <header className="flex items-center justify-between px-4 py-2">
          <Link href={"/"}>
            <h2 className="w-58 sm:w-80 text-xl cursor-pointer font-extralight">
              The{" "}
              <span className="font-extrabold underline decoration-pink-600/50 ">
                NFT DROP
              </span>{" "}
              Marketplace
            </h2>
          </Link>
          <button
            onClick={handleAuth}
            className="rounded-full px-4 py-2 bg-pink-600 hover:bg-pink-700 transition-colors text-white font-bold text-sm lg:px-5 lg:py-3 lg:text-base"
          >
            {address ? "Sign out" : "Sign in"}
          </button>
        </header>
        <hr className="mb-2 border" />
        {address && (
          <p className="text-center text-sm text-rose-400">
            You're logged in with wallet{" "}
            {`${address.substring(0, 5)}...${address.substring(
              address.length - 5
            )}`}
          </p>
        )}

        {/* content */}

        <div className="mt-10 flex flex-1 flex-col items-center space-y-5 lg:justify-center px-3 text-center">
          <img
            src={urlFor(collection.mainImage).url()}
            alt={collection.title}
            className="w-80 rounded-xl object-cover lg:h-40"
          />
          <h2 className="text-4xl font-bold lg:font-extrabold lg:text-5xl">
            {collection.title}
          </h2>
          {loading ? (
            <p className="text-green-500 font-light text-sm animate-pulse">
              Loading supply...
            </p>
          ) : (
            <p className="text-green-500 font-light text-sm">
              {`${claimed}/${total} NFTs claimed`}
            </p>
          )}
        </div>

        {/* mint button */}

        {address ? (
          <button
            className="m-10 mb-5 py-3 bg-red-500 hover:bg-red-600 transition-colors text-white rounded-full font-bold disabled:bg-gray-400"
            disabled={loading || claimed === total || !address}
          >
            {loading
              ? "Loading"
              : claimed === total
              ? "Out of stock"
              : `Mint NFT (0.1 ETH)`}
          </button>
        ) : (
          <button
            onClick={handleAuth}
            className="m-10 mb-5 py-3 bg-red-500 hover:bg-red-600 transition-colors text-white rounded-full font-bold"
          >
            Sign in to mint
          </button>
        )}
      </div>
    </div>
  );
};

export default NftDropPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params ? params.id : "";

  const query = `*[_type == 'collection' && slug.current == $id][0]{
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

  // TODO what if catch
  const collection = await sanityClient.fetch(query, { id });

  // IF failed then we get not found 404 page
  if (!collection) {
    return { notFound: true };
  }

  return { props: { collection } };
};
