#!/bin/sh
cd 'backend/'
yarn install
yarn run build
cd '../client-dashboard'
yarn install
yarn run build
mkdir ../backend/dist/frontend
cp -r ./build/ ../backend/dist/frontend/
