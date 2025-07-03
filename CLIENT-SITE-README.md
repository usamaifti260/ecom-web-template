# Client Site - Static Product Catalog

This is a Next.js client site that automatically fetches and displays products using Static Site Generation (SSG). Each client gets their own deployment of this site.

## 🚀 Features

- **Static Site Generation (SSG)** - Fast loading, SEO-friendly
- **Automatic Rebuilds** - Triggered when client clicks "Publish" in dashboard
- **Responsive Design** - Works on all devices
- **Product Catalog** - Beautiful grid layout with product cards
- **Environment-based Configuration** - Easy customization per client

## 📁 Project Structure

```
usamanext-website/
├── pages/
│   ├── index.js              # Main product catalog page
│   ├── _app.js              # App configuration
│   └── api/
│       └── build-hook.js    # Webhook for triggering rebuilds
├── lib/
│   └── fetchProducts.js     # Product fetching logic
├── styles/
│   ├── globals.css          # Global styles
│   └── Home.module.css      # Homepage styles
├── public/                  # Static assets
├── next.config.mjs          # Next.js configuration
└── env.example              # Environment variables template
```

## 🛠️ Setup Instructions

### 1. Clone and Install

```bash
git clone <repository-url>
cd usamanext-website
npm install
```

### 2. Environment Configuration

Copy the environment template and configure for each client:

```bash
cp env.example .env.local
```

Edit `.env.local` with client-specific values:

```env
# Client Configuration
CLIENT_ID=client123
BUSINESS_NAME=Acme Corporation
BUSINESS_DESCRIPTION=Premium products for modern living
BUSINESS_CONTACT=contact@acme.com

# API Configuration
DASHBOARD_API_URL=https://your-dashboard.com
API_KEY=your-secure-api-key

# Build Hook (for Vercel)
BUILD_HOOK_URL=https://api.vercel.com/v1/integrations/deploy/your-hook-id
BUILD_HOOK_SECRET=your-webhook-secret
```

### 3. Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see the site.

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

1. **Connect Repository**

   ```bash
   vercel --prod
   ```

2. **Set Environment Variables** in Vercel dashboard:

   - `CLIENT_ID`
   - `BUSINESS_NAME`
   - `BUSINESS_DESCRIPTION`
   - `DASHBOARD_API_URL`
   - `API_KEY`
   - `BUILD_HOOK_SECRET`

3. **Get Build Hook URL**
   - Go to Vercel project settings
   - Create a Deploy Hook
   - Copy the URL to `BUILD_HOOK_URL`

### Option 2: Netlify

1. **Connect Repository** in Netlify dashboard

2. **Build Settings**

   - Build command: `npm run build`
   - Publish directory: `out` (if using static export)

3. **Environment Variables** - Set same variables as Vercel

4. **Build Hook** - Create in Netlify settings

### Option 3: Self-Hosted

```bash
npm run build
npm start
```

## 🔄 How Rebuilds Work

1. **Client clicks "Publish"** in your dashboard
2. **Dashboard calls build hook**:
   ```javascript
   fetch("https://client-site.com/api/build-hook", {
     method: "POST",
     headers: {
       Authorization: "Bearer your-webhook-secret",
       "Content-Type": "application/json",
     },
     body: JSON.stringify({ clientId: "client123" }),
   });
   ```
3. **Site rebuilds** with fresh product data
4. **Static files are regenerated** and deployed

## 🎨 Customization

### Styling

- Edit `styles/Home.module.css` for component styles
- Edit `styles/globals.css` for global styles
- Customize CSS variables in `:root` for theming

### Layout

- Modify `pages/index.js` for different layouts
- Add new pages in `pages/` directory
- Update `lib/fetchProducts.js` for different API structures

### Business Information

- Set environment variables for each client
- Customize meta tags and SEO information
- Add client-specific branding

## 🔧 API Integration

### Product Data Structure

Expected API response format:

```json
{
  "products": [
    {
      "id": "1",
      "name": "Product Name",
      "description": "Product description",
      "price": 29.99,
      "image": "https://example.com/image.jpg",
      "category": "Electronics"
    }
  ]
}
```

### Authentication

- API key passed in Authorization header
- Configurable per client via environment variables

## 📈 Performance

- **Static Generation** - Pages built at build time
- **Image Optimization** - Next.js automatic optimization
- **ISR Support** - Incremental Static Regeneration available
- **CDN Ready** - Works with any CDN

## 🔒 Security

- **API Key Protection** - Secure API communication
- **Build Hook Authentication** - Webhook security
- **Environment Variables** - Sensitive data protection

## 🚨 Troubleshooting

### Build Failures

- Check API connectivity
- Verify environment variables
- Review build logs

### Image Issues

- Ensure image domains are configured in `next.config.mjs`
- Check image URLs are accessible
- Verify image optimization settings

### Webhook Problems

- Verify `BUILD_HOOK_SECRET` matches
- Check webhook URL format
- Review API endpoint logs

## 📞 Support

For issues or questions:

1. Check the troubleshooting section
2. Review build logs
3. Contact development team

---

## 🎯 Next Steps

1. **Set up monitoring** - Add error tracking
2. **Analytics** - Integrate Google Analytics
3. **SEO** - Add structured data
4. **Performance** - Implement caching strategies
5. **A/B Testing** - Test different layouts
