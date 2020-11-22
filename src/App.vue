<template>
  <div id="app">
    <Input />
    <Output />
    <div class="welcome">
      <h1>Postal Service over Swarm (PSS) demo</h1>
      <p>
        Send annonymous and persistent messages to any Bee node or neighborhood.
        Your message will be indistinguishable from other Bee data.
        You can read more in the
        <a href="https://swarm-gateways.net/bzz:/latest.bookofswarm.eth/">Book of Swarm</a>
        section 4.4. PSS: Direct push messaging with mailboxing
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Input from './components/Input.vue';
import Output from './components/Output.vue';

@Component({
  components: {
    Input,
    Output,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 10px;
  padding: 0px;
}

.welcome {
  padding: 10px;
}
</style>
