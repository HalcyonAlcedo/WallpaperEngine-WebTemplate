<template>
  <div class="background">
    <transition name="component-fade" mode="in-out">
      <component v-bind:is="view"></component>
    </transition>
  </div>
</template>

<script>
import sunrise from '@/assets/sunrise.js'

import day from '@/components/module/backimg/day'
import evening from '@/components/module/backimg/evening'
import night from '@/components/module/backimg/night'

export default {
  name: 'background',
  data () {
    let sunrisedate=sunrise(39.540,115.240,8)
    let add0 = function(n){
              return n < 10 ? '0' + n : '' + n
          }
    return {
        sunrisetime:{
          sunrise: {
            h: add0(sunrisedate.SunRise.getHours()),
            m: add0(sunrisedate.SunRise.getMinutes())
          },
          sunset: {
            h: add0(sunrisedate.SunSet.getHours()),
            m: add0(sunrisedate.SunSet.getMinutes())
          },
          Dusk:{
            h: add0(sunrisedate.SunSet.getMinutes() < 30 ? sunrisedate.SunSet.getHours()-1 : sunrisedate.SunSet.getHours()),
            m: add0(sunrisedate.SunSet.getMinutes() < 30 ? 30-sunrisedate.SunSet.getMinutes() : 30-sunrisedate.SunSet.getMinutes()+30)
          }
        },
        clocktime: new Date(),
        adjustment:'3:30'
    }
  },
  components: {
      'day': day,
      'evening': evening,
      'night': night
  },
  computed: {
      clock : function(){
          let add0 = function(n){
              return n < 10 ? '0' + n : '' + n
          }
          let h = add0(this.clocktime.getHours()) , m = add0(this.clocktime.getMinutes()) , s = add0(this.clocktime.getSeconds())
          return {
              h , m , s
          } 
      },
      view () {
        let timecompare = function(time1,time2){
          if(time1.h >= time2.h)
          {
            if(time1.h == time2.h)
              if(time1.m >= time2.m)
                return true
              else 
                return false
            else
              return true
          }
          else
          return false
        }
        switch( true )
          {
          case timecompare(this.clock,this.sunrisetime.sunrise) && timecompare(this.sunrisetime.Dusk,this.clock):
          return 'day'
          break;
          case timecompare(this.clock,this.sunrisetime.Dusk) && timecompare(this.sunrisetime.sunset,this.clock):
          return 'evening'
          break;
          case timecompare(this.clock,this.sunrisetime.sunset) || timecompare(this.sunrisetime.sunrise,this.clock):
          return 'night'
          break;
          default:
          return 'day'
          }
      }
  },
    mounted (){
    var _this = this;
    this.timer = setInterval(function() {
        /*let adjustmenttime=new Date()
        if(_this.adjustment.slice(0,1)=='-')
        {
          let sHours= adjustmenttime.getHours()-_this.adjustment.slice(0,_this.adjustment.indexOf(":")),
              sMinutes= adjustmenttime.getMinutes()-_this.adjustment.slice(_this.adjustment.indexOf(":")+1)
          if(sMinutes<0)
          {
            sHours-= 1
            sMinutes+= 59
          }
          if(sHours<0)
          {
            sHours+= 23
          }
          adjustmenttime.setHours(sHours,sMinutes)
        }
        else
        {
          let sHours= adjustmenttime.getHours()+_this.adjustment.slice(0,_this.adjustment.indexOf(":")),
              sMinutes= adjustmenttime.getMinutes()+_this.adjustment.slice(_this.adjustment.indexOf(":")+1)
          if(sMinutes>=59)
          {
            sHours+= 1
            sMinutes-= 59
          }
          if(sHours>=23)
          {
            sHours-= 23
          }
          adjustmenttime.setHours(sHours,sMinutes)
        }
        _this.clocktime = adjustmenttime*/
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
.background {
    position: fixed;
}

.component-fade-enter-active {
  transition: opacity 10s ease;
}

.component-fade-enter, .component-fade-leave-to{
  opacity: 0;
}

</style>