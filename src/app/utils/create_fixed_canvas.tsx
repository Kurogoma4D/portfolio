import React, { useEffect, useRef } from "react";
import { buildCatwalk } from "./cat_animation";

export type Coord = {
  x: number;
  y: number;
};

const CreateFixedCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stage = useRef<createjs.Stage>(null);
  let baseLine = 0.0;
  let currentScrollY = 0.0;

  const initialize = () => {
    const canvas = canvasRef.current!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const buildStage = () => {
    const canvas = canvasRef.current!;
    let s = stage.current;
    const basePosition = (canvas.width / 9) * 8;

    s = new createjs.Stage(canvas);

    const catFeet = buildCatwalk(canvas.height);
    const catFeetContainer = new createjs.Container();
    catFeet.forEach(v => catFeetContainer.addChild(v));
    catFeetContainer.x = basePosition;
    s.addChild(catFeetContainer);

    const scrollBubble = new createjs.Bitmap("static/images/scroll.png");
    scrollBubble.alpha = 0;
    scrollBubble.x = basePosition - 140;
    scrollBubble.y = catFeet[catFeet.length - 1].y;
    scrollBubble.scaleX = scrollBubble.scaleY = 0.4;
    scrollBubble.regY = 256;

    s.addChild(scrollBubble);

    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", canvasRender);

    function canvasRender() {
      if (baseLine <= 1.0) {
        baseLine += 0.002;
      }

      let baseY = baseLine * canvas.height;
      catFeet.forEach(foot => {
        foot.y < baseY ? (foot.alpha = 1) : (foot.alpha = 0);
      });
      scrollBubble.y < baseY
        ? (scrollBubble.alpha = 1)
        : (scrollBubble.alpha = 0);

      s?.update();
    }
  };

  useEffect(() => {
    initialize();
    buildStage();

    const changeBaseLine = () => {
      if (window.scrollY > currentScrollY && baseLine > -0.1) {
        baseLine -= 0.03;
      }
      currentScrollY = window.scrollY;
    };
    addEventListener("scroll", changeBaseLine);

    return () => {
      removeEventListener("scroll", changeBaseLine);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  );
};

export default CreateFixedCanvas;
