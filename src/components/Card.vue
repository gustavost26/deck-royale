<template>
  <div ref='root'>
    <figure class='app-card' v-if='mode === "full"'>
      <div class='v-card-image'>
        <img :src='source' :alt='card.name'>
      </div>
      <figcaption class='p-4'>
        <ul class='v-card-info'>
          <li>
            <h5>{{ card.name }}</h5>
          </li>
          <li>Cost: {{ card.elixirCost }}
            <img
              src='//upload.wikimedia.org/wikipedia/commons/4/43/Elixir.png'
              alt='Elixir' class='icon'
            >
          </li>
          <li>
            <span class='v-card-type'>{{ card.type }}</span>
            &middot;
            <span :class='card.rarity'>{{ card.rarity }}</span>
          </li>
          <li class='description'>{{ card.description }}</li>
        </ul>
      </figcaption>
    </figure>
    <figure
      class='app-card-list container-fluid my-1'
      v-else-if='mode === "list"'
      v-on:click='moreInfo()'
    >
      <div class='v-card-thumb float-left mr-3'>
        <img :src='source' :alt='card.name' class='py-2'>
      </div>
      <figcaption>
        <ul class='v-card-info py-2'>
          <li>
            <h5 class='m-0'>{{ card.name }}</h5>
          </li>
          <li>
            <span class='v-card-type'>{{ card.type }}</span>
            &middot;
            <span :class='card.rarity'>{{ card.rarity }}</span>
          </li>
        </ul>
        <ul class='v-card-info v-card-moreinfo'>
          <li>Cost: {{ card.elixirCost }}
            <img
              src='//upload.wikimedia.org/wikipedia/commons/4/43/Elixir.png'
              alt='Elixir' class='icon'
            >
          </li>
          <li class='description'>{{ card.description }}</li>
        </ul>
      </figcaption>
    </figure>
  </div>
</template>

<script>
export default {
  props: ['card', 'mode'],
  data() {
    return {
    };
  },
  computed: {
    source() {
      return `//www.clashapi.xyz/images/cards/${this.card.idName}.png`;
    },
  },
  methods: {
    moreInfo() {
      const moreinfo = this.$refs.root.querySelector('.app-card-list');
      moreinfo.classList.toggle('details');
    },
  },
};
</script>

<style scoped>
.app-card {
  width: 100%;
  height: 45vh;
  position: relative;
}

.app-card-list {
  background-color: #555555DF;
  border-radius: 1em;
  color: #EEE;
  cursor: pointer;
  transition: background-color 400ms ease;
}

.app-card-list:hover {
  background-color: #555555CA;
}

.app-card-list,
.app-card-list .v-card-thumb,
.app-card-list .v-card-thumb img {
  transition: height 400ms ease;
  height: 6em;
}

.app-card-list .v-card-thumb {
  text-align: center;
}

.app-card-list.details,
.app-card-list.details .v-card-thumb,
.app-card-list.details .v-card-thumb img {
  height: 12em;
}

.v-card-image, .v-card-image img, .app-card figcaption, .app-card .v-card-info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.app-card .v-card-image, .app-card figcaption {
  width: 100%;
  height: 100%;
}

.v-card-info {
  width: 100%;
}

.v-card-image img {
  max-width: 100%;
  max-height: 100%;
  position: relative;
  z-index: 10;
}

.app-card figcaption {
  visibility: hidden;
  opacity: 0;
  transition: opacity 400ms;
  background-color: #333333DF;
  color: #EEE;
  z-index: 20;
}

.app-card:hover figcaption {
  visibility: visible;
  opacity: 1;
}

.v-card-info, .v-card-info li {
  padding: .3em;
  margin: 0;
  list-style: none;
  line-height: 1.25em;
}

.v-card-info li {
  border-bottom: #FFFFFF22 1px solid;
}

.v-card-type {
  font-style: italic;
  font-weight: bold;
}

.description {
  font-style: italic;
  font-size: .9em;
}

.Common {
  color: inherit;
}

.Rare {
  color: lightblue;
  font-weight: bold;
}

.Epic {
  color: pink;
  font-weight: bold;
}

.Legendary {
  font-size: 1.1em;
  font-weight: bold;
  color: gold;
}

.icon {
  height: 12px;
  margin: 0 .25em;
}

.v-card-moreinfo {
  opacity: 0;
  transition: opacity 400ms ease;
}

.details .v-card-moreinfo {
  opacity: 1;
}
</style>
