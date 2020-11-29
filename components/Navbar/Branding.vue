<template>
  <div class="flex branding">
    <nuxt-link :to="localePath({ name: 'index' })">
      <logo class="py-3 fill-current" />
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Logo from '~/assets/img/logo.svg?inline';

export default Vue.extend({
  components: { Logo }
});
</script>

<style scoped>
.branding svg {
  width: 70vw;
  @screen sm {
    width: 28rem;
  }
}
</style>
