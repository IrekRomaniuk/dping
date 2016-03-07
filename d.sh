#!/usr/bin/env bash
docker stop dping
docker rm dping
docker build -t dping .
#server_nodeapi.js
docker run -h dping --name dping -d -p 7777:7777 dping
docker logs dping
