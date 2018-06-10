#!/bin/sh

npm run build
rm -rf ../../../fullstack-open-2018-osa3/build
cp -r build ../../../fullstack-open-2018-osa3/