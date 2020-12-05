<template>
  <div
    class="rounded w-full md:h-72 h-40 bg-gray-100 dark:bg-gray-700 text-center flex flex-col justify-between"
  >
    <div>
      <fa
        :icon="icon"
        class="mt-14"
        :class="{
          'text-green-600': success,
          'text-red-600': !success
        }"
        transform="grow-30"
      />
    </div>
    <div class="flex-grow flex flex-col justify-center">
      <div>
        <span v-text="message" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import {
  faCheckCircle,
  faTimesCircle
} from '@fortawesome/free-regular-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

@Component({
  name: 'ResultMessage'
})
export default class ResultMessage extends Vue {
  faCheckCircle: IconDefinition = faCheckCircle;
  faTimesCircle: IconDefinition = faTimesCircle;

  @Prop({
    type: Boolean,
    required: false,
    default: () => false
  })
  readonly success!: boolean;

  get message() {
    if (this.success) {
      return this.$t('Your message was sent out successfully!');
    }

    return this.$t('An error occurred while trying to send the message!');
  }

  get icon() {
    if (this.success) {
      return this.faCheckCircle;
    }

    return this.faTimesCircle;
  }
}
</script>
