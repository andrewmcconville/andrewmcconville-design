import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Home from '../components/Home.vue';
import QTipGripUniversalDesign from '../components/QTipGripUniversalDesign.vue';
import OvenInterfaceApplianceHMI from '../components/OvenInterfaceApplianceHMI.vue';
import StackOverflowUserResearch from '../components/StackOverflowUserResearch.vue';
import AccuLynxUXEngineering from '../components/AccuLynxUXEngineering.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Andrew McConville Design',
    },
  },
  {
    path: '/universal-design-q-tip-grip',
    name: 'QTipGripUniversalDesign',
    component: QTipGripUniversalDesign,
  },
  {
    path: '/oven-interface',
    name: 'OvenInterfaceApplianceHMI',
    component: OvenInterfaceApplianceHMI,
    meta: {
      title: 'Oven Interface Appliance HMI',
    },
  },
  {
    path: '/stack-overflow-user-research',
    name: 'StackOverflowUserResearch',
    component: StackOverflowUserResearch,
  },
  {
    path: '/ux-engineering',
    name: 'AccuLynxUXEngineering',
    component: AccuLynxUXEngineering,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;