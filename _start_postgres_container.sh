#!/bin/bash

docker kill green_park-postgresql
docker rm green_park-postgresql

docker run \
  --name green_park-postgresql \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=test1234 \
  -p 5432:5432 postgres

docker exec green_park-postgresql psql -c "CREATE DATABASE green_park" -U postgres