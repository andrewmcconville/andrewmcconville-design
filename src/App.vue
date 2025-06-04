<script setup lang="ts">
  import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    Site
  </header>

  <aside>
    <nav>
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/universal-design-q-tip-grip/">Q-Tip Grip Universal Design</RouterLink></li>
        <li><RouterLink to="/oven-interface/">Oven Interface Appliance HMI</RouterLink></li>
        <li><RouterLink to="/stack-overflow-user-research/">Stack Overflow User Research</RouterLink></li>
        <li><RouterLink to="/ux-engineering/">AccuLynx UX Engineering</RouterLink></li>
      </ul>
    </nav>
  </aside>

  <main>
    <router-view />
  </main>
  
  <footer>
    <nav>
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/universal-design-q-tip-grip/">Q-Tip Grip Universal Design</RouterLink></li>
        <li><RouterLink to="/oven-interface/">Oven Interface Appliance HMI</RouterLink></li>
        <li><RouterLink to="/stack-overflow-user-research/">Stack Overflow User Research</RouterLink></li>
        <li><RouterLink to="/ux-engineering/">AccuLynx UX Engineering</RouterLink></li>
      </ul>
    </nav>
  </footer>
</template>

<style scoped>
</style>
