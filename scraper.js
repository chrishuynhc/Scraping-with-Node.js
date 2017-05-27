const request = require('request');
const cheerio = require('cheerio');

//Callback Function
exports.imgScrape = function(url, cb){

	request(url, function(err, resp, body){
		if (err){
			cb({
				error: error
			});
		}

		let $ = cheerio.load(body);
		$url = url;
		$img = $('.post-image img').attr('src');
		$title = $('.post-title').text();
		$desc = $('[itemprop=description]').text();

		let image = {
			url: $url,
			img: "http:" + $img,
			title: $title,
			description: $desc
		}	

		console.log('scraped from scraper.js', image);
		cb(image);
	});
};

exports.amazonScrape = function(url, cb){

	request(url, function(err, resp, body){
		if (err){
			cb({
				error: error
			})
		}

		let $ = cheerio.load(body);


		$url = url;
		$title = $('h1').first().text().trim();
		$condition = $('.olpCondition').first().text().trim();
		$price = $('.olpOfferPrice').first().text().trim();

		let price = {
			
			title: $title,
			condition: $condition,
			price: $price,
		}

		cb(price);
	});
};

exports.redditScrape = function(url, cb){

	request(url, function(err, resp, body){
		if (err){
			cb({
				error: error
			})
		}

		let $ = cheerio.load(body);


		$url = url;
		$title = $('a.title').first().text();
		$subreddit = $('a.subreddit').first().text();

		let price = {
			
			title: $title,
			subreddit: $subreddit
		}
		cb(price);
	});
};

















