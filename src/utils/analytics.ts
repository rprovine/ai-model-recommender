// Simple analytics tracking utility
// In production, replace with Google Analytics, Plausible, or similar

interface AnalyticsEvent {
  event: string;
  category: string;
  label?: string;
  value?: number;
  timestamp: number;
}

class Analytics {
  private events: AnalyticsEvent[] = [];
  
  constructor() {
    // Load existing events from localStorage
    const stored = localStorage.getItem('ai-recommender-analytics');
    if (stored) {
      this.events = JSON.parse(stored);
    }
  }
  
  track(event: string, category: string, label?: string, value?: number) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      category,
      label,
      value,
      timestamp: Date.now()
    };
    
    this.events.push(analyticsEvent);
    
    // Store in localStorage (in production, send to analytics service)
    localStorage.setItem('ai-recommender-analytics', JSON.stringify(this.events));
    
    // Log for development
    console.log('Analytics Event:', analyticsEvent);
    
    // In production, send to analytics service:
    // if (window.gtag) {
    //   window.gtag('event', event, {
    //     event_category: category,
    //     event_label: label,
    //     value: value
    //   });
    // }
  }
  
  // Track page views
  pageView(path: string) {
    this.track('page_view', 'navigation', path);
  }
  
  // Track questionnaire progress
  questionnaireStep(step: number, total: number) {
    this.track('questionnaire_progress', 'engagement', `step_${step}_of_${total}`, step);
  }
  
  // Track questionnaire completion
  questionnaireComplete(mode: 'basic' | 'comprehensive') {
    this.track('questionnaire_complete', 'conversion', mode);
  }
  
  // Track recommendation clicks
  recommendationClick(toolName: string, position: number) {
    this.track('recommendation_click', 'engagement', toolName, position);
  }
  
  // Track email signups
  emailSignup(source: string) {
    this.track('email_signup', 'conversion', source);
  }
  
  // Track shares
  share(method: string, itemCount: number) {
    this.track('share', 'engagement', method, itemCount);
  }
  
  // Track exports
  export(format: string, itemCount: number) {
    this.track('export', 'engagement', format, itemCount);
  }
  
  // Get analytics summary
  getSummary() {
    const summary = {
      totalEvents: this.events.length,
      pageViews: this.events.filter(e => e.event === 'page_view').length,
      emailSignups: this.events.filter(e => e.event === 'email_signup').length,
      questionnairesCompleted: this.events.filter(e => e.event === 'questionnaire_complete').length,
      recommendationClicks: this.events.filter(e => e.event === 'recommendation_click').length,
      shares: this.events.filter(e => e.event === 'share').length,
      lastEvent: this.events[this.events.length - 1]
    };
    
    return summary;
  }
}

// Create singleton instance
export const analytics = new Analytics();

// Add Google Analytics script loader (for production)
export const loadGoogleAnalytics = (measurementId: string) => {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
  
  const configScript = document.createElement('script');
  configScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}');
  `;
  document.head.appendChild(configScript);
};