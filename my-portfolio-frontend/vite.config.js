import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";

const avatarSource = "C:\\Users\\user\\.gemini\\antigravity-ide\\brain\\4cb554b1-ee64-4e7a-bae1-f4c0313125d9\\.user_uploaded\\media_1792313861110.jpg";
const avatarDest = path.resolve(import.meta.dirname, "public", "profile.jpg");

try {
  if (fs.existsSync(avatarSource)) {
    fs.copyFileSync(avatarSource, avatarDest);
    console.log("Successfully updated developer profile photo in public/profile.jpg");
  }
} catch (err) {
  console.warn("Avatar copy note:", err.message);
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
