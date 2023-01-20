<template>
  <div class="container w-full">
    <Preloader v-if="pending" :size="20" />
    <div v-else-if="!user?.id">
      You have to be logged in to see the page
    </div>
    <div v-else class="flex flex-col">
      <div class="flex flex-row justify-between bg-gray-200 py-2 px-4 rounded-b-lg border-gray-300 border-1">
        <div class="flex-col">
          <span class="text-xl">Comments list</span>
        </div>
        <div class="flex-col">
          <small>User: <b>{{ user.name }}</b></small>
        </div>
      </div>
      <NuxtPage />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from '#imports';

import State from '~/constants/State';

import Preloader from '~/components/common/Preloader.vue';
import UserVO from '~/model/vo/UserVO';

const user = useState<UserVO>(State.USER);
watch(user, (value) => {
  console.log('User update', value, user.value);
});

const pending = useState('pending', () => true);
console.log('> App -> setup: pending =', pending.value);
onMounted(() => {
  useUser().fetchUser(1)
    .finally(() => {
      pending.value = false;
    });
});
</script>
