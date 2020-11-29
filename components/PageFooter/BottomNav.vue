<template>
  <div class="flex text-center mx-auto">
    <ul class="bottom-nav list-none">
      <li v-for="link in links" :key="link.slug">
        <span>
          <nuxt-link
            :to="localePath({ name: 'slug', params: { slug: link.slug } })"
            v-text="link.title"
          />
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BottomNav',
  data() {
    return {
      links: [
        {
          title: this.$t('Imprint'),
          slug: 'imprint'
        },
        {
          title: this.$t('Privacy'),
          slug: 'privacy'
        }
      ]
    };
  }
});
</script>

<style scoped>
ul.bottom-nav li {
  @apply inline px-2;
}
</style>
