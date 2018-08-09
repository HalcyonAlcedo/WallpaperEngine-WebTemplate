<template>
  <div class="background">
    <transition name="component-fade" mode="in-out">
      <component v-bind:is="view"></component>
    </transition>
  </div>
</template>

<script>
import Parallax from 'parallax-js'

import day from '@/components/module/backimg/day'
import evening from '@/components/module/backimg/evening'
import night from '@/components/module/backimg/night'

export default {
  name: 'background',
  data () {
    return {
        view: 'day',
        clocktime: new Date()
    }
  },
  components: {
      'day': day,
      'evening': evening,
      'night': night
  },
  computed: {
      computed () {
        return this.$store.computed
      },
      clock : function(){
          let add0 = function(n){
              return n < 10 ? '0' + n : '' + n
          }
          let h = add0(this.clocktime.getHours()) , m = add0(this.clocktime.getMinutes()) , s = add0(this.clocktime.getSeconds())
          return {
              h , m , s
          } 
      }
  },
    mounted (){
    var _this = this;
    this.timer = setInterval(function() {
        _this.clocktime = new Date()
        switch( true )
          {
          case _this.clock.h>=6 && _this.clock.h<19:
          _this.view = 'day'
          break;
          case _this.clock.h>=19 && _this.clock.h<20:
          _this.view = 'evening'
          break;
          case _this.clock.h>=20 || _this.clock.h<6:
          _this.view = 'night'
          break;
          default:
          _this.view = 'day'
          }
    }, 1000)
  },
  beforeDestroy(){
      if(this.timer) {
        clearInterval(this.timer)
      }
  }
}
</script>

<style scoped>
.background {
    position: fixed;
}

.component-fade-enter-active, .component-fade   -leave-active {
  transition: opacity 300s ease;
}
.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
}
</style>