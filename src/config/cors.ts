import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    const whitelist = ["http://10.8.2.159:5173", "http://localhost:5173", "http://127.0.0.1:5173", "http://10.8.2.159:*", "http://10.8.2.115:5173"];

    if(process.argv[2] === "--api"){
      whitelist.push(undefined);
    }

    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};



