import { useState } from "react";
import Head from "next/head";
import type { NextPage } from "next";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Home: NextPage = () => {
  const [Calldata, SetCalldata] = useState<string>();
  const [Words, SetWords] = useState<string[]>([]);
  const [Copied, SetCopied] = useState<string>();
  console.log(Copied);
  const GetWords = (data: string) => {
    const selector = data.substring(0, 10);
    const rest = data.substring(10);
    const chunks = rest.match(/.{1,32}/g);

    const output = [selector];

    if (chunks) {
      chunks.forEach(chunk => {
        output.push(chunk);
      });
    }

    SetWords(output);
  };

  return (
    <>
      <Head>
        <title>CallData Parser</title>
        <meta name="description" content="Created with 🏗 scaffold-eth-2" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">Calldata Parser</span>
          </h1>

          <input
            type="text"
            placeholder="Enter Calldata"
            className="input font-bai-jamjuree w-full px-5  bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white uppercase"
            onChange={e => SetCalldata(e.target.value)}
          />

          <button
            className="btn btn-circle btn-ghost h-8 w-8 bg-green-200 bg-opacity-80 z-0 min-h-0 drop-shadow-md m-4"
            onClick={() => GetWords(Calldata ? Calldata : "")}
          >
            Click
          </button>

          <div className="flex flex-col bg-gray-100 px-80 py-20 text-center items-center max-w-xs rounded-3xl">
            {Words.map((word, index) => (
              <div
                key={index}
                // className="flex justify-between items-center border-b-2 border-gray-200 py-2"
              >
                <p className="text-black bg-blue-100 border border-blue-400 rounded-lg p-4">{word}</p>
                {index == 0 ? (
                  <p className="text-black">0x00</p>
                ) : index == 1 ? (
                  <p className="text-black">{"0x" + "4"}</p>
                ) : (
                  <p className="text-black">{"0x" + ((index - 1) * 32 + 4).toString(16)}</p>
                )}
                <CopyToClipboard text={word} onCopy={() => SetCopied(word)}>
                  <span className="text-blue-500 cursor-pointer">Copy</span>
                </CopyToClipboard>{" "}
              </div>
            ))}
          </div>

          {/* <p className="text-center text-lg">
            Get started by editing{" "}
            <code className="italic bg-base-300 text-base font-bold">packages/nextjs/pages/index.tsx</code>
          </p>
          <p className="text-center text-lg">
            Edit your smart contract <code className="italic bg-base-300 text-base font-bold">YourContract.sol</code> in{" "}
            <code className="italic bg-base-300 text-base font-bold">packages/hardhat/contracts</code>
          </p> */}
        </div>
      </div>
    </>
  );
};

export default Home;
