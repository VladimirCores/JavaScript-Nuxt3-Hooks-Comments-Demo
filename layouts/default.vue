<template>
  <div class="container mx-auto">
    <div class="header mt-2">
      <slot name="header"/>
    </div>
    <div class="body mt-4">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'default'
}
</script>
