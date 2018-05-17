<template>
  <input
    type="search"
    class="app-explorer-search"
    placeholder="Search workspaces, projects, campaigns..."
    :style="{backgroundImage: `url(${searchIcon})`}"
    @input="inputHandler" />
</template>

<script>
import SearchIcon from './../assets/icons/search.svg';

export default {
  name: 'app-explorer-search',
  computed: {
    searchIcon() {
      return SearchIcon;
    },
  },
  methods: {
    inputHandler() {
      this.$emit('userInput', this.$el.value);
    },
  },
};
</script>

<style lang="scss">
.app-explorer-search {
  flex: 1;
  border: 0;
  display: block;
  padding: 0 1rem 0 3rem;
  font-size: 1rem;
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: 0.25rem center;
  &:focus {
    outline: none;
    background-color: #fff;
  }
  &::placeholder {
    font-style: italic;
  }
}
</style>
