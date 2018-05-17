<template>
  <section class="app-explorer">
    <app-explorer-header :tab="tab" @selectTab="selectTab" />
    <ul class="app-explorer__columns">
      <app-explorer-column v-for="column in columns"
        :key="column.key"
        :data="column"
        @navigation="triggerClose"/>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import AppExplorerHeader from './AppExplorerHeader';
import AppExplorerColumn from './AppExplorerColumn';

export default {
  name: 'app-explorer',
  components: {
    AppExplorerHeader,
    AppExplorerColumn,
  },
  data() {
    return {
      tab: 'browse',
    };
  },
  computed: {
    ...mapGetters({
      data: 'getData',
      selected: 'getSelected',
      searchResults: 'getSearchResults',
      history: 'getHistory',
    }),
    pathWorkspace() {
      if (this.selected) {
        if (this.selected.type === 'workspace') {
          return this.selected;
        } else if (this.selected.type === 'project') {
          return this.data.workspaces.find(w => w.id === this.selected.workspace);
        }
        return this.data.workspaces.find(w =>
          w.id === this.data.projects.find(p => p.id === this.selected.project).workspace);
      }
      return null;
    },
    pathProject() {
      if (this.selected) {
        if (this.selected.type === 'project') {
          return this.selected;
        } else if (this.selected.type === 'campaign') {
          return this.data.projects.find(p => p.id === this.selected.project);
        }
      }
      return null;
    },
    workspaces() {
      return this.data.workspaces.filter(() => true).sort((a, b) => b.id - a.id);
    },
    projects() {
      return (this.pathWorkspace)
        ? this.data.projects
          .filter(p => p.workspace === this.pathWorkspace.id)
          .sort((a, b) => b.id - a.id)
        : null;
    },
    campaigns() {
      return (this.pathProject)
        ? this.data.campaigns
          .filter(c => c.project === this.pathProject.id)
          .sort((a, b) => b.id - a.id)
        : null;
    },
    widths() {
      if (this.projects && this.campaigns) {
        return { workspace: '33%', project: '33%', campaign: '34%' };
      } else if (this.projects) {
        return { workspace: '33%', project: '67%', campaign: '0%' };
      }
      return { workspace: '100%', project: '0%', campaign: '0%' };
    },
    columns() {
      switch (this.tab) {
        case 'browse':
          return [{
            key: 'workspaces',
            label: 'Workspaces',
            items: this.workspaces,
            selected: this.pathWorkspace,
            width: this.widths.workspace,
            opacity: (this.workspaces) ? 1 : 0,
            empty: 'There are no workspaces in this account',
          }, {
            key: 'projects',
            label: 'Projects',
            items: this.projects,
            selected: this.pathProject,
            width: this.widths.project,
            opacity: (this.projects) ? 1 : 0,
            empty: 'There are no projects in this workspace',
          }, {
            key: 'campaigns',
            label: 'Campaigns',
            items: this.campaigns,
            selected: this.pathCampaign,
            width: this.widths.campaign,
            opacity: (this.campaigns) ? 1 : 0,
            empty: 'There are no campaigns in this project',
            quick: true,
          }];
        case 'recent':
          return [{
            key: 'recent',
            label: 'Recent places',
            items: this.history,
            quick: true,
            path: true,
            empty: 'You haven\'t been anywhere yet!',
          }];
        case 'search':
          return [{
            key: 'search',
            label: 'Search results',
            items: this.searchResults,
            quick: true,
            path: true,
            empty: 'No search results',
          }];
        default:
          return [];
      }
    },
  },
  methods: {
    selectTab(tab) {
      this.tab = tab;
    },
    triggerClose() {
      this.$emit('close');
    },
  },
  created() {
    this.$store.commit('setSearchText', '');
  },
};
</script>

<style lang="scss">
.app-explorer {
  position: fixed;
  top: 3.5rem;
  left: 1rem;
  background-color: #fff;
  width: calc(100% - 2rem);
  height: calc(100% - 4.5rem);
  max-width: 80rem;
  max-height: 40rem;
  border-radius: 3px;
  box-shadow: 0 0 4px #000;
  z-index: 2;
  display: flex;
  flex-flow: column nowrap;
  overflow: hidden;
  &__header {
    height: 2.75rem;
    border-bottom: 1px solid #ccc;
  }
  &__columns {
    flex: 1;
    display: flex;
    align-items: stretch;
  }
}
</style>
