import Router from 'vue-router'
import routes from './routers'

export default () => {
  return new Router({
    routes,
    mode: 'history',
    // base: '/base/'
    // linkActiveClass: 'router-link-active',
    // linkExactActiveClass: 'router-link-exact-active'
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
    // parseQuery () {

    // },
    // stringifyQuery () {

    // }
  })
}
