const express = require("express");
const app = express();
const connectDB = require("./config/db");
const path=require("path");
const cors=require("cors");

connectDB();

app.use(express.json({ extended: false }));
//cors access to the server
app.use(cors());
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader("Access-Control-Allow-Methods", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });

// app.get("/", (req, res) => {
//   res.send("Welcome to the Express-mongoose-node application ");
// });

app.use("/api/students", require("./routes/api/students"));

if( process.env.NODE_ENV==="production"){
  app.use(express.static("client/build"));
  app.get("*", (req,res)=>{
   res.sendFile(path.resolve(_dirname, "client", "build", "index.html"));

  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
