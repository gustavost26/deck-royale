<template>
  <div ref='root'>
    <figure
      :class='{
        "app-card-list container my-1": mode === "list",
        "app-card p-1": mode === "full",
        "clearfix": true,
      }'
      v-on:click='moreInfo()'
    >
      <div
        :class='{
          "v-card-thumb float-left": mode === "list",
          "v-card-image": mode === "full",
        }'
        ref='listThumb'
      >
        <img :src='source' :alt='card.name' class='py-2'>
      </div>
      <figcaption class='p-1' v-if='mode === "full"'>
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
      <figcaption ref='listDetails' v-if='mode === "list"'>
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
.app-card-list .v-card-thumb img {
  transition: height 400ms ease;
}

.app-card-list .v-card-thumb {
  width: 6em;
  height: 6em;
  transition: all 300ms ease 0s;
  text-align: center;
}

.app-card-list .v-card-thumb img {
  height: 100%;
}

.app-card-list.details .v-card-thumb {
  height: 12em;
  width: 100%;
  transition-delay: 300ms;
}

.v-card-image {
  text-align: center;
}

.app-card figcaption {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
}

.app-card .v-card-image {
  width: 100%;
  height: 100%;
}

.v-card-info {
  width: 100%;
}

figcaption {
  transition: padding 400ms ease 300ms;
}

.app-card-list.details figcaption {
  padding-top: 12em;
  transition-delay: 0s;
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
  height: 0;
  transition: opacity 400ms ease, height 400ms ease;
}

.details .v-card-moreinfo {
  opacity: 1;
  height: 7em;
}
</style>
