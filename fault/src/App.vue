<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    window.wallpaperPropertyListener = {
      applyUserProperties: function(properties) {
        if (properties.Parallax) {
          this.$store.commit('setParallax', properties.Parallax.value)
        }
        if (properties.clock1) {
          this.$store.commit('setclock1', properties.clock1.value)
        }
        if (properties.season) {
          this.$store.commit('setseason', properties.season.value)
        }
        if (properties.clock2) {
          this.$store.commit('setclock2', properties.clock2.value)
        }
        if (properties.clockx) {
          this.$store.commit('setclockx', properties.clockx.value)
        }
        if (properties.clocky) {
          this.$store.commit('setclocky', properties.clocky.value)
        }
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
