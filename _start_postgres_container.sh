#!/bin/bash

docker kill green_park-postgresql
docker rm green_park-postgresql

docker run \
  --name green_park-postgresql \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=test1234 \
  -e POSTGRES_DB=green_park \
  -p 5432:5432 postgres