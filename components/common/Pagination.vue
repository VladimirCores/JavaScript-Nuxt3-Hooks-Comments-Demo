<template>
  <div class="btn-group justify-center">
    <button
      v-if="index > 0"
      class="btn no-animation btn-xs btn-outline hover:text-white"
      @click="onSelectedClicked(index - 1)"
    >
      «
    </button>
    <template v-if="index > 0">
      <button
        v-for="i in getPageBeforeCurrent"
        :key="i"
        class="btn no-animation btn-xs btn-outline hover:text-white"
        @click="onSelectedClicked(i - 1)"
      >
        {{ i }}
      </button>
    </template>
    <button class="btn no-animation btn-xs btn-disabled bg-accent hover:bg-accent hover:text-white">
      {{ getCurrentPageIndex }}
    </button>
    <template v-if="getCurrentPageIndex < total">
      <button
        v-for="i in getPageAfterCurrent"
        :key="i"
        class="btn no-animation btn-xs btn-outline hover:text-white"
        @click="onSelectedClicked(i - 1)"
      >
        {{ i }}
      </button>
    </template>
    <button
      v-if="getCurrentPageIndex < total"
      class="btn btn-xs btn-outline hover:text-white"
      @click="onSelectedClicked(index + 1)"
    >
      »
    </button>
  </div>
</template>

<script lang="ts">
import { range } from '~/utils/arrayUtils';

const Events = {
  SELECTED: 'selected',
};

export default defineComponent({
  name: 'Pagination',
  props: {
    index: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    delta: {
      type: Number,
      required: true,
    },
  },
  computed: {
    getCurrentPageIndex() {
      return this.index + 1;
    },
    getPageBeforeCurrent() {
      return this.index > this.delta
        ? range(this.delta, this.getCurrentPageIndex - this.delta)
        : range(this.index, 1);
    },
    getPageAfterCurrent() {
      return this.index < (this.total - this.delta)
        ? range(this.delta, this.getCurrentPageIndex + 1)
        : range(this.total - this.getCurrentPageIndex, this.getCurrentPageIndex + 1);
    },
  },
  methods: {
    onSelectedClicked(index: number) {
      console.log('> Pagination -> onSelectedClicked', { index });
      this.$emit(Events.SELECTED, index);
    },
  },
});
</script>
