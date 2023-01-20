<template>
  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                v-for="item in ['№', 'Name', 'Message']"
                :key="item"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                scope="col"
              >
                {{ item }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="(comment, index) in comments"
              :key="comment.id"
              :class="{ 'bg-gray-100': checkSelectedComment(comment)}"
            >
              <td class="px-6 py-4">
                {{ index + 1 }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ comment.name }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                {{ comment.body }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CommentVO from '~/model/vo/CommentVO';

export default defineComponent({
  name: 'PostCommentsTable',
  props: {
    comments: {
      type: Array,
      required: true,
    },
    selectedCommentId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    checkSelectedComment(comment: CommentVO): boolean {
      const result = this.selectedCommentId === comment.id;
      // console.log('> PostCommentsTable -> checkSelectedComment:', this.selectedCommentId, comment.id, result);
      return result;
    },
  },
});
</script>

<style scoped>

</style>
