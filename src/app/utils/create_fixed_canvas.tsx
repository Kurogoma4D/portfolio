import React, { useEffect, useRef, useCallback } from "react";
import { Application, Sprite } from "pixi.js";

export type Coord = {
  x: number;
  y: number;
};

const CreateFixedCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  let baseLine = 0.0;
  let currentScrollY = 0.0;
  let currentIndex = 0;
  const feetProp: Sprite[] = [];
  const FOOT_MAX = 12;
  const pixiApp = new Application();

  const initialize = useCallback(() => {
    const canvas = canvasRef.current!;
    pixiApp.view.width = window.innerWidth;
    pixiApp.view.height = window.innerHeight;
    pixiApp.renderer.backgroundColor = 0x242424;

    canvas.appendChild(pixiApp.view);

    pixiApp.loader.add("foot", "/static/images/cat.svg").load(buildStage);
  }, [canvasRef]);

  const buildStage = () => {
    const width = pixiApp.renderer.width;
    const height = pixiApp.renderer.height;
    const baseX = (width / 6) * 5;

    const shapes = new Array(FOOT_MAX).fill(0).map((_, i) => (height / 12) * i);
    const size = width / 14;
    const feet = shapes.map((v, i) => {
      let foot = new Sprite(pixiApp.loader.resources.foot.texture);
      foot.width = foot.height = size;
      foot.anchor.set(0.5);
      foot.x = i % 2 === 0 ? baseX : baseX + size;
      foot.y = v + size / 2;
      foot.alpha = 0;
      foot.rotation = Math.PI;
      return foot;
    });

    pixiApp.stage.addChild(...feet);
    feetProp.push(...feet);

    pixiApp.ticker.add(function(delta) {
      if (baseLine < 0.99) {
        baseLine += delta * 0.001;
        currentIndex = Math.max(Math.floor(baseLine * FOOT_MAX), 0);
        feet[currentIndex].alpha = 1;
      }
    });
  };

  useEffect(() => {
    initialize();

    const changeBaseLine = () => {
      if (window.scrollY > currentScrollY && baseLine > 0) {
        baseLine -= 0.015;

        if (feetProp.length !== 0) {
          feetProp[currentIndex].alpha = 0;
        }
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
      <div ref={canvasRef}></div>
    </>
  );
};

export default CreateFixedCanvas;
