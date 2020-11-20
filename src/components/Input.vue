<template>
  <div class="send-message">
  <h3>Send Message</h3>
    <div>
    <label>Ethereum Address</label><br/>
      <input v-model="ethAddress" /><br/>

      <span v-if="ethAddressError">error: {{ ethAddressError }}<br/></span>
      <span v-if="overlayAddress">overlayAddress: {{ overlayAddress }}<br/></span>
      <br />

      <label>Message</label><br/>
      <textarea v-model="messageText"></textarea><br/>
      <button v-on:click="sendMessage">Send</button><br/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { isEthAddress, overlayAddressFromEthereumAddress } from '../utils';

const gatewayHTTP = 'http://localhost:8083';
const topic = 'ws-poc';

const send = async (overlayAddress: string, messageText: string) => {
  const prefix = overlayAddress.slice(0, 4);
  const url = `${gatewayHTTP}/pss/send/${topic}/${prefix}`;
  return axios.post(url, messageText);
};

@Component
export default class HelloWorld extends Vue {
  ethAddress = ''

  get overlayAddress(): string {
    console.log('calculating overlay address');
    if (isEthAddress(this.ethAddress)) {
      console.log('overlay address set to: ', overlayAddressFromEthereumAddress(this.ethAddress, '0x0100000000000000'));
      return overlayAddressFromEthereumAddress(this.ethAddress, '0x0100000000000000');
    }
    return '';
  }

  get ethAddressError(): string {
    if (!isEthAddress(this.ethAddress)) return 'invalid ethereum address';
    return '';
  }

  messageText = ''

  sendMessage(): void {
    console.log(this.ethAddress, this.overlayAddress, this.messageText);
    send(
      this.overlayAddress,
      this.messageText,
    );
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
