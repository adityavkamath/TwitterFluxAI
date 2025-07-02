#!/bin/bash
cd Frontend
npm install
VITE_API_URL=https://twitter-uo1p.onrender.com npm run build
cd ../Backend
npm install
