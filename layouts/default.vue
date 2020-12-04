<template>
  <div>
    <navbar />
    <div class="w-full max-w-8xl mx-auto">
      <div class="lg:flex">
        <div
          class="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible px-4 md:px-0"
        >
          <Nuxt />
        </div>
      </div>
    </div>
    <page-footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { MetaInfo } from 'vue-meta';
import Navbar from '~/components/Navbar/Navbar.vue';
import PageFooter from '~/components/PageFooter/PageFooter.vue';

export default Vue.extend({
  components: { Navbar, PageFooter },
  head(): MetaInfo {
    const localeMap = {
      de: 'de_DE',
      en: 'en_US'
    };

    return {
      meta: [
        {
          property: 'og:locale',
          content: localeMap[this.$i18n.locale as keyof typeof localeMap]
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          property: 'twitter:site',
          content: '@alexander_jank'
        },
        {
          property: 'twitter:creator',
          content: '@alexander_jank'
        }
      ],
      htmlAttrs: {
        lang: this.$i18n.locale
      }
    };
  }
});
</script>
