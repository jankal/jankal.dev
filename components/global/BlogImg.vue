<template>
  <picture>
    <source
      :srcSet="require('~/assets/img/blog/' + src + '?webp')"
      type="image/webp"
    />
    <source :srcSet="require('~/assets/img/blog/' + src)" type="image/jpeg" />
    <img :src="require('~/assets/img/blog/' + src)" />
  </picture>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BlogImg',
  props: {
    src: {
      type: String,
      required: true
    }
  }
});
</script>
