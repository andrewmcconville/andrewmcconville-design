<script setup lang="ts">
  import { RouterLink } from 'vue-router'
</script>

<template>
    <div>
    <ul>
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/andrewmcconville-design/work/universal-design-q-tip-grip">Q-Tip Grip Universal Design</RouterLink></li>
      <li><RouterLink to="/andrewmcconville-design/work/oven-interface">Oven Interface Appliance HMI</RouterLink></li>
      <li><RouterLink to="/andrewmcconville-design/work/stack-overflow-user-research">Stack Overflow User Research</RouterLink></li>
      <li><RouterLink to="/andrewmcconville-design/work/ux-engineering">AccuLynx UX Engineering</RouterLink></li>
    </ul>
  </div>
  <div>
    <router-view />
  </div>
</template>

<style scoped>
</style>
