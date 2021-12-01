<template>
  <div class="card shadow">
    <div class="card-body">
      <h2 class="card-title">{{ title }}</h2>
      <p>{{ message }}</p>
      <b v-if="author" class="self-end gray-300 mt-4">
        <small class="mr-2">Author:</small>
        <button class="btn btn-sm btn-link btn-outline drawer-button" @click="$emit('info')">{{ author }}</button>
      </b>
      <div class="justify-between card-actions">
        <button class="btn glass" @click="$emit('back')">
          <i class="icon-chevron-left-o mr-2"></i>Back
        </button>
        <button
            :class="{ 'loading': loading }"
            :disabled="loaded"
            class="btn btn-link"
            @click="$emit('load')">
          Load comments
        </button>
        <div class="form-control float-right">
          <label class="cursor-pointer label">
            <span class="label-text mr-3 text-sm text-gray-400">Load automatically</span>
            <input :checked="auto" class="toggle" type="checkbox" @change="$emit('auto', $event.target.checked)">
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostInfoCard',
  emits: {
    back: null,
    load: null,
    info: null,
    auto: value => value,
  },
  props: {
    author: {
      type: String,
      required: false,
      default: null
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
      default: false,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    loaded: {
      type: Boolean,
      required: false,
      default: false,
    },
  }
}
</script>
