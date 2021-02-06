#!/bin/bash
FILE=introspect.gql
[ -f ./utils/$FILE ] && FILE="./utils/$FILE"

LINE="$(cat $FILE | tr -d '\n')"
QUERY=$(jq -n --arg q "$LINE" '{ query: $q }')

echo "Queries"
## get Query types
curl -s -H "Content-Type: application/json; charset=utf-8" -d "$QUERY" http://localhost:3080/graphql | jq '.data.__schema.types[]|select( .name=="Query").fields '
echo Mutations
## get Mutation types
curl -s -H "Content-Type: application/json; charset=utf-8" -d "$QUERY" http://localhost:3080/graphql | jq '.data.__schema.types[]|select( .name=="Mutation").fields '

