<template>
  <div class="text-sm breadcrumbs">
    <ul>
      <li v-for="link in links" :key="link.to">
        <NuxtLink :to="link.to">
          {{ link.title }}
        </NuxtLink>
      </li>
      <li>{{ current }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Breadcrumbs',
  props: {
    links: {
      type: Array,
      required: false,
      default: null,
    },
    current: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>

</style>
