import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ error: "Authorization denied, token missing" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decodedToken:", decodedToken);
    req.user = { userId: decodedToken?.userId };

    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ error: "Authorization denied, invalid token" });
  }
};

export default auth;