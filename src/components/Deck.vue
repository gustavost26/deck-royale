<template>
  <section class='app-deck container-fluid row'>
    <div class='col-sm-12 col-lg-8 row'>
      <div
        v-for='(slot, i) in shuffleCurrent'
        :key='i'
        class='col-sm-6 col-md-3'
        :class='"slot" + i'
      >
        <Card
          v-for='(card, j) in shuffleCards'
          class='card'
          :class='{ selected: j === slot && shuffling }'
          :card='card'
          :key='j'
        />
        <Card
          v-if='suggestedDeck'
          class='card'
          :class='{ selected: !shuffling }'
          :card='suggestedDeck[i]'
        />
      </div>
    </div>
    <div class='col-sm-12 col-lg-4'>
      <section id='shuffle' class='mt-3'>
        <h2>Shuffle!</h2>
        <button v-on:click='shuffle()' class='btn btn-success'>Do it!</button>
      </section>
      <section id='load-deck' class='load-from-base64 mt-3'>
        <h2>Load deck code</h2>
        <p>You can copy the deck code below and paste it again
        when you want to see the current deck. This way you can even share it with your friends!</p>
        <p>
          <input class='form-control' v-model='deckCode'
            v-on:click='$event.target.select()' v-on:input='loadDeckCode($event.target.value)'>
        </p>
      </section>
    </div>
  </section>
</template>

<script>
import * as b64 from 'base-64';

import Card from './Card';

export default {
  props: ['cards'],
  components: { Card },
  data() {
    return {
      shuffleCards: [],
      shuffleCurrent: [0, 7, 1, 5, 3, 6, 2, 4],
      suggestedDeck: [
        this.cards[0],
        this.cards[1],
        this.cards[2],
        this.cards[3],
        this.cards[4],
        this.cards[5],
        this.cards[6],
        this.cards[7],
      ],
      shuffling: false,
    };
  },
  computed: {
    deckCode() {
      return b64.encode(
        this.suggestedDeck.map(card => card.idName).join(','),
      );
    },
  },
  mounted() {
    this.randomizeShuffleImages();
    if (!this.loadDeckCode(location.hash.substring(1))) {
      this.shuffle();
    }

    addEventListener('hashchange', (event) => {
      this.loadDeckCode(event.newURL.substring(event.newURL.indexOf('#') + 1));
    });
  },
  methods: {
    loadDeckCode(b64str) {
      const names = b64.decode(b64str).split(',');
      const cards = names.map(name => this.cards.find(card => card.idName === name));

      if (cards.includes(undefined) || cards.length !== 8) return false;

      this.animateShuffling();
      this.setDeck(cards);
      return true;
    },
    shuffle() {
      this.animateShuffling();
      this.getNewDeck();
    },
    getNewDeck() {
      this.setDeck(this.getRandomCards(this.shuffleCurrent.length));
    },
    setDeck(deck) {
      this.suggestedDeck = [];
      this.suggestedDeck.push(...deck);
      this.setHash();
    },
    setHash() {
      location.hash = this.deckCode;
    },
    animateShuffling() {
      const startingSpeedMs = 30;
      const speedStep = 5;
      const maxLoopCount = 30;

      const go = (speed, counter) => {
        if (counter >= maxLoopCount) {
          this.shuffling = false;
          return;
        }

        this.shuffling = true; // Every day I'm S H U F F L I N
        this.shuffleCurrent = this.shuffleCurrent.map(
          (num) => {
            if (num < this.shuffleCards.length - 1) {
              return num + 1;
            }
            return 0;
          },
        );

        setTimeout(() => { go(speed + speedStep, counter + 1); }, speed);
      };
      go(startingSpeedMs, 0);
    },
    getRandomCards(cardAmt) {
      const random = () => Math.round(Math.random() * (this.cards.length - 1));
      const indexes = [];

      for (let i = 0; i < cardAmt; i += 1) {
        let r = random();

        while (indexes.includes(r)) {
          r = random();
        }

        indexes.push(r);
      }

      return indexes.map(i => this.cards[i]);
    },
    randomizeShuffleImages() {
      this.shuffleCards = [];
      const randomCards = this.getRandomCards(10);
      this.shuffleCards.push(...randomCards);
    },
  },
};
</script>

<style scoped>
.app-deck {
  height: 100vh;
}

.card {
  display: none;
  max-width: 100%;
  transition: top 1s, left 1s;
}

.card.selected {
  display: block;
}
</style>
