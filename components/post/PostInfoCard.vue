<template>
  <div class="card shadow">
    <div class="card-body flex-col">
      <div class="flex-row">
        <button class="btn btn-link btn-sm btn-circle hover:text-white" @click="$emit('back')">
          <i class="icon-chevron-left-o" />
        </button>
      </div>
      <h2 class="card-title">
        {{ title }}
      </h2>
      <p>{{ message }}</p>
      <div class="flex justify-between card-actions">
        <b v-if="author" class="self-start gray-300 mt-4">
          <small class="mr-2 text-gray-500">Author: <span class="text-black">{{ author }}</span></small>
          <button class="btn btn-xs btn-outline drawer-button hover:text-white" @click="$emit('info')">show info</button>
        </b>
        <div class="flex flex-col">
          <button
            :class="{ 'loading': loading }"
            :disabled="loaded"
            class="btn btn-warning btn-md hover:text-white"
            @click="$emit('load')"
          >
            Load comments
          </button>
          <button
            class="btn-xs mt-2"
            :class="{'text-gray-400': !auto}"
            @click="onLoadAutoClicked"
          >
            Load comments automatically ({{ auto ? 'enabled' : 'disabled' }})
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'PostInfoCard',
  props: {
    author: {
      type: String,
      required: false,
      default: null,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    auto: {
      type: Boolean,
      required: false,
    },
    loading: {
      type: Boolean,
      required: false,
    },
    loaded: {
      type: Boolean,
      required: false,
    },
  },
  emits: {
    back: null,
    load: null,
    info: null,
    auto: null,
  },
  methods: {
    onLoadAutoClicked() { this.$emit('auto', !this.auto); },
  },
});
</script>
