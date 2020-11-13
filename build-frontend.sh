#!/usr/bin/env bash

cd src/assets && \
npm run build && \
cd - && \
rm -rf dist/assets && \
mv src/assets/build dist/assets
