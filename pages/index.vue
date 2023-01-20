<template>
  <Preloader v-if="pending" color="red" />
  <NuxtLayout v-else name="default">
    <template #header>
      <Breadcrumbs current="Home" />
      <CommentsPageStatistics
        :index="getCurrentPageIndex()"
        :total="getPagesAmount"
        @selected="onPaginationSelected"
      />
    </template>
    <div class="flex-row">
      <CommentsPageTable :comments="getPageComments()" />
    </div>
    <div class="flex flex-row mt-8 justify-center">
      <Pagination
        :delta="5"
        :index="pageIndex"
        :total="getPagesAmount"
        @selected="onPaginationSelected"
      />
    </div>
  </NuxtLayout>
</template>

<script lang="ts">

</script>

<script setup lang="ts">
import Breadcrumbs from '~/components/common/Breadcrumbs.vue';
import Preloader from '~/components/common/Preloader.vue';
import Pagination from '~/components/common/Pagination.vue';
import CommentsPageStatistics from '~/components/comments/CommentsPageStatistics.vue';
import CommentsPageTable from '~/components/comments/CommentsPageTable.vue';

import { useComments, useSettings } from '~/composables/states';

const ITEMS_PER_PAGE = 10;

const settings = useSettings();
const comments = useComments();

const pending = useState('pending', () => true);

console.log('> Comments -> setup: pending =', pending.value);

const pageIndex = useState('pageIndex', () => settings.value.selectedPageIndex);
const getPageComments = () => comments.getPage(pageIndex.value, ITEMS_PER_PAGE);
const getPagesAmount = computed(() => Math.ceil(comments.getTotalAmount() / ITEMS_PER_PAGE));
const getCurrentPageIndex = () => pageIndex.value + 1;

const onPaginationSelected = (index: number) => {
  pageIndex.value = index;
  settings.value.selectedPageIndex = index;
};

onMounted(() => {
  comments.fetchComments().finally(() => {
    console.log('> Comments -> onMounted: pending =', pending.value);
    pending.value = false;
  });
});
</script>
