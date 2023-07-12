#!/bin/bash

docker kill green_park_api_prod
docker rm green_park_api_prod

docker run -d --restart=always -p 5000:5000 -p 587:587 --name green_park_api_prod -v green_park_api_prod:/usr/src/app/public \
    green_park_api_prod
