<script setup>
import BaseNavbar from './navbar/BaseNavbar.vue';
import BaseSidebar from './sidebar/BaseSidebar.vue';
</script>

<template>
  <div class="page-background">
    <BaseNavbar class="navbar" />

    <main :class="`main `">
      <div class="base-padding">
        <div class="background">
          <router-view class="view" />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.page-background {
  display: flex;
  position: relative;
}

.base-padding {
  flex: 1;
}

.header {
  position: sticky;
  top: 0;
  right: 0;
}

@media (min-width: 630px) {

  .main {
    margin: 0;
  }

  .page {
    margin: 0;
  }

}

.main {
  transition: all ease-in-out 0.4s;
  display: flex;
  flex-direction: column;
  margin-left: 240px;
  width: 100%;
  height: 100vh;
  margin-top: 10px;
}
.page {
  margin-left: 200px;
}

.navbar {
    z-index: 100;
}

.background {
  background-color: #D2AC67;
  border-radius: 10px;
  height: 100%;
}
@media (min-width: 0px) and (max-width: 840px) {
  .main {
    margin-left: 0px;
  }
}
</style>