<template>
  <div class='loading-screen'>
    <div class='text'>
      <figure id='jumping-dots' ref='dots'>
        <div class='dot' v-for='dot in [1, 2, 3, 4]' :key='dot'>.</div>
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  mounted() {
    this.$refs.dots.querySelectorAll('.dot')
      .forEach((el, i) => {
        const dot = el;

        function down() {
          dot.style.transform = 'none';
        }

        function up() {
          dot.style.transform = 'translateY(-100%)';
          setTimeout(down, 400);
        }

        setTimeout(up, i * 500);
      });
  },
};
</script>

<style scoped>
.dot {
  font-size: 2em;
  font-weight: bold;
  display: inline-block;
  transition: transform 400ms ease;
}

.loading-screen {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #730DBC;
  color: #EEE;
}

.text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
