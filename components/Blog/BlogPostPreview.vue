<template>
  <div
    class="rounded shadow-lg dark:shadow-lg-white mb-9 border dark:border-gray-700 border-gray-200"
  >
    <nuxt-link
      :to="localePath({ name: 'blog-slug', params: { slug: article.slug } })"
    >
      <div class="flex md:flex-row flex-col">
        <div class="flex-initial flex justify-center md:block">
          <div class="rounded m-3 h-40 w-full md:w-40">
            <blog-img
              v-if="article.image"
              img-class="h-full w-full object-cover rounded shadow-inner"
              :alt="`Image describing  '${article.title}'`"
              :src="article.image"
            />
          </div>
        </div>
        <div class="flex flex-grow text-left ml-3 items-center p-4">
          <div>
            <h2 class="font-medium text-2xl mb-2.5">{{ article.title }}</h2>
            <p class="leading-relaxed">{{ article.description }}</p>
          </div>
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
