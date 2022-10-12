#!/bin/bash

res=$(curl -s https://48y9kj.deta.dev/info)

if [ "$res" == "ok" ]; then
  echo "Succeeded curl to /info"
  exit 0
  fi

echo "Failed curl to /info"
# 0: OK, 1: Bad.
exit 1