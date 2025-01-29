import {
  BookTypeIcon,
  ClipboardListIcon,
  FileTextIcon,
  Grid2X2Icon,
  MessageSquareQuoteIcon,
  ShoppingBagIcon,
  ShoppingBasketIcon,
  StoreIcon,
  UsersRoundIcon,
} from 'lucide-react';

export const mainNavigation = [
  {
    title: 'home.title',
    href: '/',
    description: 'home.description',
  },
  {
    title: 'eshop.title',
    description: 'eshop.description',
    items: [
      {
        title: 'eshop.stores',
        href: '/eshop',
      },
      {
        title: 'eshop.products',
        href: '/eshop/products',
      },
    ],
  },
  {
    title: 'kromka.title',
    description: 'kromka.description',
    items: [
      {
        title: 'kromka.about',
        href: '/about',
      },
      {
        title: 'kromka.contact',
        href: '/contacts',
      },
      {
        title: 'kromka.support',
        href: '/support',
      },
    ],
  },
];

export const adminSidebarNavigation = [
  {
    title: 'dashboard',
    href: '/',
    icon: Grid2X2Icon,
  },
  {
    title: 'eshop.title',
    href: '/shop',
    icon: ShoppingBasketIcon,
    isActive: true,
    items: [
      {
        title: 'eshop.stores',
        href: '/stores',
        icon: StoreIcon,
      },
      {
        title: 'eshop.products',
        href: '/products',
        icon: ShoppingBagIcon,
      },
      {
        title: 'eshop.orders',
        href: '/orders',
        icon: ClipboardListIcon,
      },
    ],
  },
  {
    title: 'blog.title',
    href: '/blog',
    icon: BookTypeIcon,
    isActive: false,
    items: [
      {
        title: 'blog.posts',
        href: '/posts',
        icon: FileTextIcon,
      },
      {
        title: 'blog.comments',
        href: '/comments',
        icon: MessageSquareQuoteIcon,
      },
    ],
  },
  {
    title: 'users.title',
    href: '/users',
    icon: UsersRoundIcon,
    // isActive: false,
    // items: [
    //   {
    //     title: 'users.employees',
    //     href: '/employees',
    //     icon: ContactRoundIcon,
    //   },
    //   {
    //     title: 'users.customers',
    //     href: '/customers',
    //     icon: UserRoundSearchIcon,
    //   },
    // ],
  },
];
