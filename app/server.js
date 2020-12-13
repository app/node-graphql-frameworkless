import http from 'http'
import gql from 'graphql'
import hello from 'hello'

const { graphql, buildSchema } = gql
const host = '0.0.0.0'
const port = '3080'
const contentType = {'Content-Type': 'application/json'}

// merge resolvers
var resolvers = {
  ...hello.resolvers,
};

// Merge schemas strings and build object from them
const schema = buildSchema(`
 ${hello.schema}
`)

const handlePost = (httpResponse, postBody) => {
  graphql(schema, postBody, resolvers)
    .then( response => {
      const data = response.errors || response.data
      httpResponse.writeHead(200, contentType)
      httpResponse.end(JSON.stringify(data))
    });
}

function listener (request, response) {
  if (request.method === 'POST') {
    var body = ''
    request.on('data', data => body += data )
    request.on('end', () => handlePost(response,body))
  } else {
    response.writeHead(404, contentType)
    response.end(JSON.stringify(`{code:1,message:'Not found'}`))
  }
}

const server = http.createServer(listener)
server.listen(port, host)
console.log(`Server running at http://${host}:${port}/`)
