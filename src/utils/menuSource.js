export default {
  navItems: [
    {
      path: 'register',
      text: '輸入序號',
      requestAuth: true,
    },
    {
      path: 'serial-number',
      text: '我的序號',
      requestAuth: true,
      children: [
        {
          page: 'list',
          text: '登錄序號明細',
        },
        {
          page: 'exchange',
          text: '兌換紀錄',
        },
      ],
    },
    {
      path: 'exchange',
      text: '贈品兌換',
      requestAuth: true,
    },
    {
      path: 'winning',
      text: '抽獎得獎名單',
    },
    {
      path: 'activity',
      text: '活動辦法',
    },
    {
      path: 'where-to-buy',
      text: '購買通路',
    },
  ],
  fansItems: [
    {
      path: 'https://www.facebook.com/calpis.tw',
      name: 'fb',
    },
    {
      path: 'https://www.instagram.com/calpistw/',
      name: 'ig',
    },
    {
      path: 'https://asahisoftdrinks.com.tw/calpis',
      name: 'official-website',
    },
  ],
};
