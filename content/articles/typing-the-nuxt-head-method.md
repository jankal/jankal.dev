---
title: Typing the Nuxt head() method
description:
  Using the head() method in a typed context can be problematic.
  It gets even more interesting when using component properties inject trough asyncData() or fetch().
  In this post, I will show you, how to safely refactor and make everything type-safe.
image: nuxt-head-type.png
---

# Typing the Nuxt head() method

Using the `head()` method in a typed context can be problematic when working with `fetch()` or `asyncData()` hooks to retrieve data.

Let's see the following component:
```html
<script lang="ts">
import Vue from 'vue';
import { MetaInfo } from 'vue-meta';

export default Vue.extend({
  async asyncData() {
    // usually you would fetch data here
    const title = 'Blog';
    
    return {
      title
    };
  },
  head(): MetaInfo {
    return {
      title: this.title // <<--- Property 'title' does not exist on type 'CombinedVueInstance<Vue, unknown, unknown, unknown, Readonly<Record<never, any>>>'.
    }
  }
});
</script>
```

As you see, TypeScript doesn't know about `this.title`.

My first approach was converting the component to a class-based component using `vue-property-decorator` like this.

```html
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { MetaInfo } from 'vue-meta';

@Component({
  async asyncData() {
    // usually you would fetch data here
    const title = 'Blog';

    return {
      title
    };
  }
})
export default class PageComponent extends Vue {
  title!: string;
  
  head(): MetaInfo {
    return {
      title: this.title
    }
  }
}
</script>
```

After this transformation, the type-error is gone, because I told TypeScript about the property via declaring it inside the class.  
You would expect this to work..., but it doesn't. Nuxt does not call the `head()` method anymore, so no metadata is added.

So I had to look further.

Fortunately `nuxt-property-decorator` has us covered. Just replacing `vue-property-decorator` with `nuxt-property-decorator` will do the trick.

So this is my final component:
```html
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { MetaInfo } from 'vue-meta';

@Component({
  async asyncData() {
    // usually you would fetch data here
    const title = 'Blog';

    return {
      title
    };
  }
})
export default class PageComponent extends Vue {
  title!: string;
  
  head(): MetaInfo {
    return {
      title: this.title
    }
  }
}
</script>
```

Cheers 🥳
