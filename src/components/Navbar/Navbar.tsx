'use client';

import { Home } from 'lucide-react';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  return (
    <nav className="w-full border-b">
      <div className="container flex h-16 items-center justify-between">
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
              <Link href="/" passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/players" passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Players
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/teams" passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Teams
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/login" passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Log in
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/signup" passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Sign up
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
