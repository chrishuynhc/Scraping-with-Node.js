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