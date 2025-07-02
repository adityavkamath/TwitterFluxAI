import { Router } from "express";
import passport from "passport";

const router = Router();

// Get the frontend URL from environment variables
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

router.get("/twitter", passport.authenticate("twitter"));

router.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    failureRedirect: `${FRONTEND_URL}/`,
    successRedirect: `${FRONTEND_URL}/dashboard`,
  })
);

router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).send("Error logging out");
    res.sendStatus(200);
  });
});

export default router;
