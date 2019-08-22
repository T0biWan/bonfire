<template>
  <div class="home">
    <img alt="logo" src="../assets/logo.png">
    <Showcase />
  </div>
</template>

<script>
import Showcase from '@/components/Showcase.vue'

export default {
  name: 'home',

  components: {
    Showcase
  }
}
</script>

<style lang="scss">
</style>
