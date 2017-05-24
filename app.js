const scraper = require('./scraper');
var url = 'http://imgur.com/8Gf7MvG';

scraper.imgScrape(url, function(data){

	console.log('Data from scraper received');
	console.log(data);
})