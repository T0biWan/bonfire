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
    this.$store.dispatch('souls/get_souls')
    // this.$store.dispatch('souls/create_soul', { name: 'Test' })
    // this.$store.dispatch('souls/get_soul_by_id', 'iYn0x9XiREySOiJOA7kT')
    // this.$store.dispatch('souls/get_souls_by_field', { field: 'name', value: 'Korvo'})
    // this.$store.dispatch('souls/update_soul', { id: 'iYn0x9XiREySOiJOA7kT', data: { name: '1' } })
    // this.$store.dispatch('souls/delete_soul', 'Nxm0K41pMG6PPFqF94KY')
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
