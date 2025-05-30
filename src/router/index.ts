import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Home from '../components/Home.vue';
import QTipGripUniversalDesign from '../components/QTipGripUniversalDesign.vue';
import OvenInterfaceApplianceHMI from '../components/OvenInterfaceApplianceHMI.vue';
import StackOverflowUserResearch from '../components/StackOverflowUserResearch.vue';
import AccuLynxUXEngineering from '../components/AccuLynxUXEngineering.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home },
  { path: '/andrewmcconville-design/work/universal-design-q-tip-grip', name: 'QTipGripUniversalDesign', component: QTipGripUniversalDesign },
  { path: '/andrewmcconville-design/work/oven-interface', name: 'OvenInterfaceApplianceHMI', component: OvenInterfaceApplianceHMI },
  { path: '/andrewmcconville-design/work/stack-overflow-user-research', name: 'StackOverflowUserResearch', component: StackOverflowUserResearch },
  { path: '/andrewmcconville-design/work/ux-engineering', name: 'AccuLynxUXEngineering', component: AccuLynxUXEngineering },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;