import mongoose from "mongoose";
import express from "express";
import cors from "cors";
const app = express();
const employees = require("./routes/employees");
interface Err {
  message: string;
}

mongoose
  .connect("mongodb://localhost/erp_system")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err: Err) =>
    console.error("Could not connect to MongoDB...", err.message)
  );
app.use(cors());
app.use(express.json());
app.use("/employees", employees);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
