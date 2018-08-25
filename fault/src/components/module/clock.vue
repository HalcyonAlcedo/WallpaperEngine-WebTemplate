<template>
  <div data-relative-input = "true" id="clock" class="clock" v-bind:class = "position">
      <span id='time' data-depth="0.1"> 
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
      clocktime: new Date()
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
        return this.$store.state.clock2.value;
      },
      clockx(){
        return this.$store.state.clockx.value;
      },
      clocky(){
        return this.$store.state.clocky.value;
      },
      position(){
          return {
            top: this.clocky+'%',
            left: this.clockx+'%'
          }
      }
  },
  mounted (){
    var scene = document.getElementById('clock')
    var _this = this;
    new Parallax(scene,{relativeInput : true})
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
    top: 42%;
    left: 10%;
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