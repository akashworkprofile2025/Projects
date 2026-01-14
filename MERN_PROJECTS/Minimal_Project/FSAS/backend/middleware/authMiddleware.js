// jwt import
import jwt from "jsonwebtoken";

// protect middleware
const protect = (req, res, next) => {
  let token;

  // header से token निकाल रहे हैं
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // token split
      token = req.headers.authorization.split(" ")[1];

      // token verify
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // user info request में डाल रहे हैं
      req.user = decoded;

      next(); // आगे जाने दो
    } catch (error) {
      res.status(401).json({ message: "Not authorized" });
    }
  } else {
    res.status(401).json({ message: "No token found" });
  }
};

export default protect;
