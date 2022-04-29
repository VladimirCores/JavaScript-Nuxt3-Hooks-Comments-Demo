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
      default: 80
    }
  },
  computed: {
    cssSize() {
      return `${this.size}px`
    },
    cssSizeHalfNegative() {
      return `-${this.size / 2}px`
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
  margin-top: v-bind(cssSizeHalfNegative);
  margin-left: v-bind(cssSizeHalfNegative);
}

.icon-spinner::before, .icon-spinner::after {
  width: v-bind(cssSize);
  height: v-bind(cssSize);
}
</style>
