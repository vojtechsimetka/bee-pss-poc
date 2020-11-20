<template>
  <div class="show-paste">
    <h3>Receive</h3>
    <div>
      <ul id="receieved-messages">
        <li v-for="message in messages" :key="message">
            {{ message }}
        </li>
      </ul>
    </div>

    <audio ref="audio">
      <source src="assets/bzz.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

const gatewayWS = 'ws://localhost:8082';
const topic = 'ws-poc';

const listen = (openCallback: () => void, messageCallback: (message: string) => void) => {
  // Create WebSocket connection.
  const socket = new WebSocket(`${gatewayWS}/pss/subscribe/${topic}`);

  // Connection opened
  socket.addEventListener('error', (event) => {
    console.log(event);
  });

  // Listen for messages
  socket.addEventListener('message', async (event) => {
    // callback(event.data);
    messageCallback(await event.data.text());
  });

  // Connection opened
  socket.addEventListener('open', () => openCallback());
};

@Component
export default class HelloWorld extends Vue {
  messages = [{ message: 'Welcome' }]

  mounted() {
    listen(console.log, (message: string) => {
      const b = this.$refs.audio;
      (b as HTMLAudioElement).play();
      this.messages.push({ message });
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
