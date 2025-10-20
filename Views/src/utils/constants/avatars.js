const avatarsArray = [
  { id: 0, url: '/avatar/account.png' },
  { id: 1, url: '/avatar/avatar1.png' },
  { id: 2, url: '/avatar/avatar2.png' },
  { id: 3, url: '/avatar/avatar3.png' },
  { id: 4, url: '/avatar/avatar4.png' },
  { id: 5, url: '/avatar/avatar5.png' },
  { id: 6, url: '/avatar/avatar6.png' },
  { id: 7, url: '/avatar/avatar7.png' },
  { id: 8, url: '/avatar/avatar8.png' },
  { id: 9, url: '/avatar/avatar9.png' },
  { id: 10, url: '/avatar/avatar10.png' },
];

export const avatars = new Map(avatarsArray.map(a => [a.id, a.url]));
