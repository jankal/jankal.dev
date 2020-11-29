<template>
  <div
    class="bg-white dark:bg-gray-900 max-w-8xl lg:z-50 dark:border-gray-800 sticky top-0 z-40 w-full mx-auto items-center border-b border-gray-200 mb-4"
  >
    <div
      class="w-auto text-center flex justify-center items-center text-uppercase"
    >
      <nav-list class="hidden md:block">
        <nav-list-item :to="localePath({ name: 'index' })">Home</nav-list-item>
        <nav-list-item :to="localePath({ name: 'index' })">Home</nav-list-item>
        <nav-list-item :to="localePath({ name: 'index' })">Home</nav-list-item>
      </nav-list>
      <branding />
      <nav-list class="hidden md:block">
        <nav-list-item :to="localePath({ name: 'index' })">Home</nav-list-item>
        <nav-list-item :to="localePath({ name: 'index' })">Home</nav-list-item>
        <nav-list-item :to="localePath({ name: 'index' })">Home</nav-list-item>
      </nav-list>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NavList from '~/components/Navbar/NavList.vue';
import NavListItem from '~/components/Navbar/NavListItem.vue';
import Branding from '~/components/Navbar/Branding.vue';

export default Vue.extend({
  components: { Branding, NavList, NavListItem }
});
</script>
