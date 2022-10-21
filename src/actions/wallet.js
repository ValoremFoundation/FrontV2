import { GET_WALLET_ADDRESS } from './types';

export const setWalletAddress = items => ({
  type: GET_WALLET_ADDRESS,
  payload: {
    items,
  },
});
