<template>
  <input
    id="user-info-modal"
    :checked="visible"
    class="modal-toggle"
    type="checkbox"
  >
  <div class="modal">
    <div class="modal-box">
      <div class="mb-4 text-center">
        <b>{{ user.name }}</b>
      </div>
      <table class="table w-full table-compact">
        <tbody>
          <tr
            v-for="item in [
              ['Email:', user.email],
              ['Phone:', user.phone],
              ['City:', user.address?.city || '-'],
              ['Street:', user.address?.street || '-'],
              ['Web:', user.website],
              ['Company:', user.company?.name || '-'],
            ]"
            :key="item[0]"
          >
            <td><b>{{ item[0] }}</b></td>
            <td>{{ item[1] }}</td>
          </tr>
        </tbody>
      </table>
      <div class="modal-action">
        <button class="btn" @click="$emit('close', false)">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'PostUserInfoModal',
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: false,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  emits: {
    close: (payload: any) => !payload, // validate
  },
});
</script>
