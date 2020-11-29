<template>
  <div>
    <h1>Blog Posts</h1>
    <ul>
      <li v-for="article of articles" :key="article.slug">
        <nuxt-link
          :to="
            localePath({ name: 'blog-slug', params: { slug: article.slug } })
          "
        >
          <div>
            <h2>{{ article.title }}</h2>
            <p>{{ article.description }}</p>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/types';

export default Vue.extend({
  async asyncData({ $content }: Context) {
    const articles = await $content('articles')
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'asc')
      .fetch();

    return {
      articles
    };
  }
});
</script>
