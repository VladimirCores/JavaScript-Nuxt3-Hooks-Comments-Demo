<template>
  <div class="spinner">
    <i :style="{ color: color }" class="icon-spinner"/>
  </div>
</template>

<script>
export default {
  name: 'Preloader',
  props: {
    color: {
      type: String,
      required: false,
      default: '#000'
    },
    size: {
      type: Number,
      required: false,
      default: 40
    }
  },
  computed: {
    cssSize() {
      return `${this.size}px`
    }
  }
}
</script>

<style scoped>
.spinner {
  content: '';
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
}

.icon-spinner::before, .icon-spinner::after {
  width: v-bind(cssSize);
  height: v-bind(cssSize);
}
</style>
