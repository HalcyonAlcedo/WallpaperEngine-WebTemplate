<template>
  <div class="clock">
      <span id='time'> 
          {{clock.h}}:{{clock.m}}
          <span class='sec'>{{clock.s}}</span> 
      </span>
  </div>
</template>

<script>
const oClock = document.querySelector("#clock")
export default {
  name: 'clock',
  data () {
    return {
      clock2 : true,
      clockx : 0,
      clocky : 0,
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
      }
  },
  mounted (){
    var _this = this;
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
    top: 46%;
    left: 10%;
    text-align: center;
    color: rgb(247, 255, 212);
    font-size: 50px;
    font-family: 'papyrus';
    text-shadow: 0 0 20px #7A378B;
    z-index: 10;
}
.clock #sec {
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