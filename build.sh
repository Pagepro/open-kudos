#!/bin/sh
DIST_FRONTEND_PATH='../backend/dist/frontend/'
BUILD_FRONEND_PATH='./build/.'

echo '---BACKEND BUILD STARTING---'
cd 'backend/'
yarn install --production=false
yarn run build
echo '---BACKEND BUILD END---'

echo '---CLIENT BUILD STARTING---'
cd '../client-dashboard'
yarn install --production=false
yarn run build
echo '---CLIENT BUILD END---'
echo '---MOVE CLIENT FILES TO BACKEND STARTING---'
if [ -d "$DIST_FRONTEND_PATH" ]; then
  rm -rf $DIST_FRONTEND_PATH
fi
mkdir $DIST_FRONTEND_PATH
cp -a $BUILD_FRONEND_PATH $DIST_FRONTEND_PATH
echo '---MOVE CLIENT FILES TO BACKEND END---'
