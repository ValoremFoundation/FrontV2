import Web3 from 'web3';
import numbro from 'numbro';

export const truncateAddress = address => {
  if (!address) return 'No Account';
  const match = address.match(/^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const toHex = num => {
  const val = Number(num);
  return '0x' + val.toString(16);
};

export const toNumber = hex => {
  return parseInt(`${hex}`, 16);
};

export const numberWithCommas = num => {
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

export const dateWithTimestamp = unix_timestamp => {
  const date = new Date(unix_timestamp);
  // const hours = date.getHours();
  // const minutes = '0' + date.getMinutes();
  // const seconds = '0' + date.getSeconds();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedTime = month + '/' + day + '/' + year;
  return formattedTime;
};

export const capitalizeFirstLetter = string => {
  return string?.charAt(0).toUpperCase() + string?.slice(1);
};

export const toFixedTail = (value, digit) => {
  return Number(value).toFixed(digit).replace(/\.0+$/, '');
};

export const fromWei = value => {
  return Web3.utils.fromWei(value ?? '0', 'ether');
};

export const toWei = value => {
  return Web3.utils.toWei(value ?? '0', 'ether');
};

export const isAddress = address => {
  return Web3.utils.isAddress(address);
};

export const numberFormat = (num = 0, fixed = 3) => {
  return numbro(num).format({
    thousandSeparated: true,
    ...(fixed && { mantissa: fixed }), // number of decimals displayed
  });
};

export const sliceString = (description, letters) => {
  return description?.length > letters ? description?.slice(0, letters) + ' ...' : description;
};

export const registerToken = async (tokenAddress, tokenSymbol, tokenDecimals, chainId) => {
  const tokenAdded = await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: `https://valorem-nft-marketplace.s3.us-east-2.amazonaws.com/logo-rounded.png`, // https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png
      },
    },
  });

  return tokenAdded;
};
