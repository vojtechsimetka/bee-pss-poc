<template>
  <div class="send">
      <div>
        <div class="addressbar">
          <label>To: </label>
          <input v-model="ethAddress" autofocus placeholder="ETH address" />
        </div>

        <textarea v-model="messageText" placeholder="Write some message"/>

        <button
          v-on:click="sendMessage"
          :disabled="
            ethAddressError !== '' ||
            ethAddress === '' ||
            messageText === '' ||
            sending ||
            networkError !== ''"
        >
          Send
        </button>
        <small v-if="ethAddressError">Error: {{ ethAddressError }}</small>
        <small v-if="overlayAddress">
          Recipient overlay address:
          <b>{{ overlayAddress.substr(0, 4) }}</b>{{ overlayAddress.substr(4)}}
        </small>
        <small v-if="networkError">{{ networkError }}</small>
        <div v-if="sending" class="progress-line" />
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  isEthAddress, overlayAddressFromEthereumAddress, send, isBee,
} from '@/utils';
import { gateway, topic } from '@/defaults';

@Component
export default class Input extends Vue {
  ethAddress = ''

  sending = false

  messageText = ''

  networkError = ''

  get overlayAddress(): string {
    if (isEthAddress(this.ethAddress)) {
      return overlayAddressFromEthereumAddress(this.ethAddress, 1);
    }
    return '';
  }

  get ethAddressError(): string {
    if (!this.ethAddress) return '';
    if (!isEthAddress(this.ethAddress)) return 'invalid ethereum address';
    return '';
  }

  url = '';

  async mounted() {
    this.url = `${window.location.protocol}//${window.location.host}`;
    if (!await isBee(this.url)) this.url = `http://${gateway}`;
    if (!await isBee(this.url)) this.networkError = `Could not connect to the Bee node ${this.url}`;
  }

  async sendMessage(): Promise<void> {
    this.sending = true;
    await send(
      this.url,
      topic,
      this.overlayAddress.substr(0, 4),
      this.messageText,
    );
    this.sending = false;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.send {
  width: 100%;
  border: 1px solid rgba(1,1,1,0.1);
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

div.send > div {
  padding: 15px;
  display: flex;
  flex-direction: column;
}

div.addressbar {
  display: flex;
  flex-direction: row;
}
div.addressbar input {
  margin: 0px 20px;
  border: none;
  outline: none;
  border-bottom: 1px solid rgba(1,1,1,0.1);
  width: 320px;
  max-width: 100%;
}
div.addressbar input:focus {
  border-bottom: 1px solid rgb(221, 114, 0);
}

textarea {
  margin-top: 10px;
  border: none;
  outline: none;
  resize: none;
  height: 100px;
}

button {
  outline: none;
  font-family: ibm-plex-mono;
  cursor: pointer;
  padding: 5px 20px;
  color: rgb(221, 114, 0);
  border: 1px solid rgb(221, 114, 0);
  background-color: white;
  border-radius: 10px;
  align-self: baseline;
  cursor: pointer;
}

button:hover {
  color: white;
  background-color: rgb(221, 114, 0);
}

button:disabled {
  color: white;
  background-color: lightgrey;
  border: 1px solid lightgrey;
}

small {
  margin-top: 5px;
  text-align: left;
}

.progress-line, .progress-line:before {
  height: 3px;
  width: 100%;
  margin: 0;
  margin-top: 5px;
}
.progress-line {
  display: -webkit-flex;
  display: flex;
}
.progress-line:before {
  background-color: rgb(221, 114, 0);
  content: '';
  -webkit-animation: running-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  animation: running-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
@-webkit-keyframes running-progress {
  0% { margin-left: 0px; margin-right: 100%; }
  50% { margin-left: 25%; margin-right: 0%; }
  100% { margin-left: 100%; margin-right: 0; }
}
@keyframes running-progress {
  0% { margin-left: 0px; margin-right: 100%; }
  50% { margin-left: 25%; margin-right: 0%; }
  100% { margin-left: 100%; margin-right: 0; }
}

</style>
