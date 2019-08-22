<template>
  <div>
    <h1>Welcome to Your Bonfire</h1>

    <table>
      <thead>
        <th>id</th><th>name</th>
      </thead>
      <tbody>
        <tr v-for="corgi in corgis" :key="corgi.id">
          <td>{{ corgi.id }}</td>
          <td>{{ corgi.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',

  created () {
    // this.$store.dispatch('createCorgie', { name: '33' })
    // this.$store.dispatch('getCorgieById', '0b8Ns2rWNrCLAgIKpOKb')
    // this.$store.dispatch('getCorgiesByField', { field: 'name', value: '3'})
    // this.$store.dispatch('updateCorgie', { id: '0b8Ns2rWNrCLAgIKpOKb', data: { name: 'Nadine' } })
    // this.$store.dispatch('deleteCorgie', 'RBkIsod21HIzPwwSbLVF')
    this.$store.dispatch('getCorgies')
  },

  computed: {
    corgis () { return this.$store.getters.corgis }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
table {
  width: 30%;
}

table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
