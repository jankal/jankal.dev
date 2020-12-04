import { BlogPosting } from 'schema-dts';
import BlogArticle from '~/lib/BlogArticle';
import { person } from '~/lib/StructuredData/person';
import { webPage } from '~/lib/StructuredData/webPage';

export function blogPosting(article: BlogArticle): BlogPosting {
  const url = 'https://jankal.dev/blog/' + article.slug;
  const data: BlogPosting = {
    '@type': 'BlogPosting',
    headline: article.title,
    name: article.title,
    editor: {
      '@id': person['@id'] as string
    },
    keywords: article.tags,
    datePublished: article.createdAt,
    dateModified: article.updatedAt,
    url,
    author: {
      '@id': person['@id'] as string
    },
    mainEntityOfPage: {
      '@id': webPage(url, article.title + ' | ' + process.env.siteTitle)[
        '@id'
      ] as string
    },
    publisher: {
      '@id': person['@id'] as string
    }
  };

  if (article.image) {
    data.image = process.env.baseUrl + require('~/assets/img/blog/' +
      article.image +
      '?original&url');
  }

  return data;
}
