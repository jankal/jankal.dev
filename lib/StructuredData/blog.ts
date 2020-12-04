import { Blog } from 'schema-dts';
import BlogArticle from '~/lib/BlogArticle';
import { webPage } from '~/lib/StructuredData/webPage';
import { blogPosting } from '~/lib/StructuredData/blogPosting';

export function blog(articles: BlogArticle[]): Blog {
  const url = 'https://jankal.dev/blog';
  return {
    '@id': 'https://jankal.dev/blog#blog',
    '@type': 'Blog',
    url,
    headline: 'jankal.dev Blog',
    mainEntityOfPage: { '@id': webPage(url)['@id'] as string },
    blogPost: articles.map((a) => blogPosting(a))
  };
}
