"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/src/components/ui/sheet";
import { FaGithub, FaXTwitter, FaBars } from "react-icons/fa6";
import { socialLinks as socialLinksData } from "@/src/lib/constants";

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
    href: "https://qiita.com/tonosaki914",
    label: "Qiita",
    external: true,
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

const socialLinks: NavItem[] = socialLinksData.map((link) => {
  const iconMap: Record<string, React.ElementType> = {
    "X (Twitter)": FaXTwitter,
    GitHub: FaGithub,
  };
  return {
    ...link,
    icon: iconMap[link.label],
    external: true,
  };
});

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
        {/* モバイルメニュー */}
        <div className="flex lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="px-2 text-base hover:bg-purple-500/10 focus-visible:bg-purple-500/10 transition-colors"
              >
                <FaBars className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[150px] p-0">
              <SheetTitle className="sr-only">メニュー</SheetTitle>
              <div className="h-full flex flex-col justify-center">
                <div className="flex flex-col space-y-6">
                  {routes.map((route) => (
                    <NavLink
                      key={route.href}
                      {...route}
                      onClick={handleLinkClick}
                      className={cn(
                        "text-sm transition-colors hover:text-primary text-center",
                        pathname === route.href && !route.external
                          ? "text-purple-500"
                          : "text-muted-foreground"
                      )}
                    />
                  ))}
                </div>

                <div className="flex flex-col items-center space-y-4 mt-6">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    if (!Icon) return null;
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
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
        <div className="hidden lg:flex flex-1 justify-end items-center">
          <div className="flex items-center space-x-6">
            {routes.map((route) => (
              <NavLink
                key={route.href}
                {...route}
                className={cn(
                  "transition-colors hover:text-primary text-sm font-medium",
                  pathname === route.href && !route.external
                    ? "text-purple-500"
                    : "text-muted-foreground"
                )}
              />
            ))}
          </div>

          {/* 区切り線 */}
          <div className="h-4 w-px bg-border mx-4" />

          {/* ソーシャルリンク */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              if (!Icon) return null;
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
