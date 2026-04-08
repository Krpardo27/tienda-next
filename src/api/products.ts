export async function fetchProducts(category: string) {
  const res = await fetch(`/api/products?category=${category}`);

  if (!res.ok) {
    throw new Error("Error fetching products");
  }

  return res.json();
}
