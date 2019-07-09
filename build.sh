#!/bin/sh
DIST_FRONTEND_PATH='../backend/dist/frontend/'
BUILD_FRONEND_PATH='./build/'

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
if [ -d "$DIST_FRONTEND_PATH" ]; then
  rm -rf $DIST_FRONTEND_PATH
fi
mkdir $DIST_FRONTEND_PATH
cp -r $BUILD_FRONEND_PATH $DIST_FRONTEND_PATH
echo '---end client build----'
