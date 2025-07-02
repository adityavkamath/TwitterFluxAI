import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as TwitterStrategy } from "passport-twitter";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import tweets from "./routes/tweets.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS configuration for production and development
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || 'https://your-app-name.onrender.com'
    : "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    },
  })
);

app.use(json());
app.use((err, req, res, next) => {
  console.error("💥 Server Error:", err.stack);
  res.status(500).send("Something broke!");
});
app.use(passport.initialize());
app.use(passport.session());

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../Frontend/dist')));
}

app.use("/auth", authRoutes);
app.use("/tweets", tweets);

// Catch all handler for React Router in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/dist', 'index.html'));
  });
}

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: process.env.TWITTER_CALLBACK_URL,
    },
    function (token, tokenSecret, profile, cb) {
      try {
        const user = {
          id: profile.id,
          username: profile.username,
          displayName: profile.displayName,
          photo: profile.photos?.[0]?.value,
          accessToken: token,
          accessTokenSecret: tokenSecret,
        };
        return cb(null, user);
      } catch (error) {
        console.error("Error in Twitter Strategy:", error);
        return cb(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

export default app;
