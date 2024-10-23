import mongoose from "mongoose";
import { MONGOOSE_URL } from "../secrets";

export const connectDB = async () => {
  await mongoose
    .connect(MONGOOSE_URL)
    .then(() => console.log("connectd"))
    .catch((err) => {
      console.log(err.errmsg);
      process.exit(1);
    });
};
