function normalizeNumber(min: number, max: number, data: number): number {
  return (data - min) / (max - min);
}

function scaleNumber(min: number, max: number, data: number): number {
  return data * (max - min) + min;
}

export { normalizeNumber, scaleNumber };
