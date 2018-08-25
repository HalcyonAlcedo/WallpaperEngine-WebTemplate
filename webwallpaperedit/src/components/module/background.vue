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
    const deviation={
      day:this.$store.getters.donewallpaperconfig.common.periods.day.deviation,
      night:this.$store.getters.donewallpaperconfig.common.periods.night.deviation,
      dusk:this.$store.getters.donewallpaperconfig.common.periods.dusk.deviation
    }
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
            h: add0(sunrisedate.SunSet.getMinutes() < deviation.dusk ? sunrisedate.SunSet.getHours()-1 : sunrisedate.SunSet.getHours()),
            m: add0(sunrisedate.SunSet.getMinutes() < deviation.dusk ? deviation.dusk-sunrisedate.SunSet.getMinutes() : deviation.dusk-sunrisedate.SunSet.getMinutes()+deviation.dusk)
          }
        },
        clocktime: new Date()
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
      },
      getsunrise (){
        return this.$store.getters.donesunrise
      }
  },
  watch: {
    getsunrise(val) {
      const deviation={
        day:this.$store.getters.donewallpaperconfig.common.periods.day.deviation,
        night:this.$store.getters.donewallpaperconfig.common.periods.night.deviation,
        dusk:this.$store.getters.donewallpaperconfig.common.periods.dusk.deviation
      }
      let add0 = function(n){
        return n < 10 ? '0' + n : '' + n
      }
      let sunrisedate=sunrise(val.w,val.s,val.u)
      this.sunrisetime.sunrise.h=add0(sunrisedate.SunRise.getHours())
      this.sunrisetime.sunrise.m=add0(sunrisedate.SunRise.getMinutes())
      this.sunrisetime.sunset.h=add0(sunrisedate.SunSet.getHours())
      this.sunrisetime.sunset.m=add0(sunrisedate.SunSet.getMinutes())
      this.sunrisetime.Dusk.h=add0(sunrisedate.SunSet.getMinutes() < deviation.dusk ? sunrisedate.SunSet.getHours()-1 : sunrisedate.SunSet.getHours())
      this.sunrisetime.Dusk.m=add0(sunrisedate.SunSet.getMinutes() < deviation.dusk ? deviation.dusk-sunrisedate.SunSet.getMinutes() : deviation.dusk-sunrisedate.SunSet.getMinutes()+deviation.dusk)
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
.background {
    position: fixed;
}

.component-fade-enter-active {
  transition: opacity 1200s ease;
}

.component-fade-enter, .component-fade-leave-to{
  opacity: 0;
}

</style>