<template>
  <div class="loadview">
      <div id="load"><span>Wallpaper</span><span class="by" v-if="author">By Alcedo</span></div>
  </div>
</template>

<script>
export default {
  name: 'loadview',
  data () {
    return {
      author: false
    }
  },
  mounted (){
  particlesJS("load",{
  "particles": {
    "number": {
      "value": 8,
      "density": {
        "enable": true,
        "value_area": 1000
      }
    },
    "color": {
      "value": "#1b1e34"
    },
    "shape": {
      "type": "polygon",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 6
      }
    },
    "opacity": {
      "value": 0.3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 160,
      "random": false,
      "anim": {
        "enable": true,
        "speed": 10,
        "size_min": 40,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 200,
      "color": "#ffffff",
      "opacity": 1,
      "width": 2
    },
    "move": {
      "enable": true,
      "speed": 8,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
})
  }
}
</script>

<style scoped>
#load {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;  
    z-index: 200;
    background-color: indigo
}

span {
    position: absolute;
    right: 45%;
    top: 45%;
    line-height: 1;
    text-align: center;
    color: rgb(255, 255, 255);
    font-size: 300%;
    font-family: 'papyrus';
    z-index: 1;
}

.by{
    font-size: 100%;
    text-align: end;
    color: rgb(255, 196, 0);
}
</style>