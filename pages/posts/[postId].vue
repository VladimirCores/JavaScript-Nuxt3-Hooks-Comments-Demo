<template>
  <Preloader v-if="isPageLoading" color="red" />
  <NuxtLayout v-else name="default">
    <template #header>
      <Breadcrumbs :current="`Post #${postId}`" :links="breadcrumbs" />
      <PostInfoCard
        :author="state.user.name"
        :auto="isAutoLoadComments"
        :loaded="state.comments.length > 0"
        :loading="isLoadingComments"
        :message="state.post.body"
        :title="state.post.title"
        @auto="onAutoTrigger"
        @back="onBackNavigate"
        @info="isInfoModalVisible = true"
        @load="onLoadComments"
      />
    </template>
    <PostCommentsTable
      :comments="state.comments"
      :selected-comment-id="selectedCommentId"
      class="mt-4"
    />
    <Preloader v-if="isLoadingComments" />
    <PostUserInfoModal
      :user="state.user"
      :visible="isInfoModalVisible"
      @close="isInfoModalVisible = false"
    />
  </NuxtLayout>
</template>

<script lang="ts">
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import Preloader from '@/components/common/Preloader.vue';
</script>

<script setup lang="ts">
import { onMounted } from '#imports';

import PostVO from '~/model/vo/PostVO';

const post = usePost();
const route = useRoute();
const settings = useSettings();
const pending = useState('pending', () => true);

const postId: String = route.params.postId as String ?? '';

const state = computed<PostVO>(() => post?.getPost(postId));
const selectedCommentId = computed<Number>(() => parseInt(route.query?.commentId?.toString() || '-1'));

const isAutoLoadComments = ref<Boolean>(settings.value.isAutoLoadComments);
const isPageLoading = computed(() => pending.value || !state.value.user?.id || !state.value.post?.id);
const isInfoModalVisible = ref<Boolean>(false);
const isLoadingComments = ref<Boolean>(false);

const breadcrumbs = [{ to: '/', title: 'Home' }];

console.log('> Post Id -> setup', { postId, isAutoLoadComments: isAutoLoadComments.value, selectedCommentId: selectedCommentId.value });

const onAutoTrigger = (value: Boolean) => {
  console.log('> Post Id -> onAutoTrigger', { value });
  if (value && !state.value.comments.length) {
    onLoadComments();
  }
  isAutoLoadComments.value = value;
  settings.value.isAutoLoadComments = value;
};
const onLoadComments = () => {
  console.log('> Post Id -> onLoadComments');
  isLoadingComments.value = true;
  post.fetchComments(postId).finally(() => {
    isLoadingComments.value = false;
  });
};
const onBackNavigate = () => {
  console.log('> Post Id -> onBackNavigate');
  useRouter().back();
};

onMounted(() => {
  post.fetchPost(postId).then((postVO: PostVO) => {
    console.log('> Post Id -> postVO:', postVO);
    const hasNoComments = post.hasNoComments(postId);
    if (isAutoLoadComments.value && hasNoComments) {
      onLoadComments();
    }
  }).finally(() => pending.value = false);
});
</script>
