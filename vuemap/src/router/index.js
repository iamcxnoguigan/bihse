import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Map from '@/components/Map'
import Annotation from '@/components/Annotation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/map',
      name: 'Map',
      component: Map
    },
    {
      path: '/annotation',
      name: 'Annotation',
      component: Annotation
    }
  ]
})
