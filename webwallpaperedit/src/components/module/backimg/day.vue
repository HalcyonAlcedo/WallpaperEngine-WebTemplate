<template>
  <div class="day" id="dayscene" data-relative-input="true">
    <img v-for="img in image.img" :key="img.key" :src="img.src" :data-depth="img.depth" :style="img.css" >
  </div>
</template>


<script>
import Parallax from 'parallax-js'  

export default {
  name: 'day',
  data () {
    return {
      parallaxjs: null,
      Season: null
    }  
  },
  computed: {
    label (){
        return {
            day:this.$store.getters.donewallpaperconfig.common.periods.day.label,
            night:this.$store.getters.donewallpaperconfig.common.periods.night.label,
            dusk:this.$store.getters.donewallpaperconfig.common.periods.dusk.label,
            spring:this.$store.getters.donewallpaperconfig.common.Season.spring,
            summer:this.$store.getters.donewallpaperconfig.common.Season.summer,
            autumn:this.$store.getters.donewallpaperconfig.common.Season.autumn,
            winter:this.$store.getters.donewallpaperconfig.common.Season.winter,
            layer:this.$store.getters.donewallpaperconfig.layer
          }
      },
      image:function(){
        let label=this.label,
            layer=label.layer,
            imglist =new Array,
            _this=this
        this.$store.dispatch('setseasoncurrent', this.Season)  
        for(let i in layer)
          {
            imglist.push({
              src:(!layer[i].src || layer[i].src === 'undefined') ? ('./static/resources/'+layer[i].file+' '+this.Season+' '+label.day+'.'+layer[i].type) : 
              ('./static/resources/'+layer[i].src),
              depth:layer[i].parallax ? layer[i].parallax : 0,
              css:layer[i].class,
              key:layer[i].file
            })
          }
          this.$nextTick(function(){
            let scene = document.getElementById('dayscene')
            if(_this.parallaxjs===null)
            {
              _this.parallaxjs=false
              setTimeout(() => {
              _this.parallaxjs = new Parallax(scene,{relativeInput : true})
              }, 500)
            }
          })
          return {
            img:imglist
          }
      },
      parallax (){
        return this.$store.getters.doneParallax;
      },
      season (){
        return this.$store.getters.doneseason;
      },
      configload (){
        return this.$store.getters.doneconfigload;
      }
  },
  watch: {
    parallax(val) {
        val ?
        this.parallaxjs.enable() :
        this.parallaxjs.disable()
    },
    season(val){
      this.seasonupdate(val)
    }
  },
  methods:{
    seasonupdate:function(val){
      let label=this.label,
          date = new Date,
          _this = this
      date=date.getMonth()+1;
      if(val=='sAuto' || val=='nAuto')
          {
            switch( true )
            {
            case date>=label.spring.months.start && date<=label.spring.months.end:
            this.Season = val=='nAuto' ? label.spring.label : label.autumn.label
            break;
            case date>=label.summer.months.start && date<=label.summer.months.end:
            this.Season = val=='nAuto' ? label.summer.label : label.winter.label
            break;
            case date>=label.autumn.months.start && date<=label.autumn.months.end:
            this.Season = val=='nAuto' ? label.autumn.label : label.spring.label
            break;
            case date>=label.winter.months.start || date<=label.winter.months.end:
            this.Season = val=='nAuto' ? label.winter.label : label.summer.label
            break;
            default:
            this.Season = 'spring'
            }
          }
          else
            this.Season = val
    }
  },
  mounted (){
    this.seasonupdate(this.season)
  }
}
</script>

<style scoped>
img {
    z-index: 1;
    position: absolute;
    width: 110vw;
    height: 110vh;
}
div {
    margin-left: -5vw;
    margin-top: -5vh;
}
.day {
    position: fixed;
}
</style>