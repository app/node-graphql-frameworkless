import http from 'http'
import graphql from 'graphql'
import hello from 'hello'

const host = '0.0.0.0'
const port = '3080'

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "X-Requested-With,content-type",
  "Access-Control-Allow-Credentials": true,
  "Content-Type": "application/json",
};

// merge resolvers
var resolvers = {
  ...hello.resolvers,
};

// Merge schemas strings and build object from them
const schema = graphql.buildSchema(`
  type Query {
    ${hello.query}
  }
`)

const handlePost = (httpResponse, postBody) => {
  let query = postBody
  try {
    query =  JSON.parse(postBody).query.toString()
  } catch (error) {
    console.log( `Can not parse query:  ${postBody}` );
    console.dir(error)
  }

  httpResponse.writeHead(200, headers)
  graphql.graphql(schema, query, resolvers)
    .then( response => {
      const data = response.errors || response.data
      httpResponse.end(JSON.stringify(data))
    })
    .catch (error => {
      httpResponse.end(error.toString())
    })
}

function listener (request, response) {
  if (request.method === 'POST') {
    var body = ''
    request.on('data', data => body += data )
    request.on('end', () => handlePost(response,body))
  } else if (request.method === "OPTIONS") {
    response.writeHead(204, headers);
    response.end();
  } else {
    response.writeHead(404, headers)
    response.end(JSON.stringify(`{code:1,message:'Not found'}`))
  }
}

const server = http.createServer(listener)
server.listen(port, host)
console.log(`Server running at http://${host}:${port}`)
