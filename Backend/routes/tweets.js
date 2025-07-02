import { Router } from "express";
const router = Router();
import passport from "passport";
import openai from "../utils/openai.js";

router.post("/generate-tweet", async (req, res) => {
  if (req.isAuthenticated()) {
    console.log("User is authenticated:", req.user);
  } else {
    console.log("User is not authenticated");
  }
  const { mood, topic } = req.body;

  const prompt = topic
    ? `Write a ${mood}-styled tweet about ${topic}. Keep it within Twitter's character limit.`
    : `Generate a ${mood}-styled tweet on a trending tech topic.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9,
      max_tokens: 100,
    });

    const tweet = response.choices[0].message.content.trim();
    res.json({ tweet });
  } catch (err) {
    console.error(err);
    console.error("Error generating tweet:", err.message);
    res.status(500).json({ error: err.message });
  }
});

router.post("/post-tweet", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const { tweet } = req.body;
  if (!tweet || tweet.length > 280) {
    return res.status(400).json({ error: "Invalid tweet content." });
  }

  const { token, tokenSecret } = req.user;

  try {
    const { TwitterApi } = await import("twitter-api-v2");

    console.log("Access Token:", req.user.accessToken);
console.log("Access Secret:", req.user.accessTokenSecret);

    const client = new TwitterApi({
      appKey: process.env.TWITTER_CONSUMER_KEY,
      appSecret: process.env.TWITTER_CONSUMER_SECRET,
      accessToken: req.user.accessToken,
      accessSecret: req.user.accessTokenSecret,
    });


    const { data } = await client.v2.tweet(tweet);
    return res.status(200).json({
      success: true,
      tweetUrl: `https://twitter.com/${req.user.username}/status/${data.id}`,
    });
  } catch (err) {
    console.error("Failed to post tweet:", err);
    return res.status(500).json({ error: "Failed to post tweet." });
  }
});

export default router;

