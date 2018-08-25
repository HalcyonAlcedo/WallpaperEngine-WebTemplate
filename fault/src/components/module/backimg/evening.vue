<template>
  <div data-relative-input = "true" id="eveningscene" class="evening">
    <img name="bg" :src="image.bg" data-depth="0.1" alt="">
    <img name="mid" :src="image.mid" data-depth="0.15" alt="">
    <img name="frontl" :src="image.frontl" class="frontl" data-depth="0.3" alt="">
    <img name="frontr" :src="image.frontr" class="frontr" data-depth="0.35" alt="">
  </div>
</template>


<script>
import Parallax from 'parallax-js'

export default {
  name: 'evening',
  computed: {
      image:function(){
          let date = new Date,
              Season = null,
              _this = this;
          date=date.getMonth()+1;
          if(this.season=='Auto')
          {
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
          }
          else
            Season = this.season
          this.$store.commit('setseasoncurrent', Season)
          return {
              bg:require('@/assets/material/bg '+Season+' evening.png'),
              mid:require('@/assets/material/mid '+Season+' evening.png'),
              frontl:require('@/assets/material/frontl '+Season+' evening.png'),
              frontr:require('@/assets/material/frontr '+Season+' evening.png')
          }
      },
      parallax (){
        return this.$store.state.Parallax.value;
      },
      season (){
        return this.$store.state.season.value;
      }
  },
  mounted (){
    var scene = document.getElementById('eveningscene')
    if(this.parallax)
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
.night {
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