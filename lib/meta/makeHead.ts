import { MetaData } from '~/lib/meta/MetaData';

export function makeHead({
  title,
  meta,
  structuredData
}: {
  title?: string;
  meta: MetaData;
  structuredData: object[];
}) {
  const scripts = [];
  for (const data of structuredData) {
    scripts.push({
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': ['http://schema.org'],
        ...data
      })
    });
  }

  return {
    title,
    __dangerouslyDisableSanitizers: ['script'],
    meta,
    script: scripts
  };
}
