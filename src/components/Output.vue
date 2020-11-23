<template>
  <div v-if="messages.length">
    <h4>Messages from other nodes for me in "{{ topic }}" topic</h4>
    <div class="messages">
      <div
        v-for="(message, index) in messages"
        :key="index"
      >
        {{ message.text }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getMessageListener, isBee } from '@/utils';
import { Component, Vue } from 'vue-property-decorator';
import { gateway, topic } from '@/defaults';

@Component
export default class Output extends Vue {
  messages: {text: string}[] = []

  topic = topic

  async mounted() {
    let url = `${window.location.protocol.endsWith('s') ? 'wws' : 'ws'}://${window.location.host}`;
    if (!await isBee(`${window.location.protocol}//${window.location.host}`)) url = `ws://${gateway}`;
    const listener = getMessageListener(url, topic);

    listener.addEventListener('message', async (event: MessageEvent) => {
      try {
        const text = await event.data.text();

        if (text) {
          this.messages.push({ text });

          // eslint-disable-next-line global-require
          const audio = new Audio(require('../assets/bzzzzzz.mp3'));
          if (audio) audio.play();
        }
      } catch (e) {
        console.error(e);
      }
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h4 {
  text-align: left;
  margin-left: 10px;
}
div.messages {
  text-align: left;
  display: flex;
  flex-direction: column-reverse;
}

div.messages > div {
  padding: 10px;
  border-bottom: 1px solid rgba(1,1,1,0.1);
}
</style>
