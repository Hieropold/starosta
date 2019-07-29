#!/bin/sh

rm -rf ./dist

npm run build

cp ./Dockerfile ./dist

cp ./nginx.conf ./dist

cd ./dist

docker build -t flammarion/starosta:latest .

docker push flammarion/starosta:latest
