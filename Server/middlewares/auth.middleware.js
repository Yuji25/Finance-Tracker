import supabase from "../config/supabase.js";

export const verifyAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Missing authorization token");

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) throw new Error("Invalid or expired token");

    // Attach user info to request
    req.user = data.user;
    next();
    
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message || "Unauthorized",
    });
  }
};
