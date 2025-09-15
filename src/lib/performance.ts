// Performance optimization utilities for production
import { lazy, ComponentType } from 'react';

// Global performance API extension
declare global {
  interface Window {
    gtag?: (command: string, action: string, parameters?: Record<string, any>) => void;
  }
}

// Performance monitoring
export const performanceMonitor = {
  // Measure component render time
  measureRender: (componentName: string) => {
    const start = window.performance.now();
    return () => {
      const end = window.performance.now();
      if (process.env.NODE_ENV === 'development') {
        console.log(`🚀 ${componentName} rendered in ${(end - start).toFixed(2)}ms`);
      }
    };
  },

  // Measure API call performance
  measureAPI: (apiName: string) => {
    const start = window.performance.now();
    return (success: boolean = true) => {
      const end = window.performance.now();
      const duration = end - start;
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`🌐 API ${apiName} ${success ? 'completed' : 'failed'} in ${duration.toFixed(2)}ms`);
      }
      
      // Report to analytics in production
      if (process.env.NODE_ENV === 'production' && window.gtag) {
        window.gtag('event', 'api_performance', {
          api_name: apiName,
          duration_ms: Math.round(duration),
          success,
        });
      }
    };
  },

  // Monitor Core Web Vitals
  measureWebVitals: () => {
    // Largest Contentful Paint
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`📊 LCP: ${lastEntry.startTime.toFixed(2)}ms`);
      }
      
      // Report to analytics
      if (window.gtag) {
        window.gtag('event', 'web_vital', {
          metric_name: 'LCP',
          value: Math.round(lastEntry.startTime),
        });
      }
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (process.env.NODE_ENV === 'development') {
          console.log(`⚡ FID: ${(entry as any).processingStart - entry.startTime}ms`);
        }
        
        if (window.gtag) {
          window.gtag('event', 'web_vital', {
            metric_name: 'FID',
            value: Math.round((entry as any).processingStart - entry.startTime),
          });
        }
      }
    });
    
    fidObserver.observe({ entryTypes: ['first-input'] });
  },
};

// Lazy loading utilities with error boundaries
export const lazyLoad = {
  // Enhanced lazy loading with retry mechanism
  withRetry: <T extends ComponentType<any>>(
    componentImport: () => Promise<{ default: T }>,
    retries: number = 3
  ) => {
    return lazy(() => {
      const attemptLoad = async (attempt: number = 1): Promise<{ default: T }> => {
        try {
          return await componentImport();
        } catch (error) {
          if (attempt < retries) {
            console.warn(`Failed to load component, retrying (${attempt}/${retries})...`);
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            return attemptLoad(attempt + 1);
          }
          throw error;
        }
      };
      
      return attemptLoad();
    });
  },

  // Preload components on hover/focus
  preload: (componentImport: () => Promise<any>) => {
    let preloaded = false;
    
    return {
      onMouseEnter: () => {
        if (!preloaded) {
          preloaded = true;
          componentImport().catch(() => {
            preloaded = false; // Allow retry
          });
        }
      },
      onFocus: () => {
        if (!preloaded) {
          preloaded = true;
          componentImport().catch(() => {
            preloaded = false; // Allow retry
          });
        }
      },
    };
  },
};

// Bundle analysis utilities
export const bundleAnalysis = {
  // Analyze bundle size in development
  analyzeBundles: () => {
    if (process.env.NODE_ENV === 'development') {
      console.group('📦 Bundle Analysis');
      
      // Estimate bundle sizes
      const scripts = Array.from(document.querySelectorAll('script[src]'));
      scripts.forEach((script) => {
        const src = (script as HTMLScriptElement).src;
        if (src.includes('assets')) {
          console.log(`📄 Script: ${src.split('/').pop()}`);
        }
      });
      
      // Memory usage
      if ('memory' in performance) {
        const memInfo = (performance as any).memory;
        console.log(`🧠 Memory Usage:`, {
          used: `${(memInfo.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
          total: `${(memInfo.totalJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
          limit: `${(memInfo.jsHeapSizeLimit / 1024 / 1024).toFixed(2)}MB`,
        });
      }
      
      console.groupEnd();
    }
  },
};

// Image optimization utilities
export const imageOptimization = {
  // Lazy load images with intersection observer
  lazyLoadImages: () => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });
  },

  // Generate responsive image URLs
  generateSrcSet: (baseUrl: string, sizes: number[]) => {
    return sizes
      .map((size) => `${baseUrl}?w=${size} ${size}w`)
      .join(', ');
  },
};

// Cache management
export const cacheManager = {
  // Service worker cache management
  updateCache: () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.update();
      });
    }
  },

  // Clear application cache
  clearCache: () => {
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
      });
    }
    
    // Clear localStorage with versioning
    const cacheVersion = '1.0.0';
    const currentVersion = localStorage.getItem('cacheVersion');
    
    if (currentVersion !== cacheVersion) {
      localStorage.clear();
      localStorage.setItem('cacheVersion', cacheVersion);
    }
  },
};

// Performance optimization hooks
export const usePerformanceMonitor = () => {
  const reportPerformance = (metric: string, value: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'performance_metric', {
        metric_name: metric,
        value: Math.round(value),
      });
    }
  };

  return { reportPerformance };
};

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  // Monitor web vitals
  performanceMonitor.measureWebVitals();
  
  // Analyze bundles in development
  bundleAnalysis.analyzeBundles();
  
  // Initialize lazy image loading
  imageOptimization.lazyLoadImages();
  
  console.log('🚀 Performance monitoring initialized');
};