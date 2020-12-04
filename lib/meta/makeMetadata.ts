import { MetaDefinition } from '~/lib/meta/MetaDefinition';
import { MetaData } from '~/lib/meta/MetaData';

export function makeMetadata(definition: MetaDefinition): MetaData {
  let meta: MetaData = [
    {
      property: 'og:title',
      content: definition.title
    },
    {
      property: 'twitter:title',
      content: definition.title
    },
    {
      property: 'og:url',
      content: definition.url
    }
  ];

  if (definition.description) {
    meta = meta.concat([
      {
        hid: 'description',
        name: 'description',
        content: definition.description
      },
      {
        property: 'og:description',
        content: definition.description
      },
      {
        property: 'twitter:description',
        content: definition.description
      }
    ]);
  }

  if (definition.image) {
    meta = meta.concat([
      {
        property: 'og:image',
        content: definition.image
      },
      {
        property: 'twitter:image',
        content: definition.image
      }
    ]);
  }

  return meta;
}
