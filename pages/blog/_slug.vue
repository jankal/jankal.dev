<template>
  <article
    class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto dark:prose-dark"
  >
    <nuxt-content :document="article" />
  </article>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { Context } from '@nuxt/types';
import { MetaInfo } from 'vue-meta';
import { BreadcrumbList } from 'schema-dts';
import BlogArticle from '~/lib/BlogArticle';
import { person } from '~/lib/StructuredData/person';
import { webPage } from '~/lib/StructuredData/webPage';
import { blogPosting } from '~/lib/StructuredData/blogPosting';
import { makeMetadata } from '~/lib/meta/makeMetadata';
import { MetaDefinition } from '~/lib/meta/MetaDefinition';
import { makeHead } from '~/lib/meta/makeHead';
import { makeTitle } from '~/lib/meta/makeTitle';
import { MetaData } from '~/lib/meta/MetaData';

@Component({
  async asyncData({ $content, params }: Context) {
    const article = await $content('articles', params.slug).fetch();

    return { article };
  }
})
export default class BlogSlug extends Vue {
  article!: BlogArticle;

  head(): MetaInfo {
    const title = makeTitle(this.article.title);

    const metaDefinition: MetaDefinition = {
      url: 'https://zeraton.de/blog/' + this.article.slug,
      title
    };

    if (typeof this.article.description !== 'undefined') {
      metaDefinition.description = this.article.description;
    }
    if (this.article.image) {
      metaDefinition.image =
        process.env.baseUrl +
        require('~/assets/img/blog/' + this.article.image + '?original&url');
    }

    const webPageData = webPage(
      process.env.baseUrl + '/blog/' + this.article.slug,
      title
    );

    const blogPostingData = blogPosting(this.article);

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
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@id': process.env.baseUrl + '/blog/' + this.article.slug,
            name: this.article.title
          }
        }
      ]
    };

    const keywordMeta: MetaData = [];
    if (this.article.tags) {
      keywordMeta.push({
        name: 'keywords',
        content: this.article.tags.join(', ')
      });
      for (const tag in this.article.tags) {
        keywordMeta.push({
          name: 'og:article:tag',
          content: tag
        });
      }
    }

    return makeHead({
      title,
      meta: makeMetadata(metaDefinition)
        .concat(keywordMeta)
        .concat([
          {
            hid: 'og:type',
            property: 'og:type',
            content: 'article'
          },
          {
            property: 'og:article:author:first_name',
            content: 'Alexander'
          },
          {
            property: 'og:article:author:last_name',
            content: 'Jank'
          },
          {
            property: 'og:article:author:gender',
            content: 'male'
          },
          {
            property: 'og:article:published_time',
            content: this.article.createdAt
          },
          {
            property: 'og:article:modified_time',
            content: this.article.updatedAt
          },
          {
            property: 'og:image',
            content:
              process.env.baseUrl +
              require('~/assets/img/blog/' +
                this.article.image +
                '?original&url')
          }
        ]),
      structuredData: [person, webPageData, blogPostingData, breadcrumbs]
    });
  }
}
</script>
