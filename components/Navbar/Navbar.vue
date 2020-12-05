<template>
  <div
    class="bg-white dark:bg-gray-900 max-w-8xl lg:z-50 dark:border-gray-800 sticky top-0 z-40 w-full mx-auto items-center border-b border-gray-200 mb-4 h-20"
  >
    <div class="flex w-auto justify-center h-full">
      <div class="flex justify-between items-center w-full mx-4 h-full">
        <branding />
        <nav-list>
          <nav-list-item :to="localePath({ name: 'blog' })">
            Blog
          </nav-list-item>
          <nav-list-item
            :to="localePath({ name: 'slug', params: { slug: 'about' } })"
          >
            About
          </nav-list-item>
          <nav-list-item
            :to="localePath({ name: 'slug', params: { slug: 'contact' } })"
          >
            Contact
          </nav-list-item>
        </nav-list>
      </div>
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
