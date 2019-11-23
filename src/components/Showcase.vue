<template>
  <div>
    <h1>Welcome to Your Bonfire</h1>
    <table>
      <thead>
        <th>id</th><th>name</th>
      </thead>
      <tbody>
        <tr v-for="soul in souls" :key="soul.id">
          <td>{{ soul.id }}</td>
          <td>{{ soul.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Showcase',

  created () {
    // this.$store.dispatch('souls/create_soul', { name: 'Korvo' })
    this.$store.dispatch('souls/get_souls')
    // this.$store.dispatch('souls/get_soul_by_id', 'D56zJTGMluTUh8LRukqP')
    // this.$store.dispatch('souls/get_souls_by_field', { field: 'name', value: 'Kaddi'})
    // this.$store.dispatch('souls/update_soul', { id: 'lnsNTaw0z1li7n5WiggR', data: { name: '1' } })
    // this.$store.dispatch('souls/delete_soul', 'QTDZWFY8PLmYIo7GuKCn')
  },

  computed: {
    souls () { return this.$store.getters['souls/souls'] }
  }
}
</script>

<style scoped lang="scss">
table {
  width: 30%;
}

table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
