"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";
import { cn, smoothScrollTo } from "@/src/lib/utils";
import { AlignRight, Github, Twitter, LucideIcon } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon?: LucideIcon;
  external?: boolean;
}

const routes: NavItem[] = [
  {
    href: "#top",
    label: "Top",
  },
  {
    href: "#about",
    label: "About",
  },
  {
    href: "#skills",
    label: "Skills",
  },
  {
    href: "https://qiita.com/seino_914",
    label: "Blog",
    external: true,
  },
  {
    href: "#contact",
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
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick();
    }

    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.replace("#", "");
      smoothScrollTo(id);
    }
  };

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
    <Link href={href} className={className} onClick={handleClick}>
      {label}
    </Link>
  );
};

export function Navigation() {
  const [open, setOpen] = React.useState(false);

  const handleLinkClick = React.useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 items-center justify-between">
        {/* モバイルメニュー */}
        <div className="flex lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="px-2 text-base transition-colors hover:bg-purple-500/10 focus-visible:bg-purple-500/10"
              >
                <AlignRight className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[150px] p-0">
              <div className="flex h-full flex-col justify-center">
                <div className="flex flex-col space-y-6">
                  {routes.map((route) => (
                    <NavLink
                      key={route.href}
                      {...route}
                      onClick={handleLinkClick}
                      className={cn(
                        "text-center text-sm text-muted-foreground transition-colors hover:text-primary",
                      )}
                    />
                  ))}
                </div>

                <div className="mt-6 flex flex-col items-center space-y-4">
                  {socialLinks.map((link) => {
                    const Icon = link.icon!;
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-primary"
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
        </div>

        {/* デスクトップナビゲーション */}
        <div className="hidden flex-1 items-center justify-end lg:flex">
          <div className="flex items-center space-x-6">
            {routes.map((route) => (
              <NavLink
                key={route.href}
                {...route}
                className={cn(
                  "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
                )}
              />
            ))}
          </div>

          {/* 区切り線 */}
          <div className="mx-4 h-4 w-px bg-border" />

          {/* ソーシャルリンク */}
          <div className="flex items-center space-x-4">
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
