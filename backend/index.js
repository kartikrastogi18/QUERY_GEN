import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {generateSQL} from './gemini.js';
import {buildPrompt} from './prompt.js';
import {isSafeSQL} from './validator.js';
const cache = new Map();
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100, // 👈 allow more during dev
  message: { error: "RATE_LIMIT" }
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
app.use("/generate-sql", limiter);
app.post("/generate-sql",async(req,res)=>{
    try
   { const {question}=req.body;
   console.log("Received question:", question);
    if (cache.has(question)) {
      console.log("Cache hit for question:", question);
        return res.json({ sql: cache.get(question), cached: true  });
      }
    const prompt=buildPrompt(question);
    const sql=await generateSQL(prompt);
    if(!isSafeSQL(sql)){
      console.error("Unsafe SQL generated:", sql);
        return res.json({error:"Generated SQL is not safe."});
    }

    console.log("Generated SQL:", sql);
    cache.set(question, sql);
    res.json({sql,cached : false} );}
    catch (error) {
      console.error("Gemini error:", error.message);
  
      if (
          error.message?.includes("RATE") ||
          error.message?.includes("429")
      ) {
          return res.status(429).json({ error: "RATE_LIMIT" });
      }
  
      res.status(500).json({
          error: "Internal server error",
          details: error.message
      });
  }
  

});
app.listen(3000,()=>{
    console.log("Server running on port 3000");
});