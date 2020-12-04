import { $content } from '@nuxt/content';
import { Feed } from 'feed';
import { IContentDocument } from '@nuxt/content/types/content';
import { NuxtConfig } from '@nuxt/types';

function arrayify<T>(dataOrArray: T[] | T) {
  if (!Array.isArray(dataOrArray)) {
    return [dataOrArray];
  }

  return dataOrArray;
}

async function staticRoutes() {
  const articles = arrayify(await $content('articles').fetch()).map(
    ({ slug }: { slug: string }) => 'blog/' + slug
  );
  const pages = arrayify(await $content('pages').fetch()).map(
    ({ slug }: { slug: string }) => slug
  );

  return articles.concat(pages);
}

function makeFeed(link: string) {
  return async function (feed: Feed) {
    feed.options = {
      id: 'https://jankal.dev/',
      copyright: 'All rights reserved 2020, Alexander Jank',
      title: 'jankal.dev',
      link: 'https://jankal.dev' + link,
      description:
        'Interesting technology articles for software developers working in web development.'
    };

    const articles = arrayify(
      await $content('articles').sortBy('createdAt', 'asc').fetch()
    );

    for (const article of articles) {
      const url = 'https://jankal.dev/blog/' + article.slug;
      const feedItem = {
        title: article.title,
        id: url,
        link: url,
        date: new Date(article.createdAt),
        description: article.description,
        content: article.bodyPlainText
      };

      feed.addItem(feedItem);
    }

    feed.addContributor({
      name: 'Alexander Jank',
      email: 'alex@zeraton.de',
      link: 'https://zeraton.de/'
    });
  };
}

const config: NuxtConfig = {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'jankal-me',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  env: {
    siteTitle: 'jankal-me',
    baseUrl: 'https://jankal.dev'
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://github.com/nuxt-community/color-mode-module
    '@nuxtjs/color-mode',
    // https://github.com/nuxt-community/fontawesome-module
    '@nuxtjs/fontawesome',
    // https://github.com/nuxt-community/google-fonts-module
    '@nuxtjs/google-fonts',
    // https://github.com/juliomrqz/nuxt-optimized-images
    '@aceforth/nuxt-optimized-images',
    // https://github.com/nuxt-community/svg-module
    '@nuxtjs/svg'
  ],

  optimizedImages: {
    optimizeImages: true,
    handleImages: ['jpeg', 'png', 'webp', 'gif'],
    optimizeImagesInDev: true
  },

  colorMode: {
    classSuffix: ''
  },

  googleFonts: {
    download: true,
    families: {
      Roboto: true,
      Raleway: true
    }
  },

  fontawesome: {
    component: 'fa'
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://i18n.nuxtjs.org/
    'nuxt-i18n',
    // https://github.com/nuxt-community/sitemap-module
    '@nuxtjs/sitemap',
    // https://github.com/nuxt-community/feed-module
    '@nuxtjs/feed'
  ],

  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: require('./i18n')
    }
  },

  purgeCSS: {
    whitelist: ['dark-mode']
  },

  feed: [
    {
      path: '/feed.xml',
      create: makeFeed('/feed.xml'),
      cacheTime: 1000 * 60 * 15,
      type: 'rss2'
    },
    {
      path: '/feed.json',
      create: makeFeed('/feed.json'),
      cacheTime: 1000 * 60 * 15,
      type: 'json1'
    }
  ],

  hooks: {
    'content:file:beforeInsert': (document: IContentDocument) => {
      if (document.extension === '.md') {
        document.bodyPlainText = document.text;
      }
    }
  },

  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://jankal.dev',
    cacheTime: 1000 * 60 * 30,
    gzip: true,
    routes: staticRoutes
  },

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
};

export default config;
