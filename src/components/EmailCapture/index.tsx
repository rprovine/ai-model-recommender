import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';

interface EmailCaptureProps {
  title?: string;
  description?: string;
  buttonText?: string;
  source: 'results' | 'newsletter' | 'save';
  onSuccess?: (email: string) => void;
}

export const EmailCapture: React.FC<EmailCaptureProps> = ({
  title = 'Get AI Tool Updates',
  description = 'Weekly insights on new AI tools and exclusive deals',
  buttonText = 'Subscribe',
  source,
  onSuccess
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email');
      setStatus('error');
      return;
    }

    setStatus('loading');
    
    try {
      // Store email in localStorage for now (replace with API call)
      const emails = JSON.parse(localStorage.getItem('ai-recommender-emails') || '[]');
      if (!emails.includes(email)) {
        emails.push(email);
        localStorage.setItem('ai-recommender-emails', JSON.stringify(emails));
      }
      
      // Track the signup source
      const signups = JSON.parse(localStorage.getItem('ai-recommender-signups') || '{}');
      signups[source] = (signups[source] || 0) + 1;
      localStorage.setItem('ai-recommender-signups', JSON.stringify(signups));
      
      setStatus('success');
      if (onSuccess) {
        onSuccess(email);
      }
      
      // Reset after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setEmail('');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="flex items-center justify-center py-6">
          <div className="text-center space-y-2">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
            <p className="text-green-800 font-medium">Success! Check your email for confirmation.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Mail className="w-6 h-6 text-primary" />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setStatus('idle');
                setErrorMessage('');
              }}
              className={status === 'error' ? 'border-red-500' : ''}
              disabled={status === 'loading'}
            />
            {status === 'error' && (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Subscribing...
              </>
            ) : (
              buttonText
            )}
          </Button>
          <p className="text-xs text-center text-gray-500">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};