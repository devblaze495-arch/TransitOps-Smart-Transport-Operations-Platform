import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Car, 
  Users, 
  Route, 
  Wrench, 
  Droplet, 
  DollarSign, 
  BarChart3, 
  Sparkles, 
  Settings,
  ChevronRight,
  Menu
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface NavItem {
  label: string;
  icon: React.ElementType;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { 
    label: 'Fleet', 
    icon: Car,
    children: [
      { label: 'Vehicles', icon: Car },
      { label: 'Drivers', icon: Users },
    ]
  },
  { 
    label: 'Operations', 
    icon: Route,
    children: [
      { label: 'Trips', icon: Route },
      { label: 'Maintenance', icon: Wrench },
    ]
  },
  { 
    label: 'Finance', 
    icon: DollarSign,
    children: [
      { label: 'Fuel', icon: Droplet },
      { label: 'Expenses', icon: DollarSign },
    ]
  },
  { label: 'Reports', icon: BarChart3 },
  { label: 'AI Assistant', icon: Sparkles },
  { label: 'Settings', icon: Settings },
];

interface SidebarProps {
  isCollapsed: boolean;
  isMobile: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export function Sidebar({ isCollapsed, isMobile, isOpen, onToggle, onClose }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isHoverExpanded, setIsHoverExpanded] = useState(false);
  const isExpanded = !isCollapsed || isHoverExpanded;

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  };

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.label);

    return (
      <div key={item.label}>
        <button
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.label);
            }
          }}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
            'hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-primary/50',
            'text-text-secondary hover:text-text-primary',
            !isExpanded && !isMobile && 'justify-center px-3'
          )}
        >
          <Icon className="w-5 h-5 flex-shrink-0" />
          {(isExpanded || isMobile) && (
            <>
              <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
              {hasChildren && (
                <ChevronRight 
                  className={cn(
                    'w-4 h-4 transition-transform',
                    isExpanded && 'rotate-90'
                  )}
                />
              )}
            </>
          )}
        </button>
        
        {hasChildren && (isExpanded || isMobile) && (
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.15, ease: 'linear' }}
                className="overflow-hidden"
              >
                <div className="pl-4">
                  {item.children?.map(child => renderNavItem(child, level + 1))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-bg-elevated border-r border-border">
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Car className="w-5 h-5 text-white" />
        </div>
        {(isExpanded || isMobile) && (
          <span className="text-lg font-semibold text-text-primary">FleetPro</span>
        )}
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map(item => renderNavItem(item))}
      </nav>

      {(isExpanded || isMobile) && (
        <div className="p-4 border-t border-border">
          <button
            onClick={onToggle}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
          >
            <Menu className="w-5 h-5" />
            <span className="text-sm font-medium">Collapse</span>
          </button>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.15, ease: 'linear' }}
              className="fixed left-0 top-0 bottom-0 w-64 z-50"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <motion.div
      initial={false}
      animate={{ width: isExpanded ? 256 : 64 }}
      transition={{ duration: 0.15, ease: 'linear' }}
      className="h-full flex-shrink-0"
      onMouseEnter={() => isCollapsed && !isMobile && setIsHoverExpanded(true)}
      onMouseLeave={() => setIsHoverExpanded(false)}
    >
      {sidebarContent}
    </motion.div>
  );
}
