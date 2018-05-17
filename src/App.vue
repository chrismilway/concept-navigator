<template>
  <div id="app">
    <header class="app-header">
      <h1 class="app-header__title">{{ label }}</h1>
      <button
        class="explorer-toggle"
        :class="buttonClass"
        ref="explorerToggle"
        :style="{backgroundImage: (active) ? `url(${crossIcon})` : `url(${arrowIcon})`}"
        @click="toggle">Explorer</button>
    </header>
    <div class="backdrop" v-if="active" @click="close"></div>
    <div class="explorer-arrow" :style="arrowPosition" v-if="active" />
    <app-explorer v-if="active" @close="close" />
    <div class="page-info" v-if="!loading">
      You are viewing the &lsquo;<strong>{{ label }}</strong>&rsquo; {{ pagetype }}
    </div>
    <div class="loading" v-if="loading"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AppExplorer from './components/AppExplorer';

const crossIcon = require('./assets/icons/cross.svg');
const arrowIcon = require('./assets/icons/arrow.svg');

export default {
  name: 'App',
  components: {
    AppExplorer,
  },
  data() {
    return {
      active: false,
      arrowPosition: {},
    };
  },
  computed: {
    crossIcon() {
      return crossIcon;
    },
    arrowIcon() {
      return arrowIcon;
    },
    ...mapGetters({
      current: 'getCurrent',
      loading: 'getLoading',
    }),
    buttonClass() {
      return {
        'explorer-toggle--active': this.active,
      };
    },
    label() {
      return (this.current) ? this.current.name : 'Demo account';
    },
    pagetype() {
      return (this.current) ? this.current.type : null;
    },
  },
  methods: {
    toggle() {
      if (this.active) this.close();
      else this.open();
    },
    open() {
      const btn = this.$refs.explorerToggle;
      this.arrowPosition = {
        left: `${btn.offsetLeft}px`,
        top: `${btn.offsetTop + 24}px`,
      };
      this.active = true;
    },
    close() {
      this.active = false;
    },
  },
};
</script>

<style lang="scss">
body {
  background-color: #eee;
  margin: 0;
  padding: 0;
  color: #333;
  * {
    box-sizing: border-box;
    font-family: 'Source Sans Pro', sans-serif;
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
.app-header {
  height: 4rem;
  background-color: #555;
  color: #fff;
  padding: 1rem;
  display: flex;
  align-items: center;

  &__title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-right: .75rem;
    line-height: 1;
  }
}
.explorer-toggle {
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 3px;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.25);
  text-indent: 2rem;
  overflow: hidden;
  &:focus {
    outline: none;
  }
  &--active {
    z-index: 2;
    border-color: #9c3;
    background-color: #9c3;
  }
}
.explorer-arrow {
  position: fixed;
  width: 1.5rem;
  height: .75rem;
  background-color: #fff;
  z-index: 3;
  clip-path: polygon(0% 100%, 50% 25%, 100% 100%);
}
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  z-index: 1;
}
.page-info {
  position: fixed;
  top: 50%;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: #888;
  strong {
    color: rgb(94, 176, 229);
  }
}
.loading {
  position: fixed;
  top: calc(50% - 1rem);
  left: calc(50% - 1rem);
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border-width: .25rem;
  border-style: solid;
  border-color: #9c3 transparent transparent transparent;
  animation: spin .5s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
