<template>
  <span>{{ output }}</span>
</template>

<script lang="ts">
import Vue from 'vue';
import formatDistance from 'date-fns/formatDistance';

export default Vue.extend({
  props: {
    date: {
      type: [Date, String],
      required: true
    }
  },
  computed: {
    output() {
      let date: string | Date = this.date as string | Date;
      if (typeof date === 'string') {
        date = new Date(date);
      }
      return formatDistance(date, new Date());
    }
  }
});
</script>
