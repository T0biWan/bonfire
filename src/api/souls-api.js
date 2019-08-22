import * as firebase from '@/api/firebase'

class Soul {
  constructor (id, name) {
    this._id = id
    this._name = name
  }

  get id () { return this._id }
  get name () { return this._name }

  set id (id) { this._id = id }
  set name (name) { this._name = name }
}

function instantiateSoul (document) {
  const id = document.id
  const name = document.data().name

  return new datamodel.Soul(id, name)
}

export async function create_soul (soul) {
  const id = await firebase.create('souls', soul)
  return id
}

export async function get_souls () {
  const documents = await firebase.read('souls')
  const souls = []
  for (let document of documents) souls.push(parseDocumentToSoul(document))
  return souls
}

export async function get_soul_by_id (id) {
  const document = await firebase.readById('souls', id)
  const souls = parseDocumentToSoul(document)
  return souls
}

export async function get_souls_by_field (field, value) {
  const documents = await firebase.readByField('souls', field, value)
  const souls = []
  for (let document of documents) souls.push(parseDocumentToSoul(document))
  return souls
}

export async function update_soul (id, data) {
  await firebase.update('souls', id, data)
}

export async function delete_soul (id) {
  await firebase.remove('souls', id)
}
