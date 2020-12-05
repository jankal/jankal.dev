<template>
  <container>
    <h1 class="font-bold leading-loose text-4xl mb-4">Blog Posts</h1>
    <div class="flex justify-center">
      <blog-post-list class="flex-1" :articles="articles" />
    </div>
  </container>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { Context } from '@nuxt/types';
import { MetaInfo } from 'vue-meta';
import { BreadcrumbList } from 'schema-dts';
import Container from '~/components/Container.vue';
import BlogPostList from '~/components/Blog/BlogPostList.vue';
import { webPage } from '~/lib/StructuredData/webPage';
import { person } from '~/lib/StructuredData/person';
import BlogArticle from '~/lib/BlogArticle';
import { blog } from '~/lib/StructuredData/blog';
import { makeHead } from '~/lib/meta/makeHead';
import { makeMetadata } from '~/lib/meta/makeMetadata';
import { makeTitle } from '~/lib/meta/makeTitle';

@Component({
  components: { Container, BlogPostList },
  async asyncData({ $content }: Context) {
    const articles = await $content('articles')
      .sortBy('createdAt', 'asc')
      .fetch();

    return {
      articles
    };
  }
})
export default class BlogIndex extends Vue {
  articles!: BlogArticle[];

  head(): MetaInfo {
    const title = makeTitle('Blog');
    const url = process.env.baseUrl + '/blog';

    const description =
      "Alexander Jank's Blog: Sharing knowledge about Vue.js and TypeScript.";

    const webPageData = webPage(url, title);

    const blogData = blog(this.articles);

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
            '@id': process.env.baseUrl + '/blog/',
            name: 'Blog'
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
      structuredData: [
        person,
        webPageData,
        blogData,
        breadcrumbs,
        ...this.articles.map((a) =>
          webPage(process.env.baseUrl + '/blog/' + a.slug, makeTitle(a.title))
        )
      ]
    });
  }
}
</script>
