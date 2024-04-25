import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  //Set jwt as an httpOnly cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", //use secure cookies in production
    sameSite: "strict", //prevent csrf attacks
    maxAge: 60 * 60 * 10000, // 1 hour in milliseconds
  });
};

export { generateToken };
