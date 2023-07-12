#!/bin/bash

echo "Iniciando ambiente de produção..."
cp ./docker/node_server/Dockerfile ./Dockerfile

echo "Construindo containers de produção..."
docker image build -t green_park_api_prod:latest .

rm ./Dockerfile
