const scraperService = require('../services/scraper.service');

exports.getVideo = async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) {
            return res.status(400).json({ status: 'fail', message: 'URL is required' });
        }

        const info = await scraperService.getVideoInfo(url);
        res.status(200).json({ status: 'success', data: info });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.search = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ status: 'fail', message: 'Query parameter q is required' });
        }

        const results = await scraperService.searchVideos(q);
        res.status(200).json({ status: 'success', data: results });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
