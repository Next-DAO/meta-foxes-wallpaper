import useSWR from "swr";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import Loading from "../../components/Loading";

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

function isSameColor(color1: Uint8ClampedArray, color2: Uint8ClampedArray) {
  if (color1[0] !== color2[0] || color1[1] !== color2[1] || color1[2] !== color2[2]) {
    return false;
  }
  return true;
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
    const { data: bgColor1 } = ctx.getImageData(1, 1, 1, 1);
    const { data: bgColor2 } = ctx.getImageData(1, 200, 1, 1);
    const { data: bgColor3 } = ctx.getImageData(1, 400, 1, 1);
    const { data: bgColor4 } = ctx.getImageData(1, 600, 1, 1);
    const { data: bgColor5 } = ctx.getImageData(1, 800, 1, 1);
    const { data: bgColor6 } = ctx.getImageData(1, 999, 1, 1);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = `rgb(${bgColor1[0]},${bgColor1[1]},${bgColor1[2]})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const isPureBg = isSameColor(bgColor1, bgColor2) && isSameColor(bgColor1, bgColor3) && isSameColor(bgColor1, bgColor4) && isSameColor(bgColor1, bgColor5) && isSameColor(bgColor1, bgColor6)
    const imageSize = !isPureBg ? canvas.width : Math.floor((canvas.width * 6) / 7);
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
    if (id === null || id === undefined || parseInt(id, 10) > 80) return;

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
