<template>
  <Preloader v-if="pending" color="red"/>
  <NuxtLayout v-else name="default">
    <template #header>
      <Breadcrumbs current="Home"/>
      <CommentsPageStatistics
          :index="getCurrentPageIndex()"
          :total="getPagesAmount()"
          @selected="onPaginationSelected"
      />
    </template>
    <div class="flex flex-col">
      <CommentsPageTable
          :comments="getPageComments()"
      />
    </div>
    <div class="w-full mt-8">
      <Pagination
          :delta="5"
          :index="pageIndex"
          :total="getPagesAmount()"
          @selected="onPaginationSelected"
      />
    </div>
  </NuxtLayout>
</template>

<script>
import Breadcrumbs from '/components/common/Breadcrumbs';
import Preloader from '/components/common/Preloader';
import Pagination from '/components/common/Pagination';
import CommentsPageStatistics from '/components/comments/CommentsPageStatistics';
import CommentsPageTable from '/components/comments/CommentsPageTable';

export default {
  name: 'CommentsPage',
  layout: false,
  components: {
    Breadcrumbs,
    CommentsPageStatistics,
    CommentsPageTable,
    Pagination,
    Preloader
  },
  methods: {
    onPaginationSelected(index) {
      this.pageIndex = index;
      this.settings.selectedPageIndex = index;
    }
  }
}
</script>

<script setup>
const LocalState = {
  PAGE_INDEX: 'pageIndex',
}

const ITEMS_PER_PAGE = 10;

const settings = useSettings();
const comments = useComments();
const { pending } = comments.fetchComments();

console.log('> Comments -> setup: pending =', pending.value);

const pageIndex = useState(LocalState.PAGE_INDEX, () => settings.value.selectedPageIndex);
const getPageComments = () => comments.getPage(pageIndex.value, ITEMS_PER_PAGE);
const getPagesAmount = () => Math.ceil(comments.getTotalAmount() / ITEMS_PER_PAGE);
const getLastPageIndex = () => getPagesAmount() - 1;
const getCurrentPageIndex = () => pageIndex.value + 1;

</script>
