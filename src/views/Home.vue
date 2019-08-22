<template>
  <div class="home">
    <img alt="logo" src="../assets/logo.png">
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',

  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">
</style>
