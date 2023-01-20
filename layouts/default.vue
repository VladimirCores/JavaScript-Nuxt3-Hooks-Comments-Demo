<template>
  <div class="container mx-auto">
    <div class="header mt-2">
      <slot name="header" />
    </div>
    <div class="body mt-4">
      <div class="flex flex-col w-full">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Default',
};
</script>
