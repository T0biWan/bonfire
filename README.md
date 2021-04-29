# Bonfire

> A CRUD skeleton for vue projects using firebase

## Browser Support

| ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) |
| ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Latest ✔                                                                                    | Latest ✔                                                                                 |

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need a current version of [npm](https://nodejs.org/en/), 6.11.0 was used during development.

### Installing

After cloning the repository, install the dependencies. You can then run a development server or build the project.

```bash
# install dependencies
npm install

# serve with hot reload at localhost:4200
npm run dev

# build for production with minification
npm run build
```

## Usage

The basic API communciation structure, that we use, works like this:

> Backend <=> FirebaseWrapper <=> Store Module (using API, Models and Parser) <=> Component

- The FirebaseWrapper provides us the basic communication with our Backend (Firebase), like GET and POST.
- The Vuex Store uses distinct Modules for every resource. Which contains the specific API implementation for this resource.
- The specific API implementation takes the response from the Backend and build Objects from it, using the defined Models
- Components are then able to interact with the data in the Store

### Add Firebase

Start by creating a [new firebade project](https://console.firebase.google.com/u/0/). Click on 'add firebade to my web app' to get your web app's firebase configuration. Copy the following ('*****' will be your own, actual, values):

```js
var firebaseConfig = {
  apiKey: "*****",
  authDomain: "*****",
  databaseURL: "*****",
  projectId: "*****",
  storageBucket: "*****",
  messagingSenderId: "*****",
  appId: "*****"
}
```

Add your web app's firebase configuration to `@/api/firebase.js`, a placeholder is already there, just overwrite it.

### Create a Model

We use models, to have a single source of truth in our frontend, that describes our data structures.

Create a `js`-file for every model your frontend will need, I suggest using the [ES6 class syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) to define your models.

It should provides a constructor to initialise objects. Note that the underscore notation `_id` is a common way to make attributes in _JavaScript_ private, since it is not a feature of the language.

Furthermore the model provides some getters and setters, which could be customized for other needs then just getting the attribute. Models can also contain methods to further manipulate the instantiated objects.

An example:

```js
// @/models/note.js
export class Note {
  constructor (id, author, created, edited, markdown) {
    this._id = id
    this._author = author
    this._created = created
    this._edited = edited
    this._markdown = markdown
  }

  get id () { return this._id }
  get author () { return this._author }
  get created () { return this._created }
  get edited () { return this._edited }
  get markdown () { return this._markdown }

  set id (id) { this._id = id }
  set author (author) { this._author = author }
  set created (created) { this._created = created }
  set edited (edited) { this._edited = edited }
  set markdown (markdown) { this._markdown = markdown }

  firstline () { return this._markdown.split('\n', 1)[0] }
}
```

_Bonfire_ provides a script, `render-model.js`, that is able to create models for you. To use it, pass it the name of your model and its attributes: `node render-model <ressource> <attribute> [<attribute> ...]`

The created file needs to be placed in `@/models`.

### Store configuration

We built a module for every ressource we want to use. This Module contains the _state_, _getters_, _mutations_ and _actions_ we know from [Vuex](https://vuex.vuejs.org/) and also contains the specific API communication for this ressource and the specific parsing from Backend responses into instances of our model.

The module needs to import the needed dependencies, like the specific model and backend wrapper

```js
// @/api/souls
import Vue from 'vue'
import * as firebase from '@/api/firebase'
import * as soul_model from '@/models/soul'
```

Take a look at the module. The `module`-object will be registered in the _Vuex_-store. It contains the _state_, _mutation_, _getters_ and _actions_.

The `api`-object provides fucntions to interact with the backend wrapper and uses the functions from the `parser`-object to built instances of our model from the backend responses.

```js
// @/api/souls
const souls_container = {
  module: {
    namespaced: true,

    state: {
      souls: {},
      active_soul_id: false
    },

    getters: {
      souls (state) { return state.souls },
      active_soul (state) { return state.active_soul_id ? state.souls[state.active_soul_id] : false }
    },

    mutations: {
      add_soul (state, soul) { Vue.set(state.souls, soul.id, soul) },
      delete_soul (state, soul) { Vue.delete(state.souls, soul.id) },
      set_active_soul (state, soul) { state.active_soul_id = soul.id },
      update_soul (state, soul) { state.souls[soul.id] = soul }
    },

    actions: {
      async get_souls (context) {
        const souls = await souls_container.api.get_souls()
        for (let soul of souls) context.commit('add_soul', soul)
      },

      async get_soul_by_id (context, id) {
        const soul = await souls_container.api.get_soul_by_id(id)
        context.commit('add_soul', soul)
      },

      async get_souls_by_field (context, payload) {
        const souls = await souls_container.api.get_souls_by_field(payload.field, payload.value)
        for (let soul of souls) context.commit('add_soul', soul)
      },

      async create_soul (context, soul) {
        const id = await souls_container.api.create_soul(soul)
        soul = await souls_container.api.get_soul_by_id(id)
        context.commit('add_soul', soul)
        context.commit('set_active_soul', soul)
      },

      async update_soul (context, payload) {
        await souls_container.api.update_soul(payload.id, payload.data)
        const soul = await souls_container.api.get_soul_by_id(payload.id)
        context.commit('update_soul', soul)
      },

      async update_active_soul (context) {
        let soul = context.getters.active_soul
        await souls_container.api.update_soul(soul.id, { name: soul.name })
        soul = await souls_container.api.get_soul_by_id(soul.id)
        context.commit('update_soul', soul)
      },

      async delete_soul (context, id) {
        await souls_container.api.delete_soul(id)
        context.commit('delete_soul', context.state.souls[id])
      },

      async delete_active_soul (context) {
        let soul = context.getters.active_soul
        await souls_container.api.delete_soul(soul.id)
        context.commit('delete_soul', soul)
        context.commit('set_active_soul', false)
      }
    }
  },

  api: {
    get_souls: async function () {
      const documents = await firebase.read('souls')
      const souls = documents.map(document => souls_container.parser.instantiate_soul(document))
      return souls
    },

    create_soul: async function (soul) {
      const id = await firebase.create('souls', soul)
      return id
    },

    get_soul_by_id: async function (id) {
      const document = await firebase.readById('souls', id)
      const souls = souls_container.parser.instantiate_soul(document)
      return souls
    },

    get_souls_by_field: async function (field, value) {
      const documents = await firebase.readByField('souls', field, value)
      const souls = documents.map(document => souls_container.parser.instantiate_soul(document))
      return souls
    },

    update_soul: async function (id, data) {
      await firebase.update('souls', id, data)
    },

    delete_soul: async function (id) {
      await firebase.remove('souls', id)
    }
  },

  parser: {
    instantiate_soul: function (document) {
      const id = document.id
      const name = document.data().name

      return new soul_model.Soul(id, name)
    }
  }
}
```

Finally the modul is exported

```js
// @/api/souls
export default souls_container
```

_Bonfire_ provides a script, `render-modul.js`, that is able to create moduls for you. To use it, pass it the name of your model and its attributes: `node render-modul <ressource> <attribute> [<attribute> ...]`

The created file needs to be placed in `@/api`.

To register your modul go to `@/store.js`

```js
// @/store
import Vue from 'vue'
import Vuex from 'vuex'

import souls from '@/api/souls' // import it

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    souls: souls.module // register it
  }
})
```

#### Use CRUD

Since we use _Vuex_ you can use the CRUD functions all over your application.

##### Create

```js
this.$store.dispatch('souls/create_soul', data)
```

Data can be any object, for example: `{ name: '3' }`. Just make sure that it fits within the datamodel that you defined as a _class_ in `@/api/souls-api.js`. Note that firebase will create id's for you, don't manually add id's.

##### Read

```js
this.$store.dispatch('souls/get_souls')
```

```js
this.$store.dispatch('souls/get_soul_by_id', id)
```

Id could be for example: `QTDZWFY8PLmYIo7GuKCn`

```js
this.$store.dispatch('souls/get_souls_by_field', { field: 'name', value: '33'})
```

##### Update

```js
this.$store.dispatch('souls/update_soul', { id: 'lnsNTaw0z1li7n5WiggR', data: { name: '1' } })
```

##### Delete

```js
this.$store.dispatch('souls/delete_soul', id)
```

Id could be for example: `QTDZWFY8PLmYIo7GuKCn`

## Built With

- [Vue.js](https://vuejs.org/) - Frontend framework
- [Firebase](https://firebase.google.com/) - Development Platform

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/T0biWan/bachelor-frontend-prototype/tags).

## Authors

- **Tobias Klatt** - _Initial work_ - [GitHub](https://github.com/T0biWan/)
