export const sidebarData = [
  {
    heading: 'Akun',
    links: [
      // {
      //   name: 'My Profile',
      //   link: '/profile',
      // },
      {
        name: 'Alamat',
        link: '/profile/address',
      },
      {
        name: 'Pembayaran',
        link: '/profile/payment',
      },
      {
        name: 'Keamanan Akun',
        link: '/profile/security',
      },
    ],
  },
  {
    heading: 'Order',
    links: [
      {
        name: 'Semua Order',
        link: '/profile/orders',
        filter: '',
      },
      {
        name: 'Sudah dibayar',
        link: '/profile/orders',
        filter: 'paid',
      },
      {
        name: 'Belum dibayar',
        link: '/profile/orders',
        filter: 'unpaid',
      },

      {
        name: 'Diproses',
        link: '/profile/orders',
        filter: 'Processing',
      },
      {
        name: 'Belum diproses',
        link: '/profile/orders',
        filter: 'Not Processed',
      },
      // {
      //   name: 'Dispatched Orders',
      //   link: '/profile/orders',
      //   filter: 'Dispatched',
      // },
      // {
      //   name: 'Delievered Orders',
      //   link: '/profile/orders',
      //   filter: 'Completed',
      // },
      {
        name: 'Dibatalkan',
        link: '/profile/orders',
        filter: 'Cancelled',
      },
    ],
  },
  // {
  //   heading: 'My Lists',
  //   links: [
  //     {
  //       name: 'Whishlist',
  //       link: '/profile/wishlist',
  //     },
  //     {
  //       name: 'Recently Viewed',
  //       link: '/profile/recent',
  //     },
  //   ],
  // },
  // {
  //   heading: 'Customer Service',
  //   links: [
  //     {
  //       name: 'My Message',
  //       link: '/profile/messages',
  //     },
  //     {
  //       name: 'Service Records',
  //       link: '/profile/services',
  //     },
  //   ],
  // },
  // {
  //   heading: 'Other Services',
  //   links: [
  //     {
  //       name: 'Survey Center',
  //       link: '',
  //     },
  //     {
  //       name: 'Contact Preferences',
  //       link: '',
  //     },
  //   ],
  // },
  // {
  //   heading: 'Logout',
  //   link: [],
  // },
];

export const ordersLinks = [
  {
    name: 'Semua order',
    filter: '',
  },
  {
    name: 'Sudah dibayar',
    filter: 'paid',
  },
  {
    name: 'Belum dibayar',
    filter: 'unpaid',
  },
  {
    name: 'Diproses',
    filter: 'Processing',
  },
  {
    name: 'Belum diproses',
    filter: 'Not Processed',
  },
  // {
  //   name: 'Dispatched Orders',
  //   filter: 'Dispatched',
  // },
  // {
  //   name: 'Delievered Orders',
  //   filter: 'Delievered',
  // },
  {
    name: 'Dibatalkan',
    filter: 'Cancelled',
  },
];
