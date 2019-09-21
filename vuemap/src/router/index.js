import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Map from '@/components/Map'
import Annotation from '@/components/Annotation'
import Iot from '@/components/Iot'
import ColdChain from '@/components/ColdChain'

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
    },
    {
      path: '/iot',
      name: 'Iot',
      component: Iot
    },
    {
      path: '/coldChain',
      name: 'ColdChain',
      component: ColdChain
    }
  ]
})
