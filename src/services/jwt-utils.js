import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const result = dotenv.config();

export async function decodeToken(token) {
  const userInfo = {};
  try {
   /*  const decoded = jwt.decode(token);
  //  userInfo.userId = decoded.id;
  //  userInfo.email = decoded.email; */
  } catch (e) {
    console.log(e.message);
  }
  return userInfo;
}