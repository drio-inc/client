#!/bin/sh

# Get the URL from arguments
if [ $# -eq 0 ]
  then
    echo "No arguments supplied"
    exit 1
fi

echo "API_URL=$1" > ./root.drio/.env.local
echo "API_URL=$1" > ./saas.drio/.env.local
echo "API_URL=$1" > ./logistics-ui/.env.local