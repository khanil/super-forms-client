export function datetime(a, b) {
  return string(a, b);
}

export function number(a, b) {
  return a - b;
}

export function string(a, b) {
  const va = (a === null) ? "" : "" + a;
  const vb = (b === null) ? "" : "" + b;

  return va > vb ? 1 : ( va === vb ? 0 : -1);
}