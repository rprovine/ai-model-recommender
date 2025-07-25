import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, User, Mail, Calendar, Bookmark, History } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = React.useState(false);
  const [name, setName] = React.useState(user?.name || '');

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleSave = () => {
    updateUser({ name });
    setIsEditing(false);
  };

  const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Profile
          </h1>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Info */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Manage your account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold">
                  {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-lg font-semibold">{user.name || 'AI Explorer'}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                    />
                  ) : (
                    <p className="text-sm">{user.name || 'Not set'}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <p className="text-sm">{user.email}</p>
                </div>

                <div className="space-y-2">
                  <Label>Member Since</Label>
                  <p className="text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {memberSince}
                  </p>
                </div>

                <div className="pt-4">
                  {isEditing ? (
                    <div className="flex gap-2">
                      <Button onClick={handleSave}>Save Changes</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link to="/saved">
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Bookmark className="w-5 h-5 text-primary" />
                      <span>Saved Tools</span>
                    </div>
                    <span className="text-2xl font-bold">
                      {user.preferences?.savedRecommendations?.length || 0}
                    </span>
                  </div>
                </Link>

                <Link to="/history">
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <History className="w-5 h-5 text-primary" />
                      <span>Searches</span>
                    </div>
                    <span className="text-2xl font-bold">
                      {user.preferences?.searchHistory?.length || 0}
                    </span>
                  </div>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="/" className="block">
                  <Button className="w-full" variant="outline">
                    Find New Tools
                  </Button>
                </Link>
                <Link to="/tools" className="block">
                  <Button className="w-full" variant="outline">
                    Browse All Tools
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};