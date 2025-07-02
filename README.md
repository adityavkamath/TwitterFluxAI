# Twitter AI Content Generator

An AI-powered application for generating and posting tweets using OpenAI and Twitter API.

## Features

- 🤖 AI-powered tweet generation using OpenAI
- 🐦 Direct Twitter posting integration
- 🔐 Secure Twitter OAuth authentication
- 📱 Responsive modern UI with Tailwind CSS
- ⚡ Fast development with Vite and React

## Tech Stack

### Backend
- Node.js with Express
- Twitter API v2
- OpenAI API
- Passport.js for OAuth
- Express Sessions

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Axios for API calls

## Deployment on Render

### Prerequisites
1. Twitter Developer Account with API keys
2. OpenAI API key
3. GitHub repository

### Environment Variables

Set these environment variables in your Render dashboard:

```
TWITTER_CONSUMER_KEY=your_twitter_consumer_key
TWITTER_CONSUMER_SECRET=your_twitter_consumer_secret
TWITTER_CALLBACK_URL=https://your-app-name.onrender.com/auth/twitter/callback
OPENAI_API_KEY=your_openai_api_key
SESSION_SECRET=your_secure_random_string
NODE_ENV=production
FRONTEND_URL=https://your-app-name.onrender.com
```

### Deployment Steps

1. **Push to GitHub**: Push your code to a GitHub repository

2. **Create Render Service**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Choose your repository and branch

3. **Configure Build Settings**:
   - **Build Command**: `cd Frontend && npm install && npm run build && cd ../Backend && npm install`
   - **Start Command**: `cd Backend && npm start`
   - **Environment**: Node

4. **Add Environment Variables**:
   - Go to your service's Environment tab
   - Add all the environment variables listed above
   - Make sure to replace placeholder values with your actual API keys

5. **Update Twitter App Settings**:
   - Go to your Twitter Developer Portal
   - Update your app's callback URL to: `https://your-app-name.onrender.com/auth/twitter/callback`
   - Update your website URL to: `https://your-app-name.onrender.com`

6. **Deploy**: Click "Create Web Service" and wait for deployment

### Local Development

1. **Install Dependencies**:
   ```bash
   npm run install:all
   ```

2. **Set up Environment Variables**:
   - Copy `Backend/.env.example` to `Backend/.env`
   - Fill in your API keys and secrets

3. **Run Development Servers**:
   ```bash
   # Backend (runs on http://localhost:5000)
   npm run dev:backend
   
   # Frontend (runs on http://localhost:5173)
   npm run dev:frontend
   ```

### Important Notes

- Make sure your Twitter app has Read and Write permissions
- Keep your API keys secure and never commit them to version control
- The app serves the React build files in production
- CORS is configured for both development and production environments

### Troubleshooting

1. **Build Failures**: Check that all dependencies are properly listed in package.json
2. **Authentication Issues**: Verify your Twitter callback URL matches exactly
3. **CORS Errors**: Ensure FRONTEND_URL environment variable is set correctly
4. **API Errors**: Check that all API keys are valid and properly set

## Support

For issues and questions, please check the documentation or create an issue in the repository.
