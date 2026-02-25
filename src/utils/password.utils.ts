import bcrypt from "bcryptjs";

export const hashPassword = async (password?: any) => {
  if (!password) return "";
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const verifyPassword = async (password: any, hashed: any) => {
  if (!password || !hashed) return false;
  return await bcrypt.compare(password, hashed);
};