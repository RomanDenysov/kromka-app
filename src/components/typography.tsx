import { type VariantProps, cva } from 'class-variance-authority';
import React, { type JSX, type ReactNode } from 'react';
import { cn } from '~/lib/utils/cn';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-xl sm:text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      span: 'inline',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
});

type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'p'
  | 'lead'
  | 'large'
  | 'small'
  | 'span';

const variantElements: Record<TypographyVariant, keyof JSX.IntrinsicElements> =
  {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    p: 'p',
    lead: 'p',
    large: 'div',
    small: 'small',
    span: 'span',
  };

interface TypographyProps extends VariantProps<typeof typographyVariants> {
  children: ReactNode;
  className?: string;
}

export function Typography({
  variant = 'p',
  children,
  className,
}: TypographyProps) {
  const Element = variantElements[
    variant as TypographyVariant
  ] as keyof JSX.IntrinsicElements;
  return React.createElement(
    Element,
    { className: cn(typographyVariants({ variant, className })) },
    children
  );
}
