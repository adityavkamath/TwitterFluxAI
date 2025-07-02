import app from "./app.js";
import { config } from "dotenv";

config();

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0'; // Always bind to 0.0.0.0 for production deployment

app.listen(PORT, HOST, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
