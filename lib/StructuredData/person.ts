import { Person } from 'schema-dts';

export const person: Person & { '@id': string } = {
  '@id': 'https://jankal.dev/#person',
  '@type': 'Person',
  name: 'Alexander Jank'
};
