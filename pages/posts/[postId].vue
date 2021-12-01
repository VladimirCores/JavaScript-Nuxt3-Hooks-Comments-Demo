<template>
  <Preloader v-if="pending" color="red"/>
  <NuxtLayout v-else name="default">
    <template #header>
      <Breadcrumbs :current="`Post #${postId}`" :links="breadcrumbs"/>
      <PostInfoCard
          :author="vo.user.name"
          :auto="settings.isAutoLoadComments"
          :loaded="vo.comments.length > 0"
          :loading="isLoadingComments"
          :message="vo.post.body"
          :title="vo.post.title"
          @auto="onAutoTrigger"
          @back="onBackNavigate"
          @info="isInfoModalVisible = true"
          @load="onLoadComments"
      />
    </template>
    <PostCommentsTable
        :comments="vo.comments"
        :selected-comment-id="getSelectedCommentId"
        class="mt-4"
    />
    <Preloader v-if="isLoadingComments"/>
    <PostUserInfoModal
        :user="vo.user"
        :visible="isInfoModalVisible"
        @close="isInfoModalVisible = false"
    />
  </NuxtLayout>
</template>

<script>
import Breadcrumbs from '/components/common/Breadcrumbs';
import Preloader from '/components/common/Preloader';
import PostInfoCard from '/components/post/PostInfoCard';
import PostCommentsTable from '/components/post/PostCommentsTable';
import PostUserInfoModal from '/components/post/PostUserInfoModal';

export default {
  name: 'PostPage',
  layout: false,
  components: {
    Breadcrumbs,
    Preloader,
    PostCommentsTable,
    PostInfoCard,
    PostUserInfoModal,
  },
  computed: {
    getSelectedCommentId() {
      console.log('> this.$route.query.commentId', this.$route.query.commentId);
      return this.$route.query.commentId || -1
    }
  },
  data: () => ({
    breadcrumbs: [{ to: '/', title: 'Home' }],
    isInfoModalVisible: false,
    isLoadingComments: false
  }),
  methods: {
    onAutoTrigger(value) {
      console.log('> Post Id -> onAutoTrigger', { value });
      if (value && !this.vo.comments.length) {
        this.onLoadComments();
      }
      this.settings.isAutoLoadComments = value;
    },
    onLoadComments() {
      console.log('> Post Id -> onLoadComments');
      this.isLoadingComments = true;
      this.post.fetchComments(this.postId)
          .then(() => this.isLoadingComments = false);
    },
    onBackNavigate() {
      console.log('> Post Id -> onBackNavigate');
      this.$router.back();
    }
  }
}
</script>
<script setup>
const post = usePost();
const route = useRoute();
const settings = useSettings();
const { postId } = route.params;
console.log('> Post Id -> setup', { postId, isAutoLoadComments: settings.value.isAutoLoadComments });
const { pending, data: vo } = post.fetchPost(postId);
if (settings.value.isAutoLoadComments && !vo.comments?.length)
  post.fetchComments(postId);
</script>
