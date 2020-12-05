<template>
  <div class="mb-5">
    <form v-if="state === submitState.Fresh" @submit.prevent="sendForm">
      <div class="grid grid-cols-1 gap-6">
        <label class="block">
          <span class="form-label"> Full name </span>
          <input v-model="name" class="form-control" type="text" />
        </label>
        <label class="block">
          <span class="form-label"> Email </span>
          <input v-model="email" class="form-control" type="email" />
        </label>
        <label class="block">
          <span class="form-label"> Message </span>
          <textarea v-model="message" class="form-control" />
        </label>
        <div>
          <input class="form-submit" type="submit" :value="$t('Submit')" />
        </div>
      </div>
    </form>
    <result-message v-if="state === submitState.Sent" success />
    <result-message v-if="state === submitState.Error" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ResultMessage from '~/components/ContactForm/ResultMessage.vue';

enum SubmitState {
  Fresh,
  Sent,
  Error
}

@Component({
  name: 'ContactForm',
  components: { ResultMessage }
})
export default class ContactForm extends Vue {
  name: string = '';
  email: string = '';
  message: string = '';
  state: SubmitState = SubmitState.Fresh;
  submitState: typeof SubmitState = SubmitState;

  async sendForm() {
    const url =
      'https://prod.zeraton.zbackends.de/api/forms/submit/JankAlDevContact';
    try {
      await this.$axios.$post(
        url,
        {
          form: {
            name: this.name,
            email: this.email,
            message: this.message
          }
        },
        {
          params: {
            token: 'cd8ea881d9f661305020ffcc83b532'
          }
        }
      );
      this.state = SubmitState.Sent;
    } catch (e) {
      this.state = SubmitState.Error;
    }
  }
}
</script>

<style scoped>
.form-label {
  @apply text-gray-700;
}
.dark .form-label {
  @apply text-gray-300;
}
.form-control {
  @apply mt-1 block w-full rounded-md bg-gray-100 border-transparent;
}
.dark .form-control {
  @apply bg-gray-700;
}
.form-control:focus {
  @apply border-gray-300 bg-gray-50 ring-0;
}
.dark .form-control:focus {
  @apply border-gray-500 bg-gray-400;
}
textarea.form-control {
  @apply h-64;
}
.form-submit {
  @apply cursor-pointer mt-1 py-1.5 px-2 rounded-md bg-gray-100 border-transparent;
}
.dark .form-submit {
  @apply bg-gray-700;
}
.form-submit:focus {
  @apply border-gray-500 bg-white ring-0;
}
</style>
