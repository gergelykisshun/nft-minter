import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import React, { useCallback } from "react";

type Props = {};

const NftDropPage = (props: Props) => {
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

  console.log("MY ADDRESS", address);

  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      {/* LEFT */}
      <div className="bg-gradient-to-br from-cyan-500 to-rose-500 flex px-5 justify-center items-center lg:col-span-4">
        <div className="flex flex-col items-center">
          <div className="rounded-xl p-2 bg-gradient-to-br from-yellow-300 to-purple-500">
            <img
              src="https://picsum.photos/200"
              alt="https://picsum.photos/200"
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-72"
            />
          </div>
          <div className="text-center p-5 space-y-2">
            <h2 className="text-4xl bold text-white">
              Lorem ipsum dolor sit amet.
            </h2>
            <p className="text-xl text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed,
              suscipit.
            </p>
          </div>
        </div>
      </div>
      {/* RIGHT */}
      <div className="flex flex-col lg:col-span-6">
        {/* header */}
        <header className="flex items-center justify-between px-4 py-2">
          <h2 className="w-58 sm:w-80 text-xl cursor-pointer font-extralight">
            The{" "}
            <span className="font-extrabold underline decoration-pink-600/50 ">
              TEST
            </span>{" "}
            NFT Marketplace
          </h2>
          <button
            onClick={handleAuth}
            className="rounded-full px-4 py-2 bg-pink-600 hover:bg-pink-700 transition-colors text-white font-bold text-sm lg:px-5 lg:py-3 lg:text-base"
          >
            {address ? "Sign out" : "Sign in"}
          </button>
        </header>
        <hr className="mb-2 border" />

        {/* content */}

        <div className="mt-10 flex flex-1 flex-col items-center space-y-5 lg:justify-center px-3 text-center">
          <img
            src="https://picsum.photos/300/200"
            alt="https://picsum.photos/300/200"
            className="w-80 rounded-xl object-cover lg:h-40"
          />
          <h2 className="text-4xl font-bold lg:font-extrabold lg:text-5xl">
            The NFT collection title | NFT Drop
          </h2>
          <p className="text-green-500 font-extralight text-sm">
            4/15 NFTs claimed
          </p>
        </div>

        {/* mint button */}
        <button className="m-10 mb-5 py-3 bg-red-500 hover:bg-red-600 transition-colors text-white rounded-full font-bold">
          Mint NFT (0.1 ETH)
        </button>
      </div>
    </div>
  );
};

export default NftDropPage;
