"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function CheckoutPage({ searchParams }: any) {
  const productId = searchParams.productId;

  const [product, setProduct] = useState<any>(null);

  const handlePayment = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/create-checkout-session`,
        { product }
      );

      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      .then((res) => {
        const selected = res.data.find((p: any) => p.id == productId);
        setProduct(selected);
      });
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Checkout</h1>

      <h2>{product.name}</h2>
      <p>
        Price:{" "}
        {product.price === 0
          ? "Free"
          : `${product.price} AED/year`}
      </p>

      <button onClick={handlePayment}>
        Proceed to Pay
      </button>
    </div>
  );
}