import app from "./app.js";
import { config } from "dotenv";

config();

const PORT = process.env.PORT || 5000;
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`✅ Server running on ${process.env.NODE_ENV === 'production' ? 'production' : `http://${HOST}:${PORT}`}`);
});
