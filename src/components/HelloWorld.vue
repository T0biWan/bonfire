<template>
  <div>
    <h1>Welcome to Your Bonfire</h1>
    <div>{{ corgis }}</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',

  mounted () {
    this.$store.dispatch('getCorgies')
  },

  computed: {
    corgis () { return this.$store.getters.corgis }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
