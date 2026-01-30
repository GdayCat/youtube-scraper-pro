const ytDlp = require('yt-dlp-exec');

class ScraperService {
    async getVideoInfo(url) {
        try {
            const output = await ytDlp(url, {
                dumpSingleJson: true,
                noWarnings: true,
                noCheckCertificates: true,
                preferFreeFormats: true,
                addHeader: [
                    'referer:youtube.com',
                    'user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                ]
            });

            return {
                id: output.id,
                title: output.title,
                description: output.description,
                views: output.view_count,
                likes: output.like_count,
                duration: output.duration,
                channel: output.uploader,
                channel_url: output.uploader_url,
                thumbnails: output.thumbnails,
                formats: output.formats.map(f => ({
                    format_id: f.format_id,
                    ext: f.ext,
                    resolution: f.resolution,
                    filesize: f.filesize,
                    url: f.url
                })).filter(f => f.url) // Only include formats with direct URLs
            };
        } catch (error) {
            console.error('yt-dlp error:', error);
            throw new Error('Failed to extract video information. Please check the URL.');
        }
    }

    async searchVideos(query) {
        try {
            const output = await ytDlp(`ytsearch10:${query}`, {
                dumpSingleJson: true,
                noWarnings: true,
                flatPlaylist: true
            });

            return output.entries.map(entry => ({
                id: entry.id,
                title: entry.title,
                url: `https://www.youtube.com/watch?v=${entry.id}`,
                duration: entry.duration,
                uploader: entry.uploader,
                view_count: entry.view_count
            }));
        } catch (error) {
            console.error('Search error:', error);
            throw new Error('Failed to perform search.');
        }
    }
}

module.exports = new ScraperService();
