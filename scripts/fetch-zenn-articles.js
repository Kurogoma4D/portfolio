const https = require('https');
const fs = require('fs');
const path = require('path');

const ZENN_USERNAME = 'kurogoma4d';
const FEED_URL = `https://zenn.dev/${ZENN_USERNAME}/feed`;
const OUTPUT_DIR = path.join(__dirname, '../src/assets');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'zenn-articles.json');

/**
 * Fetch RSS feed from Zenn
 */
function fetchFeed(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Parse RSS feed and extract article data
 */
function parseRSS(rssText) {
  const articles = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  const matches = rssText.matchAll(itemRegex);

  for (const match of matches) {
    const item = match[1];

    const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
    const linkMatch = item.match(/<link>(.*?)<\/link>/);
    const pubDateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/);

    if (titleMatch && linkMatch && pubDateMatch) {
      articles.push({
        title: titleMatch[1],
        url: linkMatch[1],
        publishedAt: pubDateMatch[1]
      });
    }
  }

  return articles;
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('📡 Fetching Zenn articles...');
    const rssData = await fetchFeed(FEED_URL);

    console.log('📝 Parsing RSS feed...');
    const articles = parseRSS(rssData);

    // Get latest 4 articles
    const latestArticles = articles.slice(0, 4);

    console.log(`✅ Found ${latestArticles.length} articles`);
    latestArticles.forEach((article, index) => {
      console.log(`   ${index + 1}. ${article.title}`);
    });

    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Write to JSON file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(latestArticles, null, 2));
    console.log(`💾 Saved to ${OUTPUT_FILE}`);

  } catch (error) {
    console.error('❌ Error fetching Zenn articles:', error);
    // Create empty array on error to prevent build failure
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify([], null, 2));
    console.log('⚠️  Created empty articles file');
  }
}

main();
