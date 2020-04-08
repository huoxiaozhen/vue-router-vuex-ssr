<template>
  <div>login
    <div :class="[isActive ? activeClass : '', errorClass]">1363335646</div>
    <span>{{$route.params.id}}</span>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isActive: true,
      activeClass: 'active',
      errorClass: 'text-danger'
    }
  }
}
</script>
<style scoped>
.active{
  color: red;
}
</style>
