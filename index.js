const IndyReq = require('indy-request')
const bs58 = require('bs58')
const nacl = require('tweetnacl')
const indyCrypto = require('./indy-crypto/node/indy_crypto')

//key taken from genesis file
let SERVERKEY = bs58.decode('HXrfcFWDjWusENBoXhV8mARzq51f1npWYWaA1GzfeMDG')

async function main () {
  // node configuration, taken from genesis file
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
  // generate key pair
  let my1    = nacl.sign.keyPair.fromSeed(Buffer.from('00000000000000000000000000000My1', 'utf8'))
  let sender = nacl.sign.keyPair.fromSeed(Buffer.from('000000000000000000000000Trustee1', 'utf8'))
  // create did from public key
  let my1DID    = bs58.encode(Buffer.from(my1.publicKey.slice(0, 16)))
  let my1Verkey = bs58.encode(Buffer.from(my1.publicKey))
  let senderDID = bs58.encode(Buffer.from(sender.publicKey.slice(0, 16)))

  // anchor nym to ledger with trustee role
  console.log('Anchor NYM')
  let resp = await node.send({
    operation: {
      type: IndyReq.type.NYM,
      dest: my1DID,
      role: IndyReq.role.TRUSTEE,
      verkey: my1Verkey
    },
    identifier: senderDID,
    protocolVersion: 2
  }, sender.secretKey)

  console.log('NYM resp:')
  console.log(resp)

  // anchor schema
  console.log('Anchor SCHEMA')
  resp = await node.send({
    operation: {
      type: IndyReq.type.SCHEMA,
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

  const schemaSeqNo = resp.result.txnMetadata.seqNo

  // create credential definition 
  // 
  // anchor credential definition
  console.log('Going to CRED_DEF')
  resp = await node.send({
    operation: {
      type: IndyReq.type.CRED_DEF,

      signature_type: 'CL',

      ref: schemaSeqNo,
      tag: 'something-cool',

      data: {
        primary: { key: my1Verkey }, // TODO is this right?
        revocation: { key: my1Verkey }// TODO is this right?
      }
    },
    identifier: my1DID,
    protocolVersion: 2
  }, my1.secretKey)

  console.log('CRED_DEF resp:')
  console.log(resp)

  node.close()
}
main().catch(console.error)
