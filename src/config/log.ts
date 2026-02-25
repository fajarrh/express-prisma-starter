import morgan from "morgan";

export const appLog = morgan("combined", {
  skip: function (req, res) {
    return res.statusCode < 400;
  }
});
