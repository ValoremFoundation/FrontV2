export const LS_KEY = 'login-with-metamask';

export const SYMBOL = 'VLR';

export const user1Info = {
  info: {
    name: 'Sarah',
    role: 'Creator',
    avatar: '/img/Sarah.png',
    dotColor: '#111827',
  },
  gift: [
    {
      name: 'Sarah',
      amount: 100,
      bgColor: '#96F2A4',
      color: '#000000',
    },
    {
      name: 'Sarah',
      amount: 60,
      bgColor: '#96F2A4',
      color: '#000000',
    },
    {
      name: 'Royalty',
      amount: 40,
      bgColor: '#F2E9BA',
      color: '#000000',
    },
  ],
};

export const user2Info = {
  info: {
    name: 'John',
    role: 'Client/Reseller',
    avatar: '/img/John.png',
    dotColor: '#96F2A4',
  },
  gift: [
    {
      name: 'John',
      amount: 90,
      bgColor: '#111827',
      color: '#ffffff',
    },
    {
      name: 'Sarah',
      amount: 150,
      bgColor: '#96F2A4',
      color: '#000000',
    },
    {
      name: 'Royalty',
      amount: 60,
      bgColor: '#F2E9BA',
      color: '#000000',
    },
  ],
};
export const user3Info = {
  info: {
    name: 'Jane',
    role: 'Client/Reseller',
    avatar: process.env.REACT_APP_NODE_ENV === 'production' ? '/img/Jane.png' : '/img/avatar-1.png',
    dotColor: '#96F2A4',
  },
  gift: [
    {
      name: 'Jane',
      amount: 75,
      bgColor: '#111827',
      color: '#ffffff',
    },
    {
      name: 'Sarah',
      amount: 125,
      bgColor: '#96F2A4',
      color: '#000000',
    },
    {
      name: 'Royalty',
      amount: 50,
      bgColor: '#F2E9BA',
      color: '#000000',
    },
  ],
};
export const user4Info = {
  info: {
    name: 'Tom',
    role: 'Client/Reseller',
    avatar: '/img/Tom.png',
    dotColor: '',
  },
  gift: [
    {
      name: 'Tom',
      amount: 67.5,
      bgColor: '#111827',
      color: '#ffffff',
    },
    {
      name: 'Sarah',
      amount: 112.5,
      bgColor: '#96F2A4',
      color: '#000000',
    },
    {
      name: 'Royalty',
      amount: 45,
      bgColor: '#F2E9BA',
      color: '#000000',
    },
  ],
};

export const step1 = {
  description: 'sells web design service to john for',
  amount: 200,
};
export const step2 = {
  description: 'resells service to Jane for ',
  amount: 300,
};
export const step3 = {
  description: 'resells web design service to Tom for',
  amount: 250,
};
export const step4 = {
  description: '-',
  amount: 225,
};

export const giftCardOptions = [
  {
    id: 1,
    name: '30 days',
  },
  {
    id: 2,
    name: '60 days',
  },
  {
    id: 3,
    name: '90 days',
  },
  {
    id: 4,
    name: '180 days',
  },
  {
    id: 5,
    name: '360 days',
  },
];

export const profileNumberNameData = [
  {
    count: 1,
    name: 'Items',
  },
  {
    count: 0,
    name: 'Owners',
  },
  {
    count: 0,
    name: 'Total Volume',
  },
  {
    count: 0,
    name: 'Floor Price',
  },
];

export const user1InfoListing = {
  info: {
    name: 'Sarah',
    role: 'Creator',
    avatar: '/img/avatar-1.png',
    dotColor: '#111827',
  },
  gift: [],
};
export const user2InfoListing = {
  info: {
    name: 'John',
    role: 'Client/Reseller',
    avatar: '/img/avatar-1.png',
    dotColor: '#96F2A4',
  },
  gift: [],
};
export const user3InfoListing = {
  info: {
    name: 'Jane',
    role: 'Client/Reseller',
    avatar: '/img/avatar-1.png',
    dotColor: '#96F2A4',
  },
  gift: [],
};
export const user4InfoListing = {
  info: {
    name: 'Tom',
    role: 'Client/Reseller',
    avatar: '/img/avatar-1.png',
    dotColor: '',
  },
};

export const step1Listing = {
  description: 'sells web design service to john for',
  amount: '',
};
export const step2Listing = {
  description: 'resells service to Jane for ',
  amount: '',
};
export const step3Listing = {
  description: 'resells web design service to Tom for',
  amount: '',
};
