<template>
  <li class="app-explorer__column" :style="styles">
    <h3 class="app-explorer__column-head">{{ data.label }}</h3>
    <ul class="app-explorer__column-items">
      <app-explorer-item
        v-for="item in data.items"
        :class="{ 'app-explorer__item--selectedPath': item === data.selected,
          'app-explorer__item--quick': data.quick }"
        :key="`${item.type}-${item.id}`"
        :datum="item"
        :path="data.path"
        @itemClick="clickHandler"
        @heavyClick="redirect" />
      <li v-if="data.items && !data.items.length"
        class="app-explorer__item app-explorer__item--empty">{{ data.empty }}</li>
    </ul>
  </li>
</template>

<script>
import AppExplorerItem from './AppExplorerItem';

export default {
  name: 'app-explorer-column',
  components: {
    AppExplorerItem,
  },
  props: {
    data: Object,
  },
  computed: {
    selected() {
      return this.$store.getters.getSelected;
    },
    styles() {
      return {
        width: this.data.width || '100%',
        opacity: this.data.opacity,
      };
    },
  },
  methods: {
    clickHandler(item) {
      if (this.data.quick || item === this.selected) {
        this.redirect(item);
      } else {
        this.$store.commit('setSelected', item);
      }
    },
    redirect(item) {
      this.$store.commit('setSelected', item);
      this.$emit('navigation');
      this.$store.commit('startLoad');
      setTimeout(() => {
        this.$store.commit('endLoad');
        this.$store.commit('setCurrent', item);
        this.$router.push({ path: `/${item.type}/${item.id}` });
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
.app-explorer__column {
  flex-grow: 0;
  display: flex;
  flex-flow: column nowrap;
  transition: width .25s ease, opacity .375s ease;
  &-head {
    font-size: .875rem;
    padding: 1rem;
  }
  &-items {
    overflow: auto;
    &::-webkit-scrollbar {
      width: .5rem;
      background-color: #ccc;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #888;
    }
  }
  & + .app-explorer__column {
    border-left: 1px solid #ccc;
  }
}
</style>
