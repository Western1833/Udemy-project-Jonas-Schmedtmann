// xssMiddleware.js
const sanitizeHtml = require('sanitize-html');

/**
 * Middleware to sanitize request body content and prevent XSS attacks
 * @param {Object} options - Configuration options for sanitize-html
 * @returns {Function} Express middleware function
 */
const xssMiddleware = (options = {}) => {
  // Default sanitize-html options (strip all HTML tags)
  const defaultOptions = {
    allowedTags: [],
    allowedAttributes: {}
  };

  // Merge provided options with defaults
  const sanitizeOptions = { ...defaultOptions, ...options };

  /**
   * Recursively sanitize all string values in an object
   * @param {*} obj - Object or value to sanitize
   * @returns {*} Sanitized object or value
   */
  const sanitizeRecursive = (obj) => {
    if (typeof obj === 'string') {
      return sanitizeHtml(obj, sanitizeOptions);
    } else if (Array.isArray(obj)) {
      return obj.map(item => sanitizeRecursive(item));
    } else if (obj !== null && typeof obj === 'object') {
      const result = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          result[key] = sanitizeRecursive(obj[key]);
        }
      }
      return result;
    }
    return obj;
  };

  // Return the actual middleware function
  return (req, res, next) => {
    if (req.body) {
      req.body = sanitizeRecursive(req.body);
    }
    
    if (req.query) {
      req.query = sanitizeRecursive(req.query);
    }
    
    if (req.params) {
      req.params = sanitizeRecursive(req.params);
    }
    
    next();
  };
};

module.exports = xssMiddleware;