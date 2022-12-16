import Web3 from 'web3';
import quickRouterABI from 'src/assets/abis/quickRouter.json';
import quickFactoryABI from 'src/assets/abis/quickFactory.json';
import quickPairABI from 'src/assets/abis/quickPair.json';
import * as ethers from 'ethers';

export const W_ADDRESS = {
  137: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
  80001: '0x9c3c9283d3e44854697cd22d3faa240cfb032889',
};

export const VLR_ADDRESS = {
  137: '0x221d160BA7E3552FeE22A33B3982AD408C3D6E65',
  80001: '0xB35460BeA32E110619fcB410E907404e0dB0Ef2c',
};

export const STABLE18_TOKEN = {
  137: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  80001: '0xd393b1e02da9831ff419e22ea105aae4c47e1253',
};

export const quickRouter = {
  137: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
  80001: '0x8954AfA98594b838bda56FE4C12a09D7739D179b',
};

export const FACTORY_ADDRESS = '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32';
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const nodeUrls = {
  137: 'https://polygon-rpc.com',
  80001: 'https://rpc-mumbai.maticvigil.com',
};

const getRpcUrl = chainId => {
  if (nodeUrls[chainId]) {
    return nodeUrls[chainId];
  }
};

const maticWeb3Provider = new Web3.providers.HttpProvider(getRpcUrl(137));
const mumbaiWeb3Provider = new Web3.providers.HttpProvider(getRpcUrl(80001));

const maticWeb3 = new Web3(maticWeb3Provider);
const quickRouterContract = new maticWeb3.eth.Contract(quickRouterABI, quickRouter[137]);

const mumbaiWeb3 = new Web3(mumbaiWeb3Provider);
const mumbaiRouterContract = new mumbaiWeb3.eth.Contract(quickRouterABI, quickRouter[80001]);

export const getRouterContract = chainId => {
  let retRouter;
  switch (chainId) {
    case 137:
      retRouter = quickRouterContract;
      break;
    case 80001:
      retRouter = mumbaiRouterContract;
      break;
    default:
      retRouter = quickRouterContract;
      break;
  }

  return retRouter;
};

export const getWeb3Provider = chainId => {
  let providerUrl;
  if (nodeUrls[chainId]) {
    providerUrl = nodeUrls[chainId];
  }

  return new Web3.providers.HttpProvider(providerUrl);
};

export const getWeb3 = chainId => {
  return new Web3(getWeb3Provider(chainId));
};

export const getQuickPairAddress = async (baseToken, quoteToken, chainId) => {
  const web3 = new Web3(getWeb3Provider(chainId));
  const quickFactoryContract = new web3.eth.Contract(quickFactoryABI, FACTORY_ADDRESS);
  const pairAddress = await quickFactoryContract.methods.getPair(baseToken, quoteToken).call();
  if (pairAddress === ZERO_ADDRESS) {
    return null;
  }
  return pairAddress;
};

export const getNativeTokenPrice = async chainId => {
  return new Promise((resolve, reject) => {
    const web3 = getWeb3(chainId);
    const path = [W_ADDRESS[chainId], STABLE18_TOKEN[chainId]];
    const routerContract = getRouterContract(chainId);
    routerContract.methods
      .getAmountsOut(web3.utils.toBN(1 * 10 ** 18), path)
      .call()
      .then(data => resolve(parseFloat(ethers.utils.formatUnits(`${data[data.length - 1]}`, 18))))
      .catch(err => reject(err));
  });
};

export const getEstimateAmount = (baseAddress, quoteAddress, value, chainId) => {
  return new Promise(async (resolve, reject) => {
    const path = [baseAddress, quoteAddress];
    const routerContract = getRouterContract(chainId);
    routerContract.methods
      .getAmountsOut(ethers.utils.parseUnits(`${value}`, 18), path)
      .call()
      .then(data => {
        resolve(ethers.utils.formatUnits(`${data[data.length - 1]}`, 18).toString());
      })
      .catch(err => {
        console.log('get estimate amount error', err);
        reject(err);
      });
  });
};

export const getReserves = (pairAddress, chainId) => {
  return new Promise(async (resolve, reject) => {
    const web3 = new Web3(getWeb3Provider(chainId));
    const paireContract = new web3.eth.Contract(quickPairABI, pairAddress);
    paireContract.methods
      .getReserves(pairAddress)
      .call()
      .then(data => {
        console.log(data);
        resolve(data);
        // return value
        // _reserve0   uint112 :  10000000000000000000
        // _reserve1   uint112 :  9990000000000000000
      })
      .catch(err => {
        console.log('get reserves error', err);
        reject(err);
      });
  });
};
