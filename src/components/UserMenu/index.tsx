import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginModal } from '@/components/Auth/LoginModal';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Bookmark, History, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const UserMenu: React.FC = () => {
  const { user, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  if (!user) {
    return (
      <>
        <Button onClick={() => setShowLoginModal(true)} variant="outline" size="sm">
          Sign In
        </Button>
        <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
      </>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
            {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name || 'User'}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/saved')}>
          <Bookmark className="mr-2 h-4 w-4" />
          Saved Tools
          {user.preferences?.savedRecommendations?.length ? (
            <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              {user.preferences.savedRecommendations.length}
            </span>
          ) : null}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/history')}>
          <History className="mr-2 h-4 w-4" />
          Search History
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/settings')}>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};