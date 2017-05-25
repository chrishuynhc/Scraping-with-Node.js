var request = require('request');
var	cheerio = require('cheerio');

var urls = [];

var link = 'https://www.amazon.com/gp/offer-listing/0471134473/ref=dp_olp_all_mbc?ie=UTF8&condition=all';

request(link, function(err, res, body){

	if (!err && res.statusCode == 200){
		var $ = cheerio.load(body);


		$('div', '#olpOfferList').each(function(){

			//var url = $(this).attr('title');
			//var urlText = url.text();
			var price = $('.olpOfferPrice').text();
			
			urls.push(price);
			
		});

		console.log(urls);

	} else {
		console.log(err);
	}
});