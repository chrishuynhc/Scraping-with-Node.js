const scraper = require('./scraper');
var url = 'http://imgur.com/8Gf7MvG';
var amazon = 'https://www.amazon.com/gp/offer-listing/0073383090';

scraper.imgScrape(url, function(data){

	console.log('Data from scraper received');
	console.log(data);
})

scraper.amazonScrape(amazon, function(data){

	console.log('Data from scraper received');
	console.log(data);
})