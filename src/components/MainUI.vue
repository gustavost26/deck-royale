<template>
  <section class='app-deck container' ref='root'>
    <div class='row'>
      <div class='col-12'>
        <section id='controls' class='my-3 container-fluid'>
          <div class='row'>
            <div class='col-4 text-center'>
              <button
                v-on:click='toggleListMode()'
                class='mx-2 py-2 px-3 btn btn-secondary btn-sm'
              >
                <img src='/static/grid-three-up.svg'
                  alt='Toggle view'
                  style='height: 1.2em' class='mr-0 mr-sm-2'
                  v-show='listMode === "list"'
                >
                <img src='/static/list.svg'
                  alt='Toggle view'
                  style='height: 1.2em' class='mr-0 mr-sm-2'
                  v-show='listMode === "full"'
                >
                <span class='d-none d-sm-inline'>Toggle view</span>
              </button>
            </div>
            <div class='col-4 text-center'>
              <button
                v-on:click='shuffle()'
                class='mx-2 py-2 px-3 btn btn-warning btn-sm'
              >
                <img src='/static/random.svg' alt='Shuffle!'
                  style='height: 1.2em' class='mr-0 mr-sm-2'>
                <span class='d-none d-sm-inline'>Shuffle!</span>
              </button>
            </div>
            <div class='col-4 text-center'>
              <popper trigger='click' :options='{ placement: "bottom" }'>
                <div class='popper'>
                  <section id='deck-code-info' class='m-2'>
                    <h5>
                      <img src='/static/clipboard.svg' alt='Copied'
                        style='height: 1.2em' class='mr-0 mr-sm-2'>
                      Copied to clipboard!
                    </h5>
                    <p>The current URL leads to the exact deck you see below.</p>
                  </section>
                </div>
                <button slot='reference' class='mx-2 py-2 px-3 btn btn-primary btn-sm'
                  v-on:click='copyDeckUrl()'
                >
                  <img src='/static/link-intact.svg' alt='Copy'
                    style='height: 1.2em' class='mr-0 mr-sm-2'>
                  <span class='d-none d-sm-inline'>Get deck URL</span>
                </button>
              </popper>
              <input type='text' class='viewport-hide' readonly
                :value='deckUrl' ref='deckCode'>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div class='fades row' ref='cardList'>
      <div class='col-12 container-fluid'>
        <div class='row align-items-start'>
          <div
            v-for='(slot, i) in shuffleCurrent'
            :key='i'
            :class='{
              ["slot" + i]: true,
              "col-6 col-sm-6 col-md-3": listMode === "full",
              "col-12 col-md-6": listMode === "list",
            }'
          >
            <Card
              v-for='(card, j) in shuffleCards'
              class='v-card'
              :class='{ selected: j === slot && shuffling }'
              :card='card'
              :key='j'
              :mode='listMode'
            />
            <Card
              v-if='suggestedDeck'
              class='v-card'
              :class='{ selected: !shuffling }'
              :card='suggestedDeck[i]'
              :mode='listMode'
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import * as b64 from 'base-64';
import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/css/vue-popper.css';

import Card from './Card';

export default {
  props: ['cards'],
  components: { Card, Popper },
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
      listMode: 'full',
      deckUrl: location.toString(),
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

    const hashWatch = (event) => {
      this.deckUrl = event.newURL;
      this.loadDeckCode(this.deckUrl.substring(this.deckUrl.indexOf('#') + 1));
    };
    addEventListener('hashchange', hashWatch);
  },
  methods: {
    copyDeckUrl() {
      this.$refs.deckCode.select();
      document.execCommand('copy');
    },
    toggleListMode() {
      this.$refs.cardList.classList.add('fade');

      setTimeout(() => {
        if (this.listMode === 'list') {
          this.listMode = 'full';
        } else {
          this.listMode = 'list';
        }

        setTimeout(() => {
          this.$refs.cardList.classList.remove('fade');
        }, 400);
      }, 400);
    },
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

        this.shuffling = true; // Every day I'm shufflin'
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

.v-card {
  display: none;
  max-width: 100%;
  transition: top 1s, left 1s;
}

.v-card.selected {
  display: block;
}

.overflow {
  overflow: auto;
  max-height: 100vh;
}

.btn-royale {
  background-color: #B87DE2;
}

.btn-royale:hover {
  background-color: #9D52D3;
}

::selection {
  background-color: #9D52D3;
  color: #EEE;
}

.fades {
  transition: opacity 300ms;
}

.fade {
  opacity: 0;
}

.viewport-hide {
  position: fixed;
  top: 0;
  left: 0;
  transform: translate(-100%, -100%);
}
</style>
