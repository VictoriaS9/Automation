export function generateMockProducts(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    description: `Description for product ${i + 1}`,
    price: (i + 1) * 10,
  }));
}
