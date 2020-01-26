// helper script to make Vuex modules
// this file expects the resource name and its attributes as command line arguments
// node render-module.js <ressource> <attribute> [<attribute> ...]
//
// For Example:
// node render-module.js note id author created edited markdown

const fs = require('fs')

const command_line_arguments = process.argv.slice(2)
const ressource = command_line_arguments[0]
const attributes = command_line_arguments.slice(1)

const tab = '  '
const content =
`import * as backend from '@/api/backend'
import * as ${ressource}_model from '@/models/${ressource}'

const ${ressource}s_container = {
  module: {
    namespaced: true,

    state: {
      ${ressource}s: {},
      active_${ressource}_id: false
    },

    getters: {
      ${ressource}s (state) { return state.${ressource}s },
      active_${ressource} (state) { return state.active_${ressource}_id ? state.${ressource}s[state.active_${ressource}_id] : false }
    },

    mutations: {
      add_${ressource} (state, ${ressource}) { Vue.set(state.${ressource}s, ${ressource}.id, ${ressource}) },
      delete_${ressource} (state, ${ressource}) { Vue.delete(state.${ressource}s, ${ressource}.id) },
      set_active_${ressource} (state, ${ressource}) { state.active_${ressource}_id = ${ressource}.id },
      update_${ressource} (state, ${ressource}) { state.${ressource}s[${ressource}.id] = ${ressource} }
    },

    actions: {
      async get_${ressource}s (context) {
        const ${ressource}s = await ${ressource}s_container.api.get_${ressource}s()
        for (let ${ressource} of ${ressource}s) context.commit('add_${ressource}', ${ressource})
      },

      async get_${ressource}_by_id (context, id) {
        const ${ressource} = await ${ressource}s_container.api.get_${ressource}_by_id(id)
        context.commit('add_${ressource}', ${ressource})
      },

      async get_${ressource}s_by_field (context, payload) {
        const ${ressource}s = await ${ressource}s_container.api.get_${ressource}s_by_field(payload.field, payload.value)
        for (let ${ressource} of ${ressource}s) context.commit('add_${ressource}', ${ressource})
      },

      async create_${ressource} (context, ${ressource}) {
        const id = await ${ressource}s_container.api.create_${ressource}(${ressource})
        ${ressource} = await ${ressource}s_container.api.get_${ressource}_by_id(id)
        context.commit('add_${ressource}', ${ressource})
        context.commit('set_active_${ressource}', ${ressource})
      },

      async update_${ressource} (context, payload) {
        await ${ressource}s_container.api.update_${ressource}(payload.id, payload.data)
        const ${ressource} = await ${ressource}s_container.api.get_${ressource}_by_id(payload.id)
        context.commit('update_${ressource}', ${ressource})
      },

      async update_active_${ressource} (context) {
        let ${ressource} = context.getters.active_${ressource}
        await ${ressource}s_container.api.update_${ressource}(${ressource}.id, { name: ${ressource}.name })
        ${ressource} = await ${ressource}s_container.api.get_${ressource}_by_id(${ressource}.id)
        context.commit('update_${ressource}', ${ressource})
      },

      async delete_${ressource} (context, id) {
        await ${ressource}s_container.api.delete_${ressource}(id)
        context.commit('delete_${ressource}', context.state.${ressource}s[id])
      },

      async delete_active_${ressource} (context) {
        let ${ressource} = context.getters.active_${ressource}
        await ${ressource}s_container.api.delete_${ressource}(${ressource}.id)
        context.commit('delete_${ressource}', ${ressource})
        context.commit('set_active_${ressource}', false)
      }
    }
  },

  api: {
    get_${ressource}s: async function () {
      const documents = await backend.read('${ressource}s')
      const ${ressource}s = documents.map(document => ${ressource}s_container.parser.instantiate_${ressource}(document))
      return ${ressource}s
    },

    create_${ressource}: async function (${ressource}) {
      const id = await backend.create('${ressource}s', ${ressource})
      return id
    },

    get_${ressource}_by_id: async function (id) {
      const document = await backend.readById('${ressource}s', id)
      const ${ressource}s = ${ressource}s_container.parser.instantiate_${ressource}(document)
      return ${ressource}s
    },

    get_${ressource}s_by_field: async function (field, value) {
      const documents = await backend.readByField('${ressource}s', field, value)
      const ${ressource}s = documents.map(document => ${ressource}s_container.parser.instantiate_${ressource}(document))
      return ${ressource}s
    },

    update_${ressource}: async function (id, data) {
      await backend.update('${ressource}s', id, data)
    },

    delete_${ressource}: async function (id) {
      await backend.remove('${ressource}s', id)
    }
  },

  parser: {
    instantiate_${ressource}: function (document) {
      const ${attributes[0]} = document.${attributes[0]}
      ${attributes.slice(1).map(a => `const ${a} = document.data().${a}`).join(`\n${tab}${tab}${tab}`)}

      return new ${ressource}_model.${ressource.charAt(0).toUpperCase() + ressource.slice(1)}(${attributes.join(', ')})
    }
  }
}

export default ${ressource}s_container
`

fs.writeFileSync(`${ressource.toLowerCase()}s.js`, content)
