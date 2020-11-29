<template>
  <button class="toggle-dark-mode" @click="toggleMode">
    <fa v-if="$colorMode.value === 'light'" :icon="faSun" />
    <fa v-if="$colorMode.value === 'dark'" :icon="faMoon" />
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons';

export default Vue.extend({
  name: 'ToggleDarkMode',
  data() {
    return {
      faSun,
      faMoon
    };
  },
  computed: {
    isLight() {
      return this.$colorMode.value === 'light';
    },
    isDark() {
      return this.$colorMode.value === 'dark';
    }
  },
  methods: {
    toggleMode() {
      if (this.$colorMode.value === 'light') {
        this.$colorMode.preference = 'dark';
      }

      if (this.$colorMode.value === 'dark') {
        this.$colorMode.preference = 'light';
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.toggle-dark-mode {
  @apply rounded-md transition ease-in-out duration-150;
  &:focus {
    @apply outline-none;
  }
  &:hover {
    @apply text-gray-500;
  }
}
</style>
