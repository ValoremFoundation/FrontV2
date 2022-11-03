import { InjectedConnector } from '@web3-react/injected-connector';

export const injected = new InjectedConnector();

export const networkItem = [
  {
    ChainID: 137,
    btIcon: '/img/net/polygon.png',
    networkName: 'Polygon',
    selected: false,
    isBridgeSupport: false,
    params: [
      {
        chainName: 'Polygon',
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC', // 2-6 characters long
          decimals: 18,
        },
        chainId: '0x89',
        rpcUrls: [
          'https://polygon-rpc.com',
          'https://rpc-mainnet.matic.network',
          'https://rpc-mainnet.maticvigil.com',
          'https://rpc-mainnet.matic.quiknode.pro',
        ],
        blockExplorerUrls: ['https://polygonscan.com'],
      },
    ],
  },
];
