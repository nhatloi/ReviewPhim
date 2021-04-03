'use strict';

const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const url = require('url');
const logger = require('../logger');
var fs = require("fs");
const { generateKeywords, clearKeywords } = require('keywords-extractor');
/**
 * @param {string} userAgent user agent
 * @param {object} puppeteer puppeteer options
 * @param {object} tbs extra options for TBS request parameter
 */
class ReviewCrawler {
  constructor({
    userAgent = 'Mozilla/5.0 (X11; Linux i686; rv:64.0) Gecko/20100101 Firefox/64.0',
    scrollDelay = 500,
    puppeteer = {},
  } = {}) {
    this.userAgent = userAgent;
    this.scrollDelay = scrollDelay;
    this.puppeteerOptions = puppeteer;
  }

  _parseRequestParameters(tbs) {
    if (tbs === undefined) {
      return '';
    }

    const options = Object.keys(tbs)
      .filter(key => tbs[key])
      .map(key => `${key}:${tbs[key]}`)
      .join(',');
    return encodeURIComponent(options);
  }

  async scrape(searchQuery, limit = 100) {
    if (searchQuery === undefined || searchQuery === '') {
      throw new Error('Invalid search query provided');
    }

    const browser = await puppeteer.launch({
    });
    const page = await browser.newPage();
    await page.setBypassCSP(true);
    await page.goto(searchQuery, {
      waitUntil: 'networkidle0',
    });
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setUserAgent(this.userAgent);
      const html = await page.content();
      const results = this._parseLinksFromHTML(html);

    await browser.close();
    return results;
  }

  /**
   * Scroll to the end of the page.
   * @param {page} Puppeteer page to scroll
   */

  _parseLinksFromHTML(html) {
    let review = {
      title:'',
      description :'',
      post_date:'',
      content : [],
      keywords:[],
    };

    let $ = cheerio.load(html);
    const article = $('article');
    review.title = article.find('.td-post-header>header>h1.entry-title').text();
    review.description = article.find('.td-post-header>header >.td-post-sub-title').text();
    review.post_date = article.find('.td-post-header>header .td-module-meta-info').text().trim();
    $('p').filter((i,e)=>{
      if($(e).attr('style') === 'text-align: justify;'){
        review.content.push($(e).text());
      }
      if($(e).find('img').attr('class'))
        review.content.push(`img src= '${$(e).find('img').attr('src')}'`);
    })

    const stopwords = ["a","te","e","da","com"];
 
    const keywords = generateKeywords(review.content.join(' '));
       const clearKeyowrds = clearKeywords(keywords, stopwords);
    console.log(clearKeyowrds)

    return review;
  }
}

module.exports = ReviewCrawler;
