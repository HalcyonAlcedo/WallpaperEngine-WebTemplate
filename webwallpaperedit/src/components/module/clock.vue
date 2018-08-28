<template>
  <div data-relative-input = "true" id="clock" class="clock" v-bind:style="styleObject">
      <span id='time' :data-depth="parallaxconfig ? parallaxconfig:0"> 
          {{clock.h}}:{{clock.m}}
          <span class='sec'>{{clock.s}}</span> 
      </span>
  </div>
</template>

<script>
import Parallax from 'parallax-js'

const oClock = document.querySelector("#clock")
export default {
  name: 'clock',
  data () {
    return {
      clocktime: new Date(),
      parallaxjs: null
    }
  },
  computed: {
      clock : function(){
          let add0 = function(n){
              return n < 10 ? '0' + n : '' + n
          }
          let h = add0(this.clocktime.getHours()) , m = add0(this.clocktime.getMinutes()) , s = add0(this.clocktime.getSeconds())
          if(this.clock2)
            h = h <= 12 ? h : h - 12
          return {
              h , m , s
          } 
      },
      clock2(){
        return this.$store.getters.doneclock2
      },
      clockx(){
        return this.$store.getters.doneclockx
      },
      clocky(){
        return this.$store.getters.doneclocky
      },
      styleObject(){
          return {
            top: this.clocky+'%',
            left: this.clockx+'%'
          }
      },
      parallax (){
        return this.$store.getters.doneParallax
      },
      parallaxconfig (){
        return this.$store.getters.donewallpaperconfig.layer.background.parallax
      }
  },
  watch: {
    parallax(val) {
        val ?
        this.parallaxjs.enable() :
        this.parallaxjs.disable()
    },
    parallaxconfig(val) {
      if(this.$store.getters.donewallpaperconfig.common.effect.clock.parallax)
      this.parallaxjs.friction(val,val)
      else
      this.parallaxjs.friction(0,0)
    }
  },
  mounted (){
    var _this = this;
    var scene = document.getElementById('clock')
    this.parallaxjs = new Parallax(scene,{relativeInput : true})
    this.timer = setInterval(function() {
        _this.clocktime = new Date()
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
.clock {
    position: fixed;
    text-align: center;
    color: rgb(255, 255, 255);
    font-size: 50px;
    font-family: 'papyrus';
    text-shadow: 0 0 20px rgb(210, 88, 226);
    z-index: 1;
}
.clock .sec {
    text-shadow: 0 0 30px rgb(250, 182, 36);
    font-size: 0.5em;
}
.clock #time {
    position: relative;
}
.clock .st {
    position: absolute;
    right: 2%;
    top: 15%;
    font-size: 0.25em;
    line-height: 1;
}
</style>