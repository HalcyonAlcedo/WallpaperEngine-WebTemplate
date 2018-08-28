<template>
  <div id="app">
    <router-view/>
    <transition name="fade">
      <loadview v-if="configload"></loadview>
    </transition>
  </div>
</template>

<script>
import loadview from '@/components/loadview'

export default {
  name: 'App',
  components: {
      'loadview': loadview
  },
  mounted(){
    let _this=this
    this.$store.dispatch('setconfigdata')
    window.wallpaperPropertyListener = {
      applyUserProperties: function(properties) {
        if (properties.Parallax) {
          _this.$store.dispatch('setParallax', properties.Parallax.value)
        }
        if (properties.clock1) {
          _this.$store.dispatch('setclock1', properties.clock1.value)
        }
        if (properties.season) {
          _this.$store.dispatch('setseason', properties.season.value)
        }
        if (properties.clock2) {
          _this.$store.dispatch('setclock2', properties.clock2.value)
        }
        if (properties.clockx) {
          _this.$store.dispatch('setclockx', properties.clockx.value)
        }
        if (properties.clocky) {
          _this.$store.dispatch('setclocky', properties.clocky.value)
        }
        if (properties.region) {
          let region=JSON.parse(properties.region.value)
          _this.$store.dispatch('setsunrise', {
            w: region.w,
            s: region.s,
            u: region.u
          })
        }
      }
    }
  },
  computed: {
    configload (){
          return !this.$store.getters.doneconfigload;
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
html {
  overflow-x: hidden;
  overflow-y: hidden;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 2.5s ease-in;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
