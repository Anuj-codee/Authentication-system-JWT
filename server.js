import app from "./src/app.js";
import connectDB from "./src/config/database.js";

async function startServer() {
  try {
    await connectDB();
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

startServer();