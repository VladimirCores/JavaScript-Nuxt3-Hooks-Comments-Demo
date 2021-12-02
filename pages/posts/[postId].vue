<template>
  <Preloader v-if="pending" color="red"/>
  <NuxtLayout v-else name="default">
    <template #header>
      <Breadcrumbs :current="`Post #${postId}`" :links="breadcrumbs"/>
      <PostInfoCard
          :author="state.user.name"
          :auto="settings.isAutoLoadComments"
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
        :selected-comment-id="getSelectedCommentId"
        class="mt-4"
    />
    <Preloader v-if="isLoadingComments"/>
    <PostUserInfoModal
        :user="state.user"
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
      return parseInt(this.$route.query.commentId || -1)
    },
    state() {
      return this.post.getPost(this.postId);
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
      if (value && !this.state.comments.length) {
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
const pending = useState('pending', () => true);
if (process.client) {
  console.log('> Post Id -> setup', { postId, isAutoLoadComments: settings.value.isAutoLoadComments });
  post.fetchPost(postId).finally(() => pending.value = false);
  if (settings.value.isAutoLoadComments && !post.getPost(postId).comments?.length)
    post.fetchComments(postId);
}
// const { pending, data: vo } = post.fetchPost(postId);
</script>
