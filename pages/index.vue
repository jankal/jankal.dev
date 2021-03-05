<template>
  <container>
    <headline class="mb-7" />
    <link-box :icon="faNewspaper" :to="localePath({ name: 'blog' })">
      <h2>{{ $t('Blog') }}</h2>
      <div class="prose dark:prose-dark">
        <p>
          {{
            $t(
              'This is, where I write about my journey. Mainly I write about TypeScript and Vue.js.'
            )
          }}
        </p>
      </div>
    </link-box>
    <link-box :icon="faBuilding" href="https://zeraton.de" rel="noopener">
      <h2>{{ $t('Company') }}</h2>
      <div class="prose dark:prose-dark">
        <p>
          {{
            $t(
              "I'm proud to be the founder of the boutique web agency Zeraton based in western Munich."
            )
          }}<br />
          {{
            $t(
              'Founded in 2017, we provide development services for small and big projects.'
            )
          }}
        </p>
      </div>
    </link-box>
    <link-box
      :icon="faEnvelope"
      :to="localePath({ name: 'slug', params: { slug: 'contact' } })"
    >
      <h2>{{ $t('Contact') }}</h2>
      <div class="prose dark:prose-dark">
        <p>
          {{ $t('Want to drop me a message? - Here you go!') }}
        </p>
      </div>
    </link-box>
  </container>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  faNewspaper,
  faBuilding,
  faEnvelope
} from '@fortawesome/free-regular-svg-icons';
import Container from '~/components/Container.vue';
import Headline from '~/components/Home/Headline.vue';
import LinkBox from '~/components/Home/LinkBox.vue';
import { makeHead } from '~/lib/meta/makeHead';
import { makeTitle } from '~/lib/meta/makeTitle';
import { webPage } from '~/lib/StructuredData/webPage';
import { person } from '~/lib/StructuredData/person';
import { makeMetadata } from '~/lib/meta/makeMetadata';

export default Vue.extend({
  components: { Container, Headline, LinkBox },
  data() {
    return {
      faNewspaper,
      faBuilding,
      faEnvelope
    };
  },
  head() {
    const url = 'https://jankal.me/';
    const title = makeTitle('Home');
    const webPageData = webPage(url, title);

    return makeHead({
      title,
      structuredData: [person, webPageData],
      meta: makeMetadata({
        title,
        description:
          'Alexander Jank is a web developer working with Vue.js and TypeScript. He is the founder of Munich based software development agency Zeraton.',
        url
      })
    });
  }
});
</script>
