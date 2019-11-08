<template>
  <div>
    <h1>Welcome to Your Bonfire</h1>
    <table>
      <thead>
        <th>id</th><th>name</th>
      </thead>
      <tbody>
        <tr v-for="soul in new_soul" :key="soul.id">
          <td>{{ soul.id }}</td>
          <td>{{ soul.name }}</td>
        </tr>
      </tbody>
    </table>

    {{ $store.state.new_souls }}
    <br>
    {{ $store.state.active }}

    <button @click="$store.commit('update_new_soul', {'new_soul_id': '3LdbeBGwaop3vFrxtNgB', 'new_soul': {'id': '3LdbeBGwaop3vFrxtNgB', 'name': 'Tobi' }})">Click Mich</button>

  </div>
</template>

<script>
export default {
  name: 'Showcase',

  created () {
    // this.$store.dispatch('create_soul', { name: 'Korvo' })
    this.$store.dispatch('get_souls')
    // this.$store.dispatch('get_soul_by_id', 'D56zJTGMluTUh8LRukqP')
    // this.$store.dispatch('get_souls_by_field', { field: 'name', value: 'Kaddi'})
    // this.$store.dispatch('update_soul', { id: 'lnsNTaw0z1li7n5WiggR', data: { name: '1' } })
    // this.$store.dispatch('delete_soul', 'QTDZWFY8PLmYIo7GuKCn')
  },

  computed: {
    souls () { return this.$store.getters.souls },
    new_soul () { return this.$store.getters.new_souls }
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
