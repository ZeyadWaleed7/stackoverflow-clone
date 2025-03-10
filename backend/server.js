import express from 'express';
import authRoutes from "./routes/auth.routes.js";
import dotenv from 'dotenv';
import connectMongodb from "./db/connectMongoDB.js";

dotenv.config();



console.log(process.env.MONGO_URI);
const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/auth",authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongodb();
});