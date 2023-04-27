'use strict'

const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: 'https://es01.bib55.uni-trier.de',
  auth: { username: 'ackels', password: 'blkmgr' },
  tls: {
    // ca: fs.readFileSync('./http_ca.crt'),
    rejectUnauthorized: false
  }
})

async function run () {

  // alert( 'Hello, world!' );
  
  // Let's start by indexing some data


  // here we are forcing an index refresh, otherwise we will not
  // get any result in the consequent search
  await client.indices.refresh({ index: 'dietrich_test_frontend' })

  // Let's search!
  const result= await client.search({
    index: 'dietrich_test_frontend',
    query: {
      match_all: { }
    }
  })

  console.log(result.hits.hits)
}

run().catch(console.log)

