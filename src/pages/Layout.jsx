
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Home, 
  CheckSquare, 
  BookOpen, 
  Calendar, 
  BarChart3, 
  Settings,
  Bell,
  User
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: Home,
  },
  {
    title: "My Tasks",
    url: createPageUrl("Tasks"),
    icon: CheckSquare,
  },
  {
    title: "Resources",
    url: createPageUrl("Resources"),
    icon: BookOpen,
  },
  {
    title: "Timeline",
    url: createPageUrl("Timeline"),
    icon: Calendar,
  },
  {
    title: "Admin",
    url: createPageUrl("Admin"),
    icon: BarChart3,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --neumorphic-bg: #f0f4f8;
          --neumorphic-surface: #ffffff;
          --neumorphic-shadow-light: #ffffff;
          --neumorphic-shadow-dark: rgba(163, 177, 198, 0.6);
          --neumorphic-accent: #667eea;
          --neumorphic-accent-soft: #f093fb;
          --neumorphic-text: #2d3748;
          --neumorphic-text-muted: #718096;
        }
        
        .neumorphic-container {
          background: var(--neumorphic-bg);
          min-height: 100vh;
        }
        
        .neumorphic-card {
          background: var(--neumorphic-surface);
          border-radius: 20px;
          box-shadow: 
            9px 9px 18px var(--neumorphic-shadow-dark),
            -9px -9px 18px var(--neumorphic-shadow-light);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
        
        .neumorphic-pressed {
          box-shadow: 
            inset 4px 4px 8px var(--neumorphic-shadow-dark),
            inset -4px -4px 8px var(--neumorphic-shadow-light);
        }
        
        .neumorphic-button {
          background: var(--neumorphic-surface);
          border-radius: 16px;
          box-shadow: 
            6px 6px 12px var(--neumorphic-shadow-dark),
            -6px -6px 12px var(--neumorphic-shadow-light);
          border: none;
          transition: all 0.2s ease;
        }
        
        .neumorphic-button:hover {
          transform: translateY(-1px);
          box-shadow: 
            8px 8px 16px var(--neumorphic-shadow-dark),
            -8px -8px 16px var(--neumorphic-shadow-light);
        }
        
        .neumorphic-button:active {
          transform: translateY(0);
          box-shadow: 
            inset 3px 3px 6px var(--neumorphic-shadow-dark),
            inset -3px -3px 6px var(--neumorphic-shadow-light);
        }
        
        .progress-ring {
          background: conic-gradient(
            from 0deg,
            var(--neumorphic-accent) 0%,
            var(--neumorphic-accent-soft) 50%,
            #e2e8f0 50%
          );
          border-radius: 50%;
          padding: 4px;
        }
        
        .sidebar-active {
          background: linear-gradient(135deg, var(--neumorphic-accent), var(--neumorphic-accent-soft));
          color: white;
          border-radius: 16px;
          box-shadow: 
            4px 4px 8px var(--neumorphic-shadow-dark),
            -4px -4px 8px var(--neumorphic-shadow-light);
        }
      `}</style>
      
      <div className="neumorphic-container flex w-full">
        <Sidebar className="border-none bg-transparent">
          <SidebarHeader className="p-6">
            <div className="neumorphic-card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">O</span>
                </div>
                <div>
                  <h2 className="font-bold text-gray-800">OnboardHub</h2>
                  <p className="text-xs text-gray-500">Welcome aboard!</p>
                </div>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="px-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2 py-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`mb-2 rounded-2xl transition-all duration-300 ${
                          location.pathname === item.url ? 'sidebar-active text-white' : 'hover:bg-white/50'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2 py-2">
                Quick Stats
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="neumorphic-card p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Progress</span>
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      42%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tasks Left</span>
                    <span className="font-semibold text-gray-800">8</span>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4">
            <div className="neumorphic-card p-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    U
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">New Hire</p>
                  <p className="text-xs text-gray-500 truncate">Starting soon!</p>
                </div>
                <Bell className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col bg-transparent">
          <header className="neumorphic-card m-4 mb-0 p-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="neumorphic-button p-2" />
              <h1 className="text-xl font-semibold text-gray-800">OnboardHub</h1>
            </div>
          </header>

          <div className="flex-1 p-4">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
