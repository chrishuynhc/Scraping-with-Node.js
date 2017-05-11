const scraper = require('./scraper');
var url = 'http://imgur.com/8fkj14y';

scraper.imgScrape(url, function(data){

	console.log('Data from scraper received');
	console.log(data);
})