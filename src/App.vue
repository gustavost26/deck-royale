<template>
  <div>
    <transition name='fade'>
      <LoadingScreen class='loading' ref='loading' v-if='!loaded'/>
    </transition>
    <transition name='fade'>
      <MainUI v-if='loaded' :cards='cards'/>
    </transition>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import LoadingScreen from './components/LoadingScreen';
import MainUI from './components/MainUI';

export default {
  name: 'App',
  components: {
    LoadingScreen,
    MainUI,
  },
  data() {
    return {
      loaded: false,
      cards: [],
    };
  },
  mounted() {
    let canLoad = false;

    setTimeout(() => {
      if (canLoad) this.loaded = true;
      else canLoad = true;
    }, 3000);

    axios.get('//www.clashapi.xyz/api/cards')
      .then(
        (res) => {
          if (canLoad) this.loaded = true;
          else canLoad = true;

          this.cards.push(...res.data);
        },
      );
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
