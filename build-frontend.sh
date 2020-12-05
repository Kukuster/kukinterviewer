#!/usr/bin/env bash

cd src/web/frontend && \
npm run build_andExit && \
cd - 1>/dev/null && \
rm -rf dist/web/frontend && \
mkdir -p dist/web/frontend 1>/dev/null 2>&1
mv src/web/frontend/dist dist/web/frontend
