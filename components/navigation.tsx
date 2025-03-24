"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Github, Twitter, Home, AlignRight } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon?: React.ElementType;
  external?: boolean;
}

const routes: NavItem[] = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/skills",
    label: "Skills",
  },
  {
    href: "https://qiita.com/seino_914",
    label: "Blog",
    external: true,
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

const socialLinks: NavItem[] = [
  {
    href: "https://x.com/seino914",
    label: "X (Twitter)",
    icon: Twitter,
    external: true,
  },
  {
    href: "https://github.com/seino914",
    label: "GitHub",
    icon: Github,
    external: true,
  },
];

interface NavLinkProps extends NavItem {
  className?: string;
  onClick?: () => void;
}

const NavLink = ({
  href,
  label,
  external,
  className,
  onClick,
}: NavLinkProps) => {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {label}
    </Link>
  );
};

export function Navigation() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  const handleLinkClick = React.useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="container flex h-14 items-center justify-between">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="px-2 text-base hover:bg-purple-500/10 focus-visible:bg-purple-500/10 transition-colors lg:hidden"
            >
              <AlignRight className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-0">
            <div className="p-6 space-y-6">
              <div className="flex flex-col space-y-3">
                {routes.map((route) => (
                  <NavLink
                    key={route.href}
                    {...route}
                    onClick={handleLinkClick}
                    className={cn(
                      "text-base font-medium transition-colors hover:text-primary p-2 rounded-md hover:bg-purple-500/10",
                      pathname === route.href && !route.external
                        ? "text-purple-500"
                        : "text-muted-foreground"
                    )}
                  />
                ))}
              </div>
              <div className="flex gap-4 pt-4 border-t">
                {socialLinks.map((link) => {
                  const Icon = link.icon!;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-muted-foreground hover:text-primary transition-colors hover:bg-purple-500/10 rounded-md"
                    >
                      <Icon className="h-5 w-5" />
                      <span className="sr-only">{link.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="hidden lg:flex flex-1">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {routes.map((route) => (
              <NavLink
                key={route.href}
                {...route}
                className={cn(
                  "transition-colors hover:text-primary",
                  pathname === route.href && !route.external
                    ? "text-purple-500"
                    : "text-muted-foreground"
                )}
              />
            ))}
          </nav>
          <div className="flex items-center space-x-4 ml-6 border-l border-border pl-6">
            {socialLinks.map((link) => {
              const Icon = link.icon!;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{link.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}
