import { WebPage } from 'schema-dts';
import { person } from '~/lib/StructuredData/person';

export function webPage(url: string, name?: string): WebPage {
  return {
    '@id': url + '#page',
    '@type': 'WebPage',
    name,
    author: {
      '@id': person['@id'] as string
    },
    url
  };
}
