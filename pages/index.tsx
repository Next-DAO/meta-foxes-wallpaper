import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";

import logo from "../public/logo.png";

export async function getStaticProps() {
  return { props: { isHome: true } };
}

const Home: NextPage = () => {
  const [tokenId, setTokenId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = (category: string) => {
    if (!tokenId) {
      alert("Empty token id, please try again!");
      return;
    }

    const tokenIdNumber = parseInt(tokenId, 10);
    if (tokenIdNumber < 1 || tokenIdNumber > 81) {
      alert("Invalid token id, please try again!");
      return;
    }

    setIsSubmitting(true);

    window.location.href = `/${category}/${tokenId}`;

    setIsSubmitting(false);
  };

  return (
    <>
      <Head>
        <title>Meta Foxes Derivatives</title>
        <meta name="description" content="Meta Foxes Genesis is a collection of handmade NFTs!" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <main className="mx-auto text-center w-64 pt-12">
        <Image src={logo} alt="Meta Foxes" width={100} height={100} />
        <div className="pt-24">
          <input
            className="block w-64 text-center h-14 border border-4 border-black rounded-full bg-[#FAF9F5]"
            type="number"
            min="1"
            max="10000"
            placeholder="Enter Your Token ID Here"
            onChange={(e) => setTokenId(e.target.value)}
            value={tokenId}
          />
          <button
            className="block w-64 text-center h-14 mt-14 text-white py-2 rounded-full border border-4 border-black bg-[#E48D46]"
            onClick={(e) => handleSubmit("wallpaper")}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Generating..." : "Generate Wallpaper"}
          </button>
          <button
            className="block w-64 text-center h-14 mt-4 text-white py-2 rounded-full border border-4 border-black bg-[#6E4529]"
            onClick={(e) => handleSubmit("protest")}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Generating..." : "Generate Protest PFP"}
          </button>
        </div>
      </main>

      <footer className="mx-auto mt-12 text-center p-12">
        <p>
          Built by{" "}
          <a
            className="hover:text-[#E48D46]"
            href="https://twitter.com/shep_eth"
            target="_blank"
            rel="noreferrer"
          >
            Shep
          </a>{" "}
          &amp;{" "}
          <a
            className="hover:text-[#E48D46]"
            href="https://twitter.com/penny777"
            target="_blank"
            rel="noreferrer"
          >
            Penny777
          </a>
        </p>
      </footer>
    </>
  );
};

export default Home;
