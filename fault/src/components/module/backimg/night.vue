<template>
  <div data-relative-input = "true" id="nightscene" class="night">
    <img name="bg" :src="image.bg" data-depth="0.1" alt="">
    <img name="mid" :src="image.mid" data-depth="0.15" alt="">
    <img name="frontl" :src="image.frontl" class="frontl" data-depth="0.3" alt="">
    <img name="frontr" :src="image.frontr" class="frontr" data-depth="0.35" alt="">
  </div>
</template>


<script>
import Parallax from 'parallax-js'

export default {
  name: 'night',
  computed: {
      image:function(){
          let date = new Date,
              Season = null,
              _this = this;
          date=date.getMonth()+1;
          switch( true )
          {
          case date>=3 && date<=5:
          Season = 'spring'
          break;
          case date>=6 && date<=8:
          Season = 'summer'
          break;
          case date>=9 && date<=11:
          Season = 'autumn'
          break;
          case date==12 || date<=2:
          Season = 'winter'
          break;
          default:
          Season = 'spring'
          }
          return {
              bg:require('@/assets/material/bg '+Season+' night.png'),
              mid:require('@/assets/material/mid '+Season+' night.png'),
              frontl:require('@/assets/material/frontl '+Season+' night.png'),
              frontr:require('@/assets/material/frontr '+Season+' night.png')
          }
      }
  },
  mounted (){
    var scene = document.getElementById('nightscene')
    new Parallax(scene,{relativeInput : true})
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
.frontl {
    width: 52vw;
    margin-left: -12vh;
}

.frontr {
    width: 52vw;
    margin-left: 62vw;
}
</style>