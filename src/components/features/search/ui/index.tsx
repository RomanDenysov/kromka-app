'use client';

import { BookIcon, SearchIcon, ShoppingBagIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Button } from '~/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/ui/command';
import { DialogTitle } from '~/components/ui/dialog';
import { Input } from '~/components/ui/input';

const Search = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations('search');
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener('keydown', down);
    return () => window.removeEventListener('keydown', down);
  }, []);

  return (
    <div className="relative w-full max-w-sm">
      <Input
        type="search"
        placeholder={t('placeholder')}
        className="w-full"
        onClick={() => setOpen(true)}
      />
      <Button
        onClick={() => setOpen(true)}
        variant="ghost"
        size="icon"
        className="absolute top-0 right-0"
      >
        <SearchIcon size={20} />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">{t('placeholder')}</DialogTitle>
        <CommandInput placeholder={t('callToAction')} />
        <CommandList>
          <CommandEmpty>{t('empty')}</CommandEmpty>
          <CommandGroup heading={t('products')}>
            <CommandItem>
              <ShoppingBagIcon className=" h-4 w-4 text-muted-foreground" />
              <span>Croissant</span>
              <span className="ml-auto font-mono text-xs">100€</span>
            </CommandItem>
            <CommandItem>
              <ShoppingBagIcon className=" h-4 w-4 text-muted-foreground" />
              <span>Product 2</span>
              <span className="ml-auto font-mono text-xs">100€</span>
            </CommandItem>
            <CommandItem>
              <ShoppingBagIcon className=" h-4 w-4 text-muted-foreground" />
              <span>Product 3</span>
              <span className="ml-auto font-mono text-xs">100€</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading={t('posts')}>
            <CommandItem>
              <BookIcon className=" h-4 w-4 text-muted-foreground" />
              <span>Post 1</span>
              <span className="ml-auto font-mono text-xs">100€</span>
            </CommandItem>
            <CommandItem>
              <BookIcon className=" h-4 w-4 text-muted-foreground" />
              <span>Post 2</span>
              <span className="ml-auto font-mono text-xs">100€</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export { Search };
