<template>
  <div ref='root'>
    <figure class='app-card border-0'>
      <div class='v-card-image'>
        <img :src='source' :alt='card.name'>
      </div>
      <figcaption>
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
  </div>
</template>

<script>
export default {
  props: ['card'],
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
  },
};
</script>

<style scoped>
.app-card {
  width: 100%;
  height: 45vh;
  position: relative;
}

.v-card-image, .v-card-image img, figcaption, .v-card-info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.v-card-image, figcaption {
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

figcaption {
  visibility: hidden;
  opacity: 0;
  transition: opacity 400ms;
  background-color: #101050DF;
  padding: .5em;
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
  color: #FFF;
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
</style>
