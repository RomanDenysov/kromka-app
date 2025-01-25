'use client';

import { ChevronRightIcon, MenuIcon, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet';
import { mainNavigation } from '~/config/navigation';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="[&_svg]:size-6"
        >
          {isOpen ? <X size={24} /> : <MenuIcon size={24} className="" />}
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>MENU</SheetTitle>
          <SheetDescription>TEST</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col items-start justify-start gap-4">
          {mainNavigation.map((item) => (
            <div key={item.title} className="flex flex-col gap-3">
              {item.href ? (
                <Link href={item.href}>
                  <span className="text-lg">{item.title}</span>
                </Link>
              ) : (
                <p className="text-lg">{item.title}</p>
              )}
              {item.items?.map((subItem) => (
                <Link
                  href={subItem.href}
                  key={subItem.title}
                  className="flex items-center justify-between"
                >
                  <span className="text-muted-foreground">{subItem.title}</span>
                  <ChevronRightIcon className="size-4 stroke-1" />
                </Link>
              ))}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
