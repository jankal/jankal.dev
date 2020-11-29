<template>
  <article class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
    <nuxt-content :document="article" />
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/types';

export default Vue.extend({
  async asyncData({ $content, params }: Context) {
    const article = await $content('articles', params.slug).fetch();

    return { article };
  }
});
</script>
