import { config } from "dotenv";

import connectDB from "./db/db.js";

import "dotenv/config";

import { app } from "./app.js";

config({ path: "./env" });

app.on("error", (error) => {
  console.log(`ERRR: ${error}`);
  throw error;
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("err in db connection ", err);
  });
