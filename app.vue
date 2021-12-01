<template>
  <div class="container w-full">
    <Preloader v-if="pending" :size="100"/>
    <div v-else-if="!user.getUser().id">
      You have to be logged in to see the page
    </div>
    <NuxtPage v-else/>
  </div>
</template>
<script>
import Preloader from '/components/common/Preloader';

export default {
  components: {
    Preloader
  }
}
</script>
<script setup>
const user = useUser();
const { pending } = user.fetchUser(1);
console.log('> App -> setup: pending =', pending.value);
</script>
