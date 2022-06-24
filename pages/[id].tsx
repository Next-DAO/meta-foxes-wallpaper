import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import useSWR from "swr";
import Loading from "../components/Loading";

function fetcher(url: string) {
  return fetch(url).then((r) => r.json());
}

function getImage(id: string) {
  return `https://dml9bs35yz8y5.cloudfront.net/${id}.png`;
}

function getCanvasSize() {
  let w: number | string = window.screen.width * window.devicePixelRatio;
  let h: number | string = window.screen.height * window.devicePixelRatio;
  if (w > h) {
    // on desktop
    h = window.innerHeight;
    w = h / 2;
  }
  return { width: w, heigth: h };
}

const Canvas: FC<{ image: HTMLImageElement }> = ({ image }) => {
  const [result, setResult] = useState("");

  useEffect(() => {
    const { width, heigth } = getCanvasSize();
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = heigth;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(image, 0, 0);
    const { data: bgColor } = ctx.getImageData(1, 1, 1, 1);
    const { data: bgColor2 } = ctx.getImageData(1, 200, 1, 1);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = `rgb(${bgColor[0]},${bgColor[1]},${bgColor[2]})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const imageSize = (bgColor[0] !== bgColor2[0] || bgColor[1] !== bgColor2[1]) ? canvas.width : Math.floor((canvas.width * 6) / 7);
    ctx.drawImage(image, (canvas.width - imageSize) / 2, canvas.height - imageSize, imageSize, imageSize);

    const dataUrl = canvas.toDataURL("image/png");
    setResult(dataUrl);
  }, [image]);

  if (!result) {
    return <Loading />;
  }

  return <img src={result} />;
};

const WallpaperPage: FC = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [image, setImage] = useState<HTMLImageElement | null>(null);


  const imageURL  = getImage(id);

  useEffect(() => {
    if (id === null || id === undefined || parseInt(id, 10) > 57) return;

    const img = new Image();
    img.onload = function () {
      setImage(img);
    };
    img.crossOrigin = "Anonymous";
    img.src = imageURL;
  }, [imageURL]);

  if (!id || !imageURL|| !image) {
    return <Loading />;
  }

  return <Canvas image={image} />;
};

export default WallpaperPage;
