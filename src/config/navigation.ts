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
} from 'lucide-react'

export const mainNavigation = [
  {
    title: 'Domov',
    href: '/',
    description: '',
  },
  {
    title: 'Eshop',
    description: '',
    items: [
      {
        title: 'Eshop',
        href: '/eshop',
      },
      {
        title: 'Predajne',
        href: '/stores',
      },
    ],
  },
  {
    title: 'Kromka',
    description: '',
    items: [
      {
        title: 'O nás',
        href: '/about',
      },
      {
        title: 'Kontakt',
        href: '/contact',
      },
      {
        title: 'Podpora',
        href: '/support',
      },
    ],
  },
]

export const adminSidebarNavigation = [
  {
    title: 'Dashboard',
    href: '/',
    icon: Grid2X2Icon,
  },
  {
    title: 'E-Shop',
    href: '/shop',
    icon: ShoppingBasketIcon,
    isActive: true,
    items: [
      {
        title: 'Stores',
        href: '/stores',
        icon: StoreIcon,
      },
      {
        title: 'Products',
        href: '/products',
        icon: ShoppingBagIcon,
      },
      {
        title: 'Orders',
        href: '/orders',
        icon: ClipboardListIcon,
      },
    ],
  },
  {
    title: 'Blog',
    href: '/blog',
    icon: BookTypeIcon,
    isActive: false,
    items: [
      {
        title: 'Posts',
        href: '/posts',
        icon: FileTextIcon,
      },
      {
        title: 'Comments',
        href: '/comments',
        icon: MessageSquareQuoteIcon,
      },
    ],
  },
  {
    title: 'Users',
    href: '/users',
    icon: UsersRoundIcon,
    // isActive: false,
    // items: [
    //   {
    //     title: 'Employees',
    //     href: '/employees',
    //     icon: ContactRoundIcon,
    //   },
    //   {
    //     title: 'Customers',
    //     href: '/customers',
    //     icon: UserRoundSearchIcon,
    //   },
    // ],
  },
]
