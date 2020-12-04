<template>
  <div class="border rounded">
    <nuxt-link
      :to="localePath({ name: 'blog-slug', params: { slug: article.slug } })"
    >
      <div>
        <blog-img v-if="article.image" :src="article.image" />
        <h2>{{ article.title }}</h2>
        <p>{{ article.description }}</p>
      </div>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    article: {
      type: Object,
      required: true
    }
  }
});
</script>
