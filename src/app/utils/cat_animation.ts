/// <reference types="../../../node_modules/@types/createjs/" />

export const buildCatwalk = (height: number): createjs.Bitmap[] => {
  const shapes = Array<number>(12)
    .fill(0)
    .map((_, i) => (height / 12) * i);
  const foot = new createjs.Bitmap("/static/images/cat.svg");
  foot.rotation = 180;
  foot.scaleX = 0.05;
  foot.scaleY = foot.scaleX;
  foot.alpha = 0;
  return shapes.map<createjs.Bitmap>((v, i) =>
    buildFoot(foot.clone(), i % 2 === 0, v, height / 24)
  );
};

const buildFoot = (
  foot: createjs.Bitmap,
  isEven: boolean,
  y: number,
  size: number
): createjs.Bitmap => {
  foot.x = isEven ? 0 : size;
  foot.y = y;
  return foot;
};
