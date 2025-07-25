import React, { createContext, useContext, useState, useEffect } from 'react';
import { analytics } from '@/utils/analytics';

interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
  preferences?: {
    savedRecommendations: string[];
    searchHistory: any[];
    emailNotifications: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  saveRecommendation: (modelIds: string[]) => void;
  removeSavedRecommendation: (modelId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock authentication service - replace with real API calls
const mockAuthService = {
  login: async (email: string, password: string): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    // Get existing user or create new
    const existingUser = localStorage.getItem(`user_${email}`);
    if (existingUser) {
      const user = JSON.parse(existingUser);
      if (user.password !== password) {
        throw new Error('Invalid credentials');
      }
      delete user.password;
      return user;
    }
    
    throw new Error('User not found');
  },
  
  signup: async (email: string, password: string, name?: string): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }
    
    // Check if user exists
    const existingUser = localStorage.getItem(`user_${email}`);
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    // Create new user
    const user: User = {
      id: `user_${Date.now()}`,
      email,
      name,
      createdAt: new Date(),
      preferences: {
        savedRecommendations: [],
        searchHistory: [],
        emailNotifications: true
      }
    };
    
    // Store user with password (in real app, this would be hashed server-side)
    localStorage.setItem(`user_${email}`, JSON.stringify({ ...user, password }));
    
    return user;
  },
  
  getCurrentUser: (): User | null => {
    const currentUserEmail = localStorage.getItem('currentUser');
    if (!currentUserEmail) return null;
    
    const userData = localStorage.getItem(`user_${currentUserEmail}`);
    if (!userData) return null;
    
    const user = JSON.parse(userData);
    delete user.password;
    return user;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const currentUser = mockAuthService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const user = await mockAuthService.login(email, password);
      setUser(user);
      localStorage.setItem('currentUser', email);
      analytics.track('user_login', 'authentication', 'success');
    } catch (error) {
      analytics.track('user_login', 'authentication', 'failed');
      throw error;
    }
  };

  const signup = async (email: string, password: string, name?: string) => {
    try {
      const user = await mockAuthService.signup(email, password, name);
      setUser(user);
      localStorage.setItem('currentUser', email);
      analytics.track('user_signup', 'authentication', 'success');
    } catch (error) {
      analytics.track('user_signup', 'authentication', 'failed');
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    analytics.track('user_logout', 'authentication');
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    
    // Update in storage
    const storedUser = localStorage.getItem(`user_${user.email}`);
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      localStorage.setItem(`user_${user.email}`, JSON.stringify({ ...userData, ...updatedUser }));
    }
  };

  const saveRecommendation = (modelIds: string[]) => {
    if (!user) return;
    
    const savedRecommendations = user.preferences?.savedRecommendations || [];
    const newRecommendations = [...new Set([...savedRecommendations, ...modelIds])];
    
    updateUser({
      preferences: {
        ...user.preferences,
        savedRecommendations: newRecommendations,
        emailNotifications: user.preferences?.emailNotifications ?? true,
        searchHistory: user.preferences?.searchHistory || []
      }
    });
    
    analytics.track('recommendation_saved', 'engagement', modelIds.join(','));
  };

  const removeSavedRecommendation = (modelId: string) => {
    if (!user) return;
    
    const savedRecommendations = user.preferences?.savedRecommendations || [];
    const filtered = savedRecommendations.filter(id => id !== modelId);
    
    updateUser({
      preferences: {
        ...user.preferences,
        savedRecommendations: filtered,
        emailNotifications: user.preferences?.emailNotifications ?? true,
        searchHistory: user.preferences?.searchHistory || []
      }
    });
    
    analytics.track('recommendation_removed', 'engagement', modelId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        updateUser,
        saveRecommendation,
        removeSavedRecommendation
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};