<template>
  <article
    class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto dark:prose-dark"
  >
    <nuxt-content :document="page" />
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/types';

export default Vue.extend({
  async asyncData({ $content, params }: Context) {
    const page = await $content('pages', params.slug).fetch();

    return { page };
  }
});
</script>
