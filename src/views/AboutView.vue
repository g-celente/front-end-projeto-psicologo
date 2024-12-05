<script>
import BaseNavbar from '@/components/navbar/BaseNavbar.vue';
import BaseSidebar from '@/components/sidebar/BaseSidebar.vue';

export default {
  components: {
    BaseSidebar,
    BaseNavbar
  },
};
</script>

<template>
  <BaseNavbar/>
  <BaseSidebar/>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
