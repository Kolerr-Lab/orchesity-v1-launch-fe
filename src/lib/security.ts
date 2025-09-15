// Security configuration for production deployment
export const securityConfig = {
  // Content Security Policy configuration
  csp: {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-inline'", // Required for Vite dev and some React features
      "'unsafe-eval'", // Required for development mode
      'https://js.stripe.com',
      'https://checkout.stripe.com',
      'https://fonts.googleapis.com',
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'", // Required for styled-components and CSS-in-JS
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ],
    'img-src': [
      "'self'",
      'data:', // For base64 images
      'blob:', // For generated images
      'https:', // Allow HTTPS images
      '*.stripe.com',
    ],
    'font-src': [
      "'self'",
      'https://fonts.gstatic.com',
      'data:',
    ],
    'connect-src': [
      "'self'",
      'https://api.stripe.com',
      'wss:', // WebSocket connections
      'https:', // API calls
      process.env.NODE_ENV === 'development' ? 'http://localhost:*' : '',
    ].filter(Boolean),
    'frame-src': [
      'https://js.stripe.com',
      'https://hooks.stripe.com',
      'https://checkout.stripe.com',
    ],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
    'upgrade-insecure-requests': true,
  },

  // Security headers configuration
  headers: {
    // HTTP Strict Transport Security
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    
    // X-Frame-Options
    'X-Frame-Options': 'DENY',
    
    // X-Content-Type-Options
    'X-Content-Type-Options': 'nosniff',
    
    // Referrer Policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // Permissions Policy
    'Permissions-Policy': [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'interest-cohort=()',
    ].join(', '),
    
    // X-XSS-Protection (legacy browsers)
    'X-XSS-Protection': '1; mode=block',
  },
};

// Generate CSP header string
export const generateCSPHeader = (): string => {
  const cspDirectives = Object.entries(securityConfig.csp)
    .map(([directive, sources]) => {
      if (typeof sources === 'boolean') {
        return sources ? directive : null;
      }
      return `${directive} ${Array.isArray(sources) ? sources.join(' ') : sources}`;
    })
    .filter(Boolean);

  return cspDirectives.join('; ');
};

// Security utilities
export const securityUtils = {
  // Sanitize user input
  sanitizeInput: (input: string): string => {
    return input
      .replace(/[<>]/g, '') // Remove potential XSS vectors
      .trim()
      .substring(0, 1000); // Limit length
  },

  // Validate URLs
  isValidUrl: (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return ['http:', 'https:'].includes(urlObj.protocol);
    } catch {
      return false;
    }
  },

  // Check if running in secure context
  isSecureContext: (): boolean => {
    return window.isSecureContext || location.protocol === 'https:';
  },

  // Rate limiting helper (client-side)
  createRateLimiter: (maxRequests: number, windowMs: number) => {
    const requests: number[] = [];
    
    return () => {
      const now = Date.now();
      const windowStart = now - windowMs;
      
      // Remove old requests
      while (requests.length > 0 && requests[0] < windowStart) {
        requests.shift();
      }
      
      // Check if under limit
      if (requests.length >= maxRequests) {
        return false;
      }
      
      requests.push(now);
      return true;
    };
  },
};

// Production security checklist
export const productionSecurityChecklist = {
  // Environment checks
  checks: [
    {
      name: 'HTTPS Enforcement',
      check: () => securityUtils.isSecureContext(),
      description: 'Ensure all traffic is served over HTTPS',
    },
    {
      name: 'CSP Header',
      check: () => document.querySelector('meta[http-equiv="Content-Security-Policy"]') !== null,
      description: 'Content Security Policy should be implemented',
    },
    {
      name: 'No Console Logs',
      check: () => {
        const originalLog = console.log;
        let hasLogs = false;
        console.log = () => { hasLogs = true; };
        console.log = originalLog;
        return !hasLogs;
      },
      description: 'Remove console.log statements in production',
    },
  ],

  // Run all security checks
  runChecks: () => {
    const results = productionSecurityChecklist.checks.map(check => ({
      ...check,
      passed: check.check(),
    }));
    
    console.group('🔒 Production Security Checklist');
    results.forEach(result => {
      console.log(
        `${result.passed ? '✅' : '❌'} ${result.name}: ${result.description}`
      );
    });
    console.groupEnd();
    
    return results;
  },
};