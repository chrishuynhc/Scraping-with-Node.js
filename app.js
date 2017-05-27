const scraper = require('./scraper');
var url = 'http://imgur.com/8Gf7MvG';
var amazonUsed = 'https://www.amazon.com/gp/offer-listing/0073383090/ref=olp_f_used?ie=UTF8&f_used=true&f_usedAcceptable=true&f_usedGood=true&f_usedLikeNew=true&f_usedVeryGood=true';
var amazonNew = 'https://www.amazon.com/gp/offer-listing/0073383090/ref=olp_f_new?ie=UTF8&f_new=true';
var amazonRental = 'https://www.amazon.com/gp/offer-listing/0073383090/ref=olp_f_new?ie=UTF8&f_rental=true';
var mediumPopular = 'https://medium.com/topic/popular';
var x = 'https://www.amazon.com/gp/offer-listing/0984782850/ref=dp_olp_all_mbc?ie=UTF8&condition=all';
var y = 'https://www.amazon.com/gp/offer-listing/0399184414/ref=dp_olp_all_mbc?ie=UTF8&condition=all';
var reddit = 'https://www.reddit.com/'
/*
scraper.imgScrape(url, function(data){

	console.log('Data from scraper received');
	console.log(data);
})


scraper.amazonScrape(amazonUsed, function(data){

	console.log('USED:');
	console.log(data);
})

scraper.amazonScrape(amazonNew, function(data){

	console.log('NEW:');
	console.log(data);
})

*/

scraper.amazonScrape(amazonRental, function(data){

	console.log('RENTAL:');
	console.log(data);
})



/*
scraper.mediumScrape(amazonRental, function(data){

	console.log('Most Popular Medium Article:');
	console.log(data);
})
*/