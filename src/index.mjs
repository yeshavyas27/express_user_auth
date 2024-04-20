import mongoose from "mongoose";
import express from "express";

import routes from "./routes/index.mjs";

// connect app to the database
mongoose
  .connect("mongodb://localhost/express_user_auth")
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(`Error: ${err}`));

const app = express();
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
