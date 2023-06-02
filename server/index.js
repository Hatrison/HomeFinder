const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./mongodb/connect.js");

dotenv.config();
const PORT = 8080;

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send({ message: "Hello world!" });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);

    app.listen(PORT, () =>
      console.log(`Server has started on port http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
