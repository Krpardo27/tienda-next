export function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getImagePath(imagePath: string) {
  if (!imagePath) return "";

  try {
    new URL(imagePath);
    return imagePath;
  } catch {
    return `/products/${imagePath}.jpg`;
  }
}
