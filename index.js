let IndyReq = require('indy-request')
let bs58 = require('bs58')
let nacl = require('tweetnacl')

let SERVERKEY = bs58.decode('HXrfcFWDjWusENBoXhV8mARzq51f1npWYWaA1GzfeMDG')

const roles = {
  TRUSTEE: '0',
  STEWARD: '2',
  TRUST_ANCHOR: '101',
  ROLE_REMOVE: ''
}

async function main () {
  let node = IndyReq({
    host: '127.0.0.1',
    port: 9702,
    serverKey: SERVERKEY
  })

  node.on('error', function (err) {
    console.error('got error', err)
  })
  node.on('pong', function () {
    console.log('got pong')
  })
  node.on('close', function () {
    console.log('got close')
  })

  let my1 = nacl.sign.keyPair.fromSeed(Buffer.from('00000000000000000000000000000My1', 'utf8'))
  let sender = nacl.sign.keyPair.fromSeed(Buffer.from('000000000000000000000000Trustee1', 'utf8'))

  let my1DID = bs58.encode(Buffer.from(my1.publicKey.slice(0, 16)))
  let my1Verkey = bs58.encode(Buffer.from(my1.publicKey))
  let senderDID = bs58.encode(Buffer.from(sender.publicKey.slice(0, 16)))

  let resp = await node.send({
    operation: {
      type: IndyReq.type.NYM + '',
      dest: my1DID,
      role: roles.TRUSTEE,
      verkey: my1Verkey
    },
    identifier: senderDID,
    protocolVersion: 2
  }, sender.secretKey)

  console.log('NYM resp:')
  console.log(resp)

  console.log('Going to SCHEMA')
  resp = await node.send({
    operation: {
      type: IndyReq.type.SCHEMA + '',
      data: {
        version: '1.0',
        name: 'Perscription',
        attr_names: ['pill-name', 'amount', 'dosage']
      }
    },
    identifier: my1DID,
    protocolVersion: 2
  }, my1.secretKey)

  console.log('SCHEMA resp:')
  console.log(resp)

  node.close()
}
main().catch(console.error)
