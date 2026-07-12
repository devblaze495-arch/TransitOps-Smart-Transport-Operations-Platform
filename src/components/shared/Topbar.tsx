import { Search, Bell, User, Menu } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TopbarProps {
  onMenuClick: () => void;
  isMobile: boolean;
}

export function Topbar({ onMenuClick, isMobile }: TopbarProps) {
  return (
    <header className="h-16 bg-bg-elevated border-b border-border flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-4">
        {isMobile && (
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-surface-hover transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5 text-text-secondary" />
          </button>
        )}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            placeholder="Search..."
            className={cn(
              'w-64 lg:w-96 pl-10 pr-4 py-2 rounded-lg',
              'bg-surface border border-border',
              'text-text-primary placeholder:text-text-secondary',
              'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
              'transition-colors',
              isMobile && 'hidden'
            )}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="p-2 rounded-lg hover:bg-surface-hover transition-colors relative"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-text-secondary" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
        </button>

        <div className="relative group">
          <button
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-hover transition-colors"
            aria-label="Profile"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </button>
          
          {/* Profile Dropdown Placeholder */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
            <div className="p-3 border-b border-border">
              <p className="text-sm font-medium text-text-primary">John Doe</p>
              <p className="text-xs text-text-secondary">john@example.com</p>
            </div>
            <div className="p-1">
              <button className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:bg-surface-hover rounded-md transition-colors">
                Profile
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:bg-surface-hover rounded-md transition-colors">
                Settings
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-danger hover:bg-surface-hover rounded-md transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
