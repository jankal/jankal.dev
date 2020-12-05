<template>
  <div class="md:mb-20 md:last:mb-0">
    <component :is="linkComponent" v-bind="linkProps">
      <div
        class="rounded flex flex-col md:flex-row bg-gray-200 dark:bg-gray-800 p-6"
      >
        <div class="w-full md:w-72">
          <fa :icon="icon" class="text-9xl text-gray-600 dark:text-gray-200" />
        </div>
        <div class="link-box-content flex-grow md:text-left">
          <slot />
        </div>
        <div
          class="relative right-0 hidden md:block md:w-64 align-middle h-full"
        >
          <fa
            :icon="faArrowRight"
            transform="grow-150"
            class="text-gray-300 h-full"
          />
        </div>
      </div>
    </component>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { RawLocation } from 'vue-router';

@Component({})
export default class LinkBox extends Vue {
  @Prop({
    type: [Array, Object, String],
    required: false,
    default: () => null
  })
  readonly to!: null | RawLocation;

  @Prop({
    type: [String],
    required: false,
    default: () => null
  })
  readonly href!: null | string;

  @Prop({
    type: [Object, String, Array],
    required: true
  })
  readonly icon!: IconDefinition | string | string[];

  faArrowRight: IconDefinition = faArrowRight;

  get isOrdinaryLink() {
    return this.href && this.href.substr(0, 4) === 'http';
  }

  get linkComponent() {
    if (this.isOrdinaryLink) {
      return 'a';
    }

    return 'nuxt-link';
  }

  get linkProps() {
    if (this.isOrdinaryLink) {
      return {
        href: this.href,
        target: '_blank'
      };
    }

    return {
      to: this.to
    };
  }
}
</script>

<style>
.link-box-content h2 {
  @apply text-3xl font-bold text-gray-900;
}
.link-box-content .prose {
  @apply mt-4;
}
.dark .link-box-content h2 {
  @apply text-gray-100;
}
</style>
