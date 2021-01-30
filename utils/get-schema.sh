#!/bin/bash
FILE=introspect.gql
[ -f ./utils/$FILE ] && FILE="./utils/$FILE"

LINE="$(cat $FILE | tr -d '\n')"
QUERY=$(jq -n --arg q "$LINE" '{ query: $q }')

## get Query types
curl -s -H "Content-Type: application/json; charset=utf-8" -d "$QUERY" http://localhost:3080/graphql | jq '.data.__schema.types[]|select( .name=="Query").fields[0] '

