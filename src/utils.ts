import createKeccakHash from 'keccak';

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

export function overlayAddressFromEthereumAddress(ethAddress: string, networkId: string) {
  const overlayAddress = createKeccakHash('sha3-256')
    .update(Buffer.from(`${stripHexPrefix(ethAddress)}${stripHexPrefix(networkId)}`, 'hex'))
    .digest('hex');
  return overlayAddress;
}
