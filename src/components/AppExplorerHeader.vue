<template>
  <ul class="app-explorer__header app-tabs">
    <li v-for="t in tabs" :key="t.key"
      :title="t.title"
      :class="t.classes"
      @click="switchTab(t.key)">
      <component :is="t.component" :data="t.payload" @userInput="searchHandler" />
    </li>
  </ul>
</template>

<script>
import AppExplorerSearch from './AppExplorerSearch';
import AppExplorerSvg from './AppExplorerSvg';

export default {
  name: 'app-explorer-header',
  components: {
    AppExplorerSearch,
    AppExplorerSvg,
  },
  props: {
    tab: String,
  },
  computed: {
    tabs() {
      return [
        {
          key: 'search',
          title: 'Search',
          classes: {
            'app-tabs__tab': true,
            'app-tabs__tab--search': true,
            'app-tabs__tab--active': this.tab === 'search',
          },
          component: 'app-explorer-search',
        },
        {
          key: 'browse',
          title: 'Browse',
          classes: {
            'app-tabs__tab': true,
            'app-tabs__tab--browse': true,
            'app-tabs__tab--active': this.tab === 'browse',
          },
          component: 'app-explorer-svg',
          payload: '<img inline-svg src="./../assets/icons/browse.svg" />',
        },
        {
          key: 'recent',
          title: 'Recent places',
          classes: {
            'app-tabs__tab': true,
            'app-tabs__tab--recent': true,
            'app-tabs__tab--active': this.tab === 'recent',
          },
          component: 'app-explorer-svg',
          payload: '<img inline-svg src="./../assets/icons/history.svg" />',
        },
      ];
    },
  },
  methods: {
    switchTab(tab) {
      this.$emit('selectTab', tab);
    },
    searchHandler(str) {
      this.$store.commit('setSearchText', str);
    },
  },
};
</script>

<style lang="scss">
.app-explorer__header {
  display: flex;
  align-items: stretch;
  box-sizing: content-box;
}
.app-tabs__tab {
  height: 2.75rem;
  width: 2.5rem;
  white-space: nowrap;
  overflow: hidden;
  border-bottom: .25rem solid transparent;
  display: flex;
  align-items: stretch;
  cursor: pointer;
  svg {
    width: 2.5rem;
    height: 2.5rem;
  }
  &:hover {
    background-color: #eee;
  }
  &--search {
    flex: 1;
  }
  &--active {
    border-color: #9c3;
  }
}
</style>
