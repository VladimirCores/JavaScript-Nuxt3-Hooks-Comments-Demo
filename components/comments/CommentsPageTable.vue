<template>
  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
          <tr>
            <th v-for="item in ['Id', 'Email', 'Name']"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                scope="col">
              {{ item }}
            </th>
            <th class="relative px-6 py-3" scope="col">
              <span class="sr-only">Read</span>
            </th>
          </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="comment in comments" :key="comment.id">
            <td class="px-6 py-4 whitespace-nowrap">
              {{ comment.id }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ comment.email }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ comment.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <NuxtLink :to="`/posts/${comment.postId}?commentId=${comment.id}`"
                        class="text-accent hover:text-secondary">
                <i class="icon-chevron-right-o"></i>
              </NuxtLink>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentsPageTable',
  props: {
    comments: {
      type: Array,
      required: true
    },
  },
}
</script>

<style scoped>

</style>
