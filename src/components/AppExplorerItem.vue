<template>
  <li :class="classes"
    @mousedown.left="clickHandler"
    @mouseup.left="clickRelease">
    <span class="item-id">{{ datum.id }}</span>
    <span class="item-colour" :style="{ backgroundColor: datum.colour || 'rgba(0,0,0,.125)' }" />
    <span class="item-name" :title="datum.name" v-html="name"></span>
  </li>
</template>

<script>
export default {
  name: 'app-explorer-item',
  props: {
    datum: Object,
    path: Boolean,
  },
  data() {
    return {
      clickStart: null,
    };
  },
  computed: {
    data() {
      return this.$store.getters.getData;
    },
    selected() {
      return this.$store.getters.getSelected;
    },
    classes() {
      const classes = ['app-explorer__item', `app-explorer__item--${this.datum.type}`];
      if (this.selected === this.datum) classes.push('app-explorer__item--selected');
      return classes;
    },
    name() {
      if (!this.path || this.datum.type === 'workspace') return `<strong>${this.datum.name}</strong>`;
      if (this.datum.type === 'project') {
        const workspace = this.data.workspaces.find(w => w.id === this.datum.workspace);
        return `<span>${workspace.name}</span> / <strong>${this.datum.name}</strong>`;
      }
      const project = this.data.projects.find(p => p.id === this.datum.project);
      const workspace = this.data.workspaces.find(w => w.id === project.workspace);
      return `<span>${workspace.name}</span> / <span>${project.name}</span> / <strong>${this.datum.name}</strong>`;
    },
  },
  methods: {
    clickHandler() {
      this.$emit('itemClick', this.datum);
      this.clickStart = new Date().getTime();
    },
    clickRelease() {
      const now = new Date().getTime();
      if (now - this.clickStart > 300) {
        this.$emit('heavyClick', this.datum);
      }
    },
  },
};
</script>

<style lang="scss">
.app-explorer__item {
    padding: .375rem 2rem .375rem 1rem;
    display: flex;
    align-items: center;
    line-height: 1.25;
    cursor: pointer;
    &:hover {
      background-color: #eee;
    }
    &--selectedPath,
    &--selectedPath:hover {
      background-color: rgba(94, 176, 229, .19);
    }
    &--selected,
    &--selected:hover {
      background-color: #9c3;
    }
    &--empty {
      font-style: italic;
      color: #888;
    }
}
.item-id {
  font-size: .75rem;
  font-variant-numeric: tabular-nums;
}
.item-colour {
  display: inline-block;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  margin: 0 .5rem;
}
.item-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  color: #888;
  strong {
    font-weight: 600;
    color: #333;
  }
}
</style>
