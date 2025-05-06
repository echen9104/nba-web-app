'use client';

import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Home } from 'lucide-react';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

export default function Navbar() {
  return (
    <nav className="w-full border-b">
      <div className="px-16 flex h-16 items-center justify-between">
        {/* Left side - Logo and Brand */}
        <div className="flex items-center gap-2">
          <Home className="h-6 w-6" />
          <Link href="/" className="text-xl font-bold">
            DataSwish
          </Link>
        </div>

        {/* Right side - Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/players" className={navigationMenuTriggerStyle()}>
                Players
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/teams" className={navigationMenuTriggerStyle()}>
                Teams
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/login" className={navigationMenuTriggerStyle()}>
                Log in
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/signup" className={navigationMenuTriggerStyle()}>
                Sign up
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
