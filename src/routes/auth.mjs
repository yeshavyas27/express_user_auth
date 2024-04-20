import { Router } from "express";
import { User } from "../schemas/user.mjs";
import jwt from "jsonwebtoken";
import bcrypt  from "bcrypt";

const router = Router();

router.post("/api/auth/signup", async (request, response) => {
  try {
    const { email, password } = request.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email: email, password: hashedPassword });
    await user.save();
    response.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    response.status(500).json({ error: "Registration failed" });
  }
});

router.post("/api/auth/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return response.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return response.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });
    response.status(200).json({ token });
  } catch (error) {
    response.status(500).json({ error: "Login failed" });
  }
});

export default router;
