<template>
  <footer
    class="md:h-16 h-auto relative w-full border-t border-b dark:border-gray-800 bg-white dark:bg-gray-900 z-20"
  >
    <div
      class="h-full w-full container mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between"
    >
      <toggle-dark-mode class="order-last md:order-none my-2" />
      <bottom-nav class="my-2" />
      <span class="my-2">&copy; {{ yearOutput }} Alexander Jank</span>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import ToggleDarkMode from '~/components/PageFooter/ToggleDarkMode.vue';
import BottomNav from '~/components/PageFooter/BottomNav.vue';

@Component({
  name: 'PageFooter',
  components: { ToggleDarkMode, BottomNav }
})
export default class PageFooter extends Vue {
  get currentYear() {
    return new Date().getFullYear();
  }

  get yearOutput() {
    if (this.currentYear === 2020) {
      return 2020;
    }

    return `2020 - ${this.currentYear}`;
  }
}
</script>
