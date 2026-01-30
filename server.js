require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const youtubeController = require('./controllers/youtube.controller');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to YouTube Scraper Pro API',
        endpoints: {
            video: '/v1/video?url=...',
            search: '/v1/search?q=...'
        }
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// V1 API
const v1Router = express.Router();
v1Router.get('/video', youtubeController.getVideo);
v1Router.get('/search', youtubeController.search);

app.use('/v1', v1Router);

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: 'error', message: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`YouTube Scraper Pro is running on port ${PORT}`);
});
