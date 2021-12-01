<template>
  <input id="user-info-modal" :checked="visible" class="modal-toggle" type="checkbox">
  <div class="modal">
    <div class="modal-box">
      <div class="mb-4 text-center">
        <b>{{ user.name }}</b>
      </div>
      <table class="table w-full table-compact">
        <tbody>
        <tr v-for="item in [
              ['Email:', user.email],
              ['Phone:', user.phone],
              ['City:', user.address?.city || '-'],
              ['Street:', user.address?.street || '-'],
              ['Web:', user.website],
              ['Company:', user.company?.name || '-'],
            ]">
          <td><b>{{ item[0] }}</b></td>
          <td>{{ item[1] }}</td>
        </tr>
        </tbody>
      </table>
      <div class="modal-action">
        <button class="btn" @click="$emit('close', false)">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostUserInfoModal',
  emits: {
    close: payload => !payload, // validate
  },
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: false
    },
    user: {
      type: Object,
      required: true,
    },
  }
}
</script>
