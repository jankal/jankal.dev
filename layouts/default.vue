<template>
  <div class="dark:bg-purple-900">
    <navbar />
    <div class="w-full max-w-8xl mx-auto">
      <div class="lg:flex">
        <div
          class="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible"
        >
          <Nuxt />
        </div>
      </div>
    </div>
    <page-footer />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Navbar from '~/components/Navbar/Navbar.vue';
import PageFooter from '~/components/PageFooter/PageFooter.vue';

export default Vue.extend({
  components: { Navbar, PageFooter }
});
</script>
