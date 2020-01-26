// helper script to make ES6 class files for models
// this file expects the resource name and its attributes as command line arguments
// node render-model <ressource> <attribute> [<attribute> ...]
//
// For Example:
// node render-model.js note id author created edited markdown

const fs = require('fs')

const command_line_arguments = process.argv.slice(2)
const ressource = command_line_arguments[0]
const attributes = command_line_arguments.slice(1)

const tab = '  '
const content =
`export class ${capitalize(ressource)} {
${tab}${constructor()}

${tab}${getters()}

${tab}${setters()}
}`

fs.writeFileSync(`${ressource.toLowerCase()}.js`, content)

function capitalize (str) { return str.charAt(0).toUpperCase() + str.slice(1) }

function constructor () {
  const head = `constructor (${attributes.join(', ')}) {\n`
  const body = `${tab}${tab}${attributes.map(attribute => `this._${attribute} = ${attribute}`).join(`\n${tab}${tab}`)}\n${tab}}`

  const constructor_content = head + body
  return constructor_content
}

function getters () {
  const content = `${attributes.map(attribute => `get ${attribute} () { return this._${attribute} }`).join(`\n${tab}`)}`
  return content
}

function setters () {
  const content = `${attributes.map(attribute => `set ${attribute} (${attribute}) { this._${attribute} = ${attribute} }`).join(`\n${tab}`)}`
  return content
}
