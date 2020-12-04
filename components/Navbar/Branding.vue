<template>
  <div class="flex branding text-uppercase">
    <nuxt-link :to="localePath({ name: 'index' })">
      <logo class="logo py-3 fill-current hidden sm:block" />
      <logo-sm class="logo-sm py-3 h-auto fill-current sm:hidden" />
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Logo from '~/assets/img/logo.svg?inline';
import LogoSm from '~/assets/img/logo-sm.svg?inline';

export default Vue.extend({
  components: { Logo, LogoSm }
});
</script>

<style scoped>
.branding svg.logo {
  width: 30vw;
  @screen sm {
    width: 24rem;
  }
}
.branding svg.logo-sm {
  width: 3rem;
}
</style>
