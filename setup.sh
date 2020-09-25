#!/bin/bash
echo "Setting up...."
npm install
echo "Installing client..."
cd ./client && npm install
echo "Installing backend..."
cd ../backend && npm install
echo "Everything installed :) try running npm run dev"