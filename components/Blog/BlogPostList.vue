<template>
  <ul class="list-none">
    <li v-for="article of articles" :key="article.slug">
      <blog-post-preview :article="article" />
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import BlogPostPreview from '~/components/Blog/BlogPostPreview.vue';

export default Vue.extend({
  components: { BlogPostPreview },
  props: {
    articles: {
      type: Array,
      required: true
    }
  }
});
</script>
