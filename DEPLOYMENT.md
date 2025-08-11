# Amanti MVP - Deployment Guide

This guide will help you deploy the Amanti lost and found app to production.

## 🌐 Backend Deployment Options

### Option 1: Railway (Recommended)
Railway is a modern deployment platform that's perfect for Node.js applications.

1. **Sign up** at [railway.app](https://railway.app)
2. **Connect your GitHub** repository
3. **Deploy from GitHub**:
   - Select the `amanti-backend` folder
   - Railway will automatically detect Node.js and install dependencies
   - Set the start command to `npm start`
4. **Environment Variables**:
   - `PORT`: Railway will set this automatically
   - Add any other environment variables you need

### Option 2: Heroku
1. **Install Heroku CLI**
2. **Create a new Heroku app**:
```bash
cd amanti-backend
heroku create your-app-name
```
3. **Deploy**:
```bash
git add .
git commit -m "Deploy backend"
git push heroku main
```

### Option 3: DigitalOcean App Platform
1. **Sign up** at DigitalOcean
2. **Create a new app** from GitHub repository
3. **Configure build settings**:
   - Source directory: `amanti-backend`
   - Build command: `npm install`
   - Run command: `npm start`

## 📱 Frontend Deployment Options

### Option 1: Expo Application Services (EAS)
For building and distributing the mobile app:

1. **Install EAS CLI**:
```bash
npm install -g @expo/eas-cli
```

2. **Configure EAS**:
```bash
cd amanti-mobile
eas build:configure
```

3. **Build for Android**:
```bash
eas build --platform android
```

4. **Build for iOS**:
```bash
eas build --platform ios
```

### Option 2: Web Deployment (React Web Demo)
Deploy the web version for testing:

1. **Build the web demo**:
```bash
cd amanti-web-demo
pnpm run build
```

2. **Deploy to Netlify**:
   - Drag and drop the `dist` folder to [netlify.com](https://netlify.com)
   - Or connect your GitHub repository for automatic deployments

3. **Deploy to Vercel**:
```bash
npm install -g vercel
vercel --prod
```

## 🔧 Configuration for Production

### Backend Configuration

1. **Update CORS settings** in `server.js`:
```javascript
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: ['https://your-frontend-domain.com', 'exp://your-expo-app'],
    credentials: true,
  },
});
```

2. **Add environment variables**:
```bash
# .env file
PORT=4000
NODE_ENV=production
DATABASE_URL=your-database-url  # if using persistent database
```

3. **Replace in-memory storage** with a real database:
   - **MongoDB**: Use MongoDB Atlas (cloud) or self-hosted
   - **PostgreSQL**: Use services like Supabase, PlanetScale, or Neon

### Frontend Configuration

1. **Update backend URL** in `src/apollo/client.js`:
```javascript
const client = new ApolloClient({
  uri: 'https://your-backend-domain.com/graphql',  // Your deployed backend URL
  cache: new InMemoryCache(),
});
```

2. **Configure app.json** for Expo:
```json
{
  "expo": {
    "name": "Amanti",
    "slug": "amanti-lost-found",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.amanti"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.yourcompany.amanti"
    }
  }
}
```

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)
1. **Sign up** at [mongodb.com/atlas](https://mongodb.com/atlas)
2. **Create a cluster**
3. **Get connection string**
4. **Update backend** to use MongoDB:

```javascript
// Install mongoose
npm install mongoose

// In server.js
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create models
const LostItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  location: String,
  dateLost: String,
  contactInfo: String,
  imageUrls: [String],
  status: { type: String, default: 'LOST' },
  createdAt: { type: Date, default: Date.now },
});

const LostItem = mongoose.model('LostItem', LostItemSchema);
```

### PostgreSQL with Supabase
1. **Sign up** at [supabase.com](https://supabase.com)
2. **Create a project**
3. **Create tables** using the SQL editor
4. **Update backend** to use PostgreSQL with Prisma or pg

## 🔐 Security Considerations

### Backend Security
1. **Add rate limiting**:
```bash
npm install express-rate-limit
```

2. **Add input validation**:
```bash
npm install joi
```

3. **Add authentication** (if needed):
```bash
npm install jsonwebtoken bcryptjs
```

### Frontend Security
1. **Validate all inputs** on the client side
2. **Use HTTPS** for all API calls
3. **Store sensitive data securely** using Expo SecureStore

## 📊 Monitoring and Analytics

### Backend Monitoring
1. **Add logging**:
```bash
npm install winston
```

2. **Add health checks**:
```javascript
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});
```

### Frontend Analytics
1. **Add Expo Analytics**:
```bash
expo install expo-analytics-amplitude
```

2. **Add crash reporting**:
```bash
expo install expo-error-recovery
```

## 🚀 Quick Deployment Checklist

### Before Deployment
- [ ] Test the app thoroughly in development
- [ ] Update all hardcoded URLs to use environment variables
- [ ] Add proper error handling
- [ ] Set up a real database (not in-memory)
- [ ] Configure CORS properly
- [ ] Add input validation
- [ ] Test on different devices/browsers

### Backend Deployment
- [ ] Choose hosting platform (Railway, Heroku, etc.)
- [ ] Set up environment variables
- [ ] Deploy backend
- [ ] Test GraphQL endpoint
- [ ] Set up database
- [ ] Configure monitoring

### Frontend Deployment
- [ ] Update backend URL in Apollo Client
- [ ] Test web version
- [ ] Build mobile app with EAS
- [ ] Test on real devices
- [ ] Submit to app stores (if needed)

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Make sure backend CORS is configured for your frontend domain
   - Check that the frontend is using the correct backend URL

2. **Build Failures**:
   - Clear node_modules and reinstall dependencies
   - Check for version conflicts in package.json

3. **Database Connection Issues**:
   - Verify connection string
   - Check firewall settings
   - Ensure database is accessible from your hosting platform

4. **Mobile App Issues**:
   - Clear Expo cache: `expo start -c`
   - Check that all dependencies are compatible with Expo
   - Test on different devices

### Getting Help
- Check the Expo documentation: [docs.expo.dev](https://docs.expo.dev)
- Apollo GraphQL docs: [apollographql.com/docs](https://apollographql.com/docs)
- React Native docs: [reactnative.dev](https://reactnative.dev)

---

**Good luck with your deployment! 🚀**

