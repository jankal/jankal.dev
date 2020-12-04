<template>
  <div class="border rounded">
    <nuxt-link
      :to="localePath({ name: 'blog-slug', params: { slug: article.slug } })"
    >
      <div class="flex items-center">
        <div class="flex-initial">
          <div class="rounded m-3 h-40 w-40">
            <blog-img
              img-class="h-full w-full object-cover rounded shadow-inner"
              v-if="article.image"
              :src="article.image"
            />
          </div>
        </div>
        <div class="flex-grow text-left ml-3">
          <h2 class="font-medium text-2xl mb-2.5">{{ article.title }}</h2>
          <p class="leading-relaxed">{{ article.description }}</p>
        </div>
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
