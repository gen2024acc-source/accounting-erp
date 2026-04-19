"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CheckoutPage() {
  const params = useSearchParams();
  const productId = params.get("productId");

  const [product, setProduct] = useState<any>(null);

  const handlePayment = async () => {
  try {
    const res = await axios.post(
      "http://localhost:3001/create-checkout-session",
      { product }
    );

    // 🔥 redirect to Stripe
    window.location.href = res.data.url;

  } catch (err) {
    console.error(err);
    alert("Payment failed");
  }
};

  useEffect(() => {
    axios.get("http://localhost:3001/products")
      .then(res => {
        const selected = res.data.find((p: any) => p.id == productId);
        setProduct(selected);
      });
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Checkout</h1>

      <h2>{product.name}</h2>
      <p>Price: {product.price === 0 ? "Free" : `${product.price} AED/year`}</p>

      <button
        onClick={handlePayment}>
        Proceed to Pay
      </button>
    </div>
  );
}