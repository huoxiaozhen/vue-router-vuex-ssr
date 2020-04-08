<template>
	<div id="app">
		<div id="cover"></div>
    <Header></Header>
    <p>{{fullName}} --- {{count}}</p>
    <router-link to='/app'>app</router-link>
    <router-link to="/login">login</router-link>
    <!-- <todo></todo> -->
    <router-view/>
    <Footer></Footer>
	</div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.vue'
import Todo from './views/todo/todo.vue'
export default {
  components: {
    Header,
    Footer,
    Todo
  },
  data () {
    return {

    }
  },
  mounted () {
    this.updateCountAsync({
      num: 5,
      time: 2000
    })
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['fullName'])
  },
  methods: {
    ...mapMutations(['updateCount']),
    ...mapActions(['updateCountAsync'])
  }
}
</script>
<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity .9
  z-index -1
}
</style>
