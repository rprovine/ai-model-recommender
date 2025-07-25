import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Bell, Shield, Trash2, Mail } from 'lucide-react';

export const Settings: React.FC = () => {
  const { user, updateUser, logout } = useAuth();
  const [emailNotifications, setEmailNotifications] = React.useState(
    user?.preferences?.emailNotifications ?? true
  );

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleEmailNotificationsChange = (checked: boolean) => {
    setEmailNotifications(checked);
    updateUser({
      preferences: {
        ...user.preferences,
        emailNotifications: checked,
        savedRecommendations: user.preferences?.savedRecommendations || [],
        searchHistory: user.preferences?.searchHistory || []
      }
    });
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // In a real app, this would call an API to delete the account
      localStorage.removeItem(`user_${user.email}`);
      logout();
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your search history?')) {
      updateUser({
        preferences: {
          ...user.preferences,
          searchHistory: [],
          emailNotifications: user.preferences?.emailNotifications ?? true,
          savedRecommendations: user.preferences?.savedRecommendations || []
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Settings
          </h1>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
              <CardDescription>
                Manage how you receive updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="email-notifications" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates about new AI tools and price changes
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={handleEmailNotificationsChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy
              </CardTitle>
              <CardDescription>
                Manage your data and privacy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={handleClearHistory}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Search History
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Remove all your search history. This cannot be undone.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Account */}
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Manage your account settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>

              <div className="pt-4 border-t">
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  className="w-full"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  This will permanently delete your account and all associated data
                </p>
              </div>
            </CardContent>
          </Card>

          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>AI Model Recommender v1.0.0</p>
              <p>Built with ❤️ by LeniLani Consulting</p>
              <div className="flex gap-4 pt-2">
                <a href="#" className="hover:text-primary">Terms of Service</a>
                <a href="#" className="hover:text-primary">Privacy Policy</a>
                <a href="#" className="hover:text-primary">Contact</a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};