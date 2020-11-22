import createKeccakHash from 'keccak';
import axios from 'axios';

export function stripHexPrefix(hex: string) {
  if (hex.startsWith('0x')) return hex.substr(2);
  return hex;
}

export function toLittleEndian(int: number): string {
  const intStr = int.toString(16).padStart(16, '0');
  const littleEndian = intStr.match(/../g)?.reverse().join('');
  if (littleEndian) return littleEndian;
  return '';
}

export function isEthAddress(address: string) {
  if (/^(0x)?[0-9a-fA-F]{40}$/i.test(address)) return true;
  return false;
}

export function isBeeNetwork(address: string) {
  if (/^(0x)?[0-9a-f]{16}$/i.test(address)) return true;
  return false;
}

export function overlayAddressFromEthereumAddress(ethAddress: string, networkId: number) {
  const overlayAddress = createKeccakHash('sha3-256')
    .update(Buffer.from(`${stripHexPrefix(ethAddress)}${toLittleEndian(networkId)}`, 'hex'))
    .digest('hex');
  return overlayAddress;
}

export function getMessageListener(gateway: string, topic: string): WebSocket {
  return new WebSocket(`${gateway}/pss/subscribe/${topic}`);
}

export async function send(
  gateway: string,
  topic: string,
  overlayAddress: string,
  message: string,
) {
  return axios.post(`${gateway}/pss/send/${topic}/${overlayAddress}`, message);
}

export async function isBee(gateway: string): Promise<boolean> {
  try {
    const res = await axios.get(gateway);
    return typeof res?.data === 'string' && res.data.startsWith('Ethereum Swarm Bee');
  } catch (e) {
    console.error(e);
  }
  return false;
}
