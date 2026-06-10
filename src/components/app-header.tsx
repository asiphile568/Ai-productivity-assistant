import { Bell, Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "./theme-toggle";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur-md sm:px-6">
      <SidebarTrigger />
      <div className="hidden text-sm font-semibold tracking-tight sm:block">
        AI Workplace Productivity Assistant
      </div>
      <div className="relative ml-auto hidden w-64 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search tools, history..." className="pl-9" />
      </div>
      <ThemeToggle />
      <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
        <Bell className="h-5 w-5" />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
      </Button>
      <Avatar className="h-9 w-9 ring-2 ring-border">
        <AvatarFallback className="bg-primary text-primary-foreground text-sm">JD</AvatarFallback>
      </Avatar>
    </header>
  );
}