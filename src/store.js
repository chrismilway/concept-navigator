import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: {},
    current: null,
    selected: null,
    searchText: '',
    history: [],
    loading: false,
  },
  getters: {
    getData: state => state.data,
    getCurrent: state => state.current,
    getSelected: state => state.selected,
    getSearchResults: (state) => {
      const results = [];
      const str = state.searchText.toLowerCase();
      if (!str.length) return results;
      Object.values(state.data).forEach((items) => {
        items.filter(i => i.name.toLowerCase().indexOf(str) > -1).forEach((i) => {
          results.push(i);
        });
      });
      return results.sort((a, b) => {
        const aname = a.name.toLowerCase();
        const apos = aname.indexOf(str);
        const bname = b.name.toLowerCase();
        const bpos = bname.indexOf(str);

        if (apos === 0 && bpos !== 0) return -1;
        if (apos !== 0 && bpos === 0) return 1;
        if (aname < bname) return -1;
        if (aname > bname) return 1;
        return 0;
      });
    },
    getHistory: state => ((state.history.length) ? state.history.slice(1) : []),
    getLoading: state => state.loading,
  },
  mutations: {
    setData: (state, data) => {
      state.data = data;
    },
    setCurrent: (state, datum) => {
      state.current = datum;
      state.history = state.history.filter(h => h !== datum);
      state.history.unshift(datum);
      while (state.history.length > 11) {
        state.history.pop();
      }
    },
    setSelected: (state, datum) => {
      state.selected = datum;
    },
    setSearchText: (state, text) => {
      state.searchText = text;
    },
    startLoad: (state) => {
      state.loading = true;
    },
    endLoad: (state) => {
      state.loading = false;
    },
  },
});
