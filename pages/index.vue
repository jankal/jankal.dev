<template>
  <container>
    <span>jankal</span>
  </container>
</template>

<script lang="ts">
import Vue from 'vue';
import Container from '~/components/Container.vue';
import { makeHead } from '~/lib/meta/makeHead';
import { makeTitle } from '~/lib/meta/makeTitle';
import { webPage } from '~/lib/StructuredData/webPage';
import { person } from '~/lib/StructuredData/person';
import { makeMetadata } from '~/lib/meta/makeMetadata';

export default Vue.extend({
  components: { Container },
  head() {
    const url = 'https://jankal.me/';
    const title = makeTitle('Home');
    const webPageData = webPage(url, title);

    return makeHead({
      title,
      structuredData: [person, webPageData],
      meta: makeMetadata({
        title,
        description: 'jankal.dev website',
        url
      })
    });
  }
});
</script>
