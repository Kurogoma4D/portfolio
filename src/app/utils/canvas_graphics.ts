export const buildGradientTriangle = (
  width: number,
  height: number
): HTMLCanvasElement => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d")!;
  const gradient = context.createLinearGradient(0, 0, width, 0);

  gradient.addColorStop(0, "rgba(255, 105, 102, 0.4)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  context.fillStyle = gradient;
  context.beginPath();
  context.moveTo(0, height / 2);
  context.lineTo(width, 0);
  context.lineTo(width, height);
  context.fill();
  context.closePath();

  return canvas;
};
