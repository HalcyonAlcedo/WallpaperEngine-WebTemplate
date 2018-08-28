<template>
  <div class="parts">
      <div id="particles-js"></div>
  </div>
</template>

<script>


export default {
  name: 'parts',
  mounted (){
    if(this.seasoncurrent!=null)
    particlesJS("particles-js",require('@/assets/particles-'+this.seasoncurrent+'.json'))
  },
  computed: {
    seasoncurrent (){
      return this.$store.getters.doneseasoncurrent
    }
  },
  watch: {
    seasoncurrent(val) {
      particlesJS("particles-js",require('@/assets/particles-'+val+'.json'))
    }
  }
}
</script>

<style scoped>
#particles-js {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
}
</style>