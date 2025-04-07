const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError.js');
const globalErrorHandler = require('./controlers/errorController.js');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xssProtect = require('./utils/xssMiddleware.js');
const hpp = require('hpp');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

// Use Helmet for security headers
app.use(helmet());

// Content Security Policy
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https://*"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: []
    }
  })
);

// X-Content-Type-Options
app.use(helmet.xContentTypeOptions());

// Strict-Transport-Security (HSTS)
app.use(
  helmet.hsts({
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
  })
);

// X-Frame-Options
app.use(helmet.frameguard({ action: 'deny' }));

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});

app.use('/api', limiter);
app.use(express.json({limit: '10kb'}));

//Data sanatization agains NoSQL query injection
app.use(mongoSanitize());
//Data sanatization agains XSS
app.use(xssProtect());
//Prevent parameter pollution
app.use(hpp({
    whitelist: ['duration', 'ratingsAverage', 'ratingsQuantity', 'maxGroupSize', 'difficulty', 'price', 'durationWeeks']
}));

app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;