#!/bin/bash
[ -f ./introspect.graphql ] && FILE="./introspect.graphql"
[ -f ./utils/introspect.graphql ] && FILE="./utils/introspect.graphql"

## get Query types
curl -s -d @$FILE http://localhost:3080|jq '.__schema.types[]|select( .name=="Query").fields[0] '
