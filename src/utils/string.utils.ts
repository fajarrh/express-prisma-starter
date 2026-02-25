export const generateUniqueId = (suffix = "") => {
  const char = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Tanpa karakter membingungkan (1, l, 0, O)
  let randomStr = "";
  for (let i = 0; i < 6; i++) {
    randomStr += char.charAt(Math.floor(Math.random() * char.length));
  }

  const id = `${Date.now()}-${randomStr}`
  return suffix ? `${id}-${suffix}` : id;
};
