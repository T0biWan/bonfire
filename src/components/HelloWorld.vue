<template>
  <div>
    <h1>Welcome to Your Bonfire</h1>
    <div>{{ corgis }}</div>
  </div>
</template>

<script>
import * as api from '@/api/corgi-api'

export default {
  name: 'HelloWorld',

  mounted () {
    api.getCorgis()
    // this.$store.dispatch('getCorgies')
  },

  computed: {
    corgis () { return this.$store.getters.corgis }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
