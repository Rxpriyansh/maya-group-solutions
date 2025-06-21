# Vercel Deployment Instructions for Maya Groups of Solutions

## 1. Prepare Your Project
- All static files (HTML, CSS, JS, images) should be in the `public/` directory.
- Your backend (Express/MongoDB) should remain deployed on Render or another backend host.
- Update all API URLs in your frontend code to use your Render backend URL (e.g., `https://your-backend.onrender.com/api/...`).
- A `vercel.json` file is included for SPA routing support.

## 2. Push to GitHub
- Commit and push your code to a GitHub repository.

## 3. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com/) and sign in with GitHub.
2. Click **New Project** and import your repository.
3. Set the **Root Directory** to `/public` if prompted.
4. Click **Deploy**.

## 4. Add a Custom Domain (Optional)
- In your Vercel dashboard, go to your project > Settings > Domains.
- Add your .com domain and follow the DNS instructions.

## 5. Backend API
- Your forms (newsletter, contact) will POST to your Render backend.
- Make sure CORS is enabled on your backend for your Vercel domain.

---

**You are ready to go live!**
