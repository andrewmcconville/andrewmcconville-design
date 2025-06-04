import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import OvenInterfaceApplianceHMI from './components/OvenInterfaceApplianceHMI.vue';
import QTipGripUniversalDesign from './components/QTipGripUniversalDesign.vue';
import StackOverflowUserResearch from './components/StackOverflowUserResearch.vue';
import AccuLynxUXEngineering from './components/AccuLynxUXEngineering.vue';

// Map URL path prefixes to root components
const pathComponentMap: Record<string, any> = {
  '/oven-interface/': OvenInterfaceApplianceHMI,
  '/universal-design-q-tip-grip/': QTipGripUniversalDesign,
  '/stack-overflow-user-research/': StackOverflowUserResearch,
  '/ux-engineering/': AccuLynxUXEngineering,
};

const pathname = window.location.pathname;
const matched = Object.entries(pathComponentMap).find(([prefix]) =>
  pathname.startsWith(prefix)
);
const RootComponent = matched ? matched[1] : App;

const app = createApp(RootComponent);
app.use(router);

router.isReady().then(() => {
  // Normalize route for each section
  if (matched) {
    const base = matched[0];
    if ((pathname.endsWith(base) || pathname.endsWith(base + 'index.html')) && !window.location.hash) {
      router.replace({ path: base.replace(/\/$/, '') });
    }
  } else if ((pathname === '/andrewmcconville-design/' || pathname.endsWith('/index.html')) && !window.location.hash) {
    router.replace({ path: '/' });
  }
  app.mount('#app');
});
