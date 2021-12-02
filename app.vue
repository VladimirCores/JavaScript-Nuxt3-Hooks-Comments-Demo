<template>
  <div class="container w-full">
    <ClientOnly>
      <Preloader v-if="pending" :size="20"/>
      <div v-else-if="!user.getUser().id">
        You have to be logged in to see the page
      </div>
      <NuxtPage v-else/>
    </ClientOnly>
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
const client = process.client;
const pending = useState('pending', () => true);
if (process.client) {
  user.fetchUser(1).finally(() =>
      pending.value = false);
}
// const { pending } = user.fetchUser(1);
console.log('> App -> setup: pending =', pending.value);
</script>
