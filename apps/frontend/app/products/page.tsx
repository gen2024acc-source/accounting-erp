"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios.get("http://localhost:3001/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSelect = (product: any) => {
    router.push(`/checkout?productId=${product.id}`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Choose a Plan</h1>

      <div style={{ display: "flex", gap: 20 }}>
        {products.map(p => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              padding: 20,
              width: 200,
              borderRadius: 10,
            }}
          >
            <h2>{p.name}</h2>
            <h3>{p.price === 0 ? "Free" : `${p.price} AED/year`}</h3>

            <ul>
              {p.features.map((f: string, i: number) => (
                <li key={i}>{f}</li>
              ))}
            </ul>

            <button onClick={() => handleSelect(p)}>
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}