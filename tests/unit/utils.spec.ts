import chai from 'chai';
import * as utils from '../../src/utils';

const { expect } = chai;

describe('utils', () => {
  it('stripHexPrefix', () => {
    expect(utils.stripHexPrefix('0x0100000000000000')).to.equal('0100000000000000');
    expect(utils.stripHexPrefix('0100000000000000')).to.equal('0100000000000000');
  });

  it('toLittleEndian', () => {
    expect(utils.toLittleEndian(1)).to.equal('0100000000000000');
    expect(utils.toLittleEndian(5)).to.equal('0500000000000000');
    expect(utils.toLittleEndian(15)).to.equal('0f00000000000000');
    expect(utils.toLittleEndian(155)).to.equal('9b00000000000000');
    expect(utils.toLittleEndian(578023975923)).to.equal('f3ebe99486000000');
  });

  it('isEthAddress', () => {
    expect(utils.isEthAddress('0x0000000000000000000000000000000000000000')).to.equal(true);
    expect(utils.isEthAddress('0000000000000000000000000000000000000000')).to.equal(true);

    expect(utils.isEthAddress('0x000000000000000000000000000000000000000')).to.equal(false);
  });

  it('isBeeNetworkId', () => {
    expect(utils.isBeeNetwork('0x0100000000000000')).to.equal(true);
    expect(utils.isBeeNetwork('0100000000000000')).to.equal(true);
  });

  it('overlayAddressFromEthereumAddress', () => {
    expect(utils.overlayAddressFromEthereumAddress('1815cac638d1525b47f848daf02b7953e4edd15c', '0100000000000000')).to.equal('b003840cac8f71dc3e6025dbccae613fd107dcb2fb187808b54cab92cfdd8299');
    expect(utils.overlayAddressFromEthereumAddress('0x1815cac638d1525b47f848daf02b7953e4edd15c', '0x0100000000000000')).to.equal('b003840cac8f71dc3e6025dbccae613fd107dcb2fb187808b54cab92cfdd8299');
    expect(utils.overlayAddressFromEthereumAddress('0737e7c2e82fac12ca9e2bae01bea910593300e6', '0x0100000000000000')).to.equal('ba898f4dd93c5b29dc2d9daff3ef3d183fa6b5bfac9c23d975c0ee1fb06fcad9');
    expect(utils.overlayAddressFromEthereumAddress('d26bc1715e933bd5f8fad16310042f13abc16159', '0x0100000000000000')).to.equal('8e186467e0ed20b73667b5353210c0e650401cde0461c25c6b3e4a1f636b8cb8');
  });
});
