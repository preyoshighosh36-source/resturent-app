import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const generateToken = (res, payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return token;
};


export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.json({ success: false, message: "Fill all fields" });

    const exist = await User.findOne({ email });
    if (exist) return res.json({ success: false, message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashed });

    res.json({ success: true, message: "Registered successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server error" });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.json({ success: false, message: "Fill all fields" });

    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ success: false, message: "Invalid credentials" });

    generateToken(res, { id: user._id, role: user.isAdmin ? "admin" : "user" });

    res.json({
      success: true,
      message: "Login successful",
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server error" });
  }
};


export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.json({ success: false, message: "Fill all fields" });

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    )
      return res.json({ success: false, message: "Invalid credentials" });

    generateToken(res, { role: "admin", id: "admin" });

    res.json({ success: true, message: "Admin login successful" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server error" });
  }
};


export const protect = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ success: false, message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export const adminOnly = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ success: false, message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin")
      return res.status(403).json({ success: false, message: "Admin access required" });

    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};


export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ success: true, message: "Logged out" });
  } catch (error) {
    res.json({ success: false, message: "Server error" });
  }
};


export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch {
    res.json({ success: false });
  }
};


export const isAuth = async (req, res) => {
  try {
    if (req.user.role === "admin") return res.json({ success: true, user: { role: "admin" } });
    const user = await User.findById(req.user.id).select("-password");
    res.json({ success: true, user });
  } catch {
    res.json({ success: false });
  }
};