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
  const hours = date.getHours();
  const minutes = '0' + date.getMinutes();
  const seconds = '0' + date.getSeconds();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedTime = day + '/' + month + '/' + year;
  return formattedTime;
};
