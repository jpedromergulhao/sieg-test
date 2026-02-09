//Esse arquivo limpa products.json e retorna apenas as informações essenciais

const fs = require("fs");
const path = require("path");

const input = path.resolve(__dirname, "../data/products.json");
const output = path.resolve(__dirname, "../data/products.cleaned.json");

const raw = JSON.parse(fs.readFileSync(input, "utf-8"));

const simplified = {
  products: raw.products.map(p => ({
    id: p.id,
    title: p.title,
    description: p.description,
    price: p.price,
    rating: p.rating,
    reviewCount: p.reviews.length,
    category: p.category,
    thumbnail: p.thumbnail,
    images: p.images,
    stock: p.stock,
    discountPercentage: p.discountPercentage
  }))
}

fs.writeFileSync(output, JSON.stringify(simplified, null, 2));