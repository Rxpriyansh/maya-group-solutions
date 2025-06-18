# Maya Group of Solutions – Deployment Guide

## Project Structure
- `server.js` – Express backend
- `public/` – Static frontend (HTML, CSS, JS, images)
- `routes/`, `models/`, `middleware/` – Backend logic

## 1. Prepare for Deployment
- All static files should be in `public/` (move your final `index.html` and assets here).
- Express should serve static files:
  ```js
  app.use(express.static('public'));
  ```
- Ensure your MongoDB URI is in `.env` as `MONGO_URI`.

## 2. Push to GitHub
1. Initialize git (if not already):
   ```sh
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

## 3. Deploy on Render (Recommended)
1. Go to [Render.com](https://render.com/), sign up, and click "New Web Service".
2. Connect your GitHub repo.
3. Set build command: `npm install`
4. Set start command: `node server.js`
5. Add environment variable: `MONGO_URI` (your MongoDB connection string)
6. Click "Create Web Service" and wait for deployment.

## 4. (Optional) Set up MongoDB
- Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a free cloud database.
- Copy your connection string and use it as `MONGO_URI` in Render.

## 5. Update API URLs (if needed)
- Use relative URLs (e.g., `/api/contact`) in your frontend JS for best compatibility.

## 6. Done!
- Your site will be live at the Render-provided URL.
- You can add a custom domain in Render settings.

---

**Need help?**
- If you get stuck, share your error or deployment log for troubleshooting.
