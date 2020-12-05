<template>
  <article
    class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto dark:prose-dark"
  >
    <nuxt-content :document="page" />
  </article>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { Context } from '@nuxt/types';
import { MetaInfo } from 'vue-meta';
import { BreadcrumbList } from 'schema-dts';
import { makeTitle } from '~/lib/meta/makeTitle';
import { webPage } from '~/lib/StructuredData/webPage';
import { makeHead } from '~/lib/meta/makeHead';
import { makeMetadata } from '~/lib/meta/makeMetadata';
import { person } from '~/lib/StructuredData/person';

@Component({
  async asyncData({ $content, params }: Context) {
    const page = await $content('pages', params.slug).fetch();

    return { page };
  }
})
export default class PageSlug extends Vue {
  page!: {
    slug: string;
    title: string;
    description: string;
    createdAt: string;
  };

  head(): MetaInfo {
    const title = makeTitle(this.page.title);
    const url = process.env.baseUrl + '/' + this.page.slug;

    const description = this.page.description;

    const webPageData = webPage(url, title);

    const breadcrumbs: BreadcrumbList = {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@id': process.env.baseUrl as string,
            name: 'Home'
          }
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@id': process.env.baseUrl + '/' + this.page.slug + '/',
            name: this.page.title
          }
        }
      ]
    };

    return makeHead({
      title,
      meta: makeMetadata({
        description,
        title,
        url
      }),
      structuredData: [person, webPageData, breadcrumbs]
    });
  }
}
</script>
