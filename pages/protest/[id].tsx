import useSWR from "swr";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import Loading from "../../components/Loading";

function getImage(id: string) {
  return `https://dml9bs35yz8y5.cloudfront.net/${id}.png?t=${Date.now()}`;
}

const Canvas: FC<{ image: HTMLImageElement, paper: HTMLImageElement}> = ({ image, paper }) => {
  const [result, setResult] = useState("");

  useEffect(() => {
    const width = 1000;
    const height = 1000;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d")!;


    ctx.drawImage(image, 0, 0, width, height);
    ctx.drawImage(paper, 0, 0, width, height);

    const dataUrl = canvas.toDataURL("image/png");
    setResult(dataUrl);
  }, []);

  if (!result) {
    return <Loading />;
  }

  return <img src={result} />;
};

const WallpaperPage: FC = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [paper, setPaper] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const s = new Image();
    s.src = "/paper.png";

    s.crossOrigin = "Anonymous";
    s.onload = function () {
      setPaper(s);
    };
  }, []);


  useEffect(() => {
    if (!router.isReady) return;

    const imageURL  = getImage(id);
    const img = new Image();
    img.onload = function () {
      setImage(img);
    };
    img.crossOrigin = "Anonymous";
    img.src = imageURL;
  }, [router.isReady]);

  if (!router.isReady || !image || !paper) {
    return <Loading />;
  }

  return <Canvas image={image} paper={paper} />;
};

export default WallpaperPage;
