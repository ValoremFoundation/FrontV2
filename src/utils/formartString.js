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
