import Vue from 'vue';
import Card from '@/components/Card';

describe('Card.vue', () => {
  it('has the image source as a computed property', () => {
    expect(typeof Card.computed.source)
      .toBe('function');

    const Constructor = Vue.extend(Card);
    const vm = new Constructor().$mount();
  });
});
