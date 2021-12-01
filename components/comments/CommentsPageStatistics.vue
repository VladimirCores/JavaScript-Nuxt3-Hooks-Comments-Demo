<template>
  <div class="w-full border stats border-base-300">
    <div class="stat">
      <div class="stat-figure text-primary">
        <i class="icon-align-bottom"></i>
      </div>
      <div class="stat-title">Comments table</div>
      <div class="stat-value">Page {{ index }} from {{ total }}</div>
      <div class="stat-desc">
        <progress :max="total" :value="index" class="progress progress-accent"></progress>
      </div>
      <div class="w-full mt-3">
        <div class="btn-group justify-center">
          <button :disabled="index === 1" class="btn no-animation btn-outline" @click="onNextPrevClicked(index - 2)">
            Previous Page
          </button>
          <button :disabled="index === total" class="btn no-animation btn-outline" @click="onNextPrevClicked(index)">
            Next Page
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

const Events = {
  SELECTED: 'selected',
}

export default {
  name: 'CommentsPageStatistics',
  props: {
    index: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
  },
  methods: {
    onNextPrevClicked(index) {
      console.log('> CommentsPageStatistics -> onNextPrevClicked', { index });
      this.$emit(Events.SELECTED, index);
    },
  }
}
</script>

<style scoped>

</style>
