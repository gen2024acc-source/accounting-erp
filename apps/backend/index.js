require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const authRoutes = require("./src/routes/auth.routes");
const productRoutes = require("./src/routes/product.routes");
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app =express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/products", productRoutes);

// PostgreSQL con exprnection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "accounting_db",
  password: "1234",
  port: 5432,
});

// GET transactions
app.get("/transactions", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id,
              amount,
              COALESCE(type, '') as type,
              category,
              created_at 
       FROM transactions 
       ORDER BY id DESC`
    );

    // Convert amount to number (VERY IMPORTANT)
    const formatted = result.rows.map(row => ({
      ...row,
      amount: Number(row.amount),
    }));

    res.json(formatted); // 🔥 SEND DATA TO FRONTEND
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});



// ADD transaction
app.post("/transactions", async (req, res) => {
  const { amount, type, category } = req.body;

  const result = await pool.query(
    "INSERT INTO transactions (amount, type, category) VALUES ($1, $2, $3) RETURNING *",
    [amount, type, category]
  );

  res.json(result.rows[0]);
});

app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001");
});

app.post("/create-checkout-session", async (req, res) => {
  const { product } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "aed",
            product_data: {
              name: product.name,
            },
            unit_amount: product.price * 100, // 🔥 cents
          },
          quantity: 1,
        },
      ],

      success_url: "http://localhost:3000/dashboard",
      cancel_url: "http://localhost:3000/products",
    });

    res.json({ url: session.url });

  } catch (err) {
    console.error(err);
    res.status(500).send("Stripe error");
  }
});