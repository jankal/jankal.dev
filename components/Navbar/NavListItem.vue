<template>
  <li class="block mx-4">
    <span>
      <template v-if="to">
        <nuxt-link :to="to">
          <slot />
        </nuxt-link>
      </template>
      <slot v-else />
    </span>
  </li>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'NavListItem',
  props: {
    to: {
      type: [Object, String],
      required: false,
      default: () => null
    }
  }
});
</script>
