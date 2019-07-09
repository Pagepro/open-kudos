#!/bin/sh
echo '---start backend build---'
cd 'backend/'
yarn install
yarn run build
echo '---end backend build---'

echo '-----------------------'

echo '---start client build--'
cd '../client-dashboard'
yarn install
yarn run build
mkdir ../backend/dist/frontend
cp -r ./build/ ../backend/dist/frontend/
echo '---end client build----''
