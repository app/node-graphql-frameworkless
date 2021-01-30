#!/usr/bin/env bash
if [ ! -f $1 ] || [ $# -ne 1 ]; then
  echo "Usage:"
  echo "$0 your-query.gql"
else
  LINE="$(cat $1 | tr -d '\n')"
  QUERY=$(jq -n --arg q "$LINE" '{ query: $q }')

  echo -e "Request\n" $QUERY
  echo Response
  curl -s -H "Content-Type: application/json; charset=utf-8" -d "$QUERY" http://localhost:3080/graphql | jq .
fi

