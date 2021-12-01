<template>
  <div class="btn-group justify-center">
    <button v-if="index > 0" class="btn no-animation btn-xs btn-outline" @click="onSelectedClicked(index - 1)">«
    </button>
    <button v-for="i in getPageBeforeCurrent" v-if="index > 0" class="btn no-animation btn-xs btn-outline"
            @click="onSelectedClicked(i - 1)">{{ i }}
    </button>
    <button class="btn no-animation btn-xs btn-disabled bg-accent hover:bg-accent">{{ getCurrentPageIndex }}</button>
    <button v-for="i in getPageAfterCurrent" v-if="getCurrentPageIndex < total"
            class="btn no-animation btn-xs btn-outline" @click="onSelectedClicked(i - 1)">{{ i }}
    </button>
    <button v-if="getCurrentPageIndex < total" class="btn btn-xs btn-outline" @click="onSelectedClicked(index + 1)">»
    </button>
  </div>
</template>

<script>
import { range } from '~/utils/arrayUtils';

const Events = {
  SELECTED: 'selected',
}

export default {
  name: 'Pagination',
  props: {
    index: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    delta: {
      type: Number,
      required: true
    }
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
    }
  },
  methods: {
    onSelectedClicked(index) {
      console.log('> Pagination -> onSelectedClicked', { index });
      this.$emit(Events.SELECTED, index);
    },
  }
}
</script>
