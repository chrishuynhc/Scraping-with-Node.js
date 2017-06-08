const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const path = require('path');

var app = express();

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

function getBooks(searchText){

    //var searchText = $('#input').val();

    axios.get('http://api.tbp.io/search.json?q=' + searchText)
        .then(function(response) {
            console.log(response);
            var books = response.data.books;
            var output = '';

            /*
            var info = {
                title: books[0].title,
                isbn: books[0].isbn,
                author: books[0].author

            }
            */
            //console.log(info);
            
            $.each(books, function(index, book){
                output += `
                    <div class="col-md-3">
                        <div class="well text-center">
                            <img src="${book.images.large}">
                            <h5>${book.title}</h5>
                            <a onclick="movieSelected('${book.isbn}')" class="btn btn-primary" href="#">Compare Prices</a>
                        </div>
                    </div>
                `;
            });
            
            $('#books').html(output);
          
        })
        .catch(function(err){
            console.log(err);
        });
};

app.get('/api/:_isbn', function(req, res){


	//Headers
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	const options = {  
	    url: amazonUsed,
	    method: 'GET',
	    headers: {
	        'Accept': 'application/json',
	        'Accept-Charset': 'utf-8',
	        'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-GB; rv:1.8.1.6) Gecko/20070725'
	    }
	};
	
	//Links
	var amazonUsed = 'https://www.amazon.com/gp/offer-listing/' + req.params._isbn + '/ref=olp_f_used?ie=UTF8&f_used=true&f_usedAcceptable=true&f_usedGood=true&f_usedLikeNew=true&f_usedVeryGood=true';
	var amazonNew = 'https://www.amazon.com/gp/offer-listing/' + req.params._isbn + '/ref=olp_f_new?ie=UTF8&f_new=true';
	var amazonRental = '';

	//Return object with info
	var p = {
		title: '',
		options: 
		[
			{
				condition: '',
				price: '',
				url: '',
			},
			{
				condition: '',
				price: '',
				url: '',
			},
			
		]
	};

	//First request for Used
	request(options, function(err, resp, body){

		if (err){
			res.send('Error!');
		}

		let $ = cheerio.load(body);

		$title = $('h1').first().text().trim().replace(/  /g, '');
		$condition = $('.olpCondition').first().text().trim().replace(/  /g, '').replace('\n', ' ');
		$price = $('.olpOfferPrice').first().text().trim();

		p.title = $title;
		p.options[0].condition = $condition;
		p.options[0].price = $price;
		p.options[0].url = amazonUsed;

		//Second request for New
		request(amazonNew, function(err, resp, body){

			if (err){
				res.send('Error!');
			}

			let $ = cheerio.load(body);

			//$title = $('h1').first().text().trim().replace(/  /g, '');
			$condition = $('.olpCondition').first().text().trim().replace(/  /g, '').replace('\n', ' ');
			$price = $('.olpOfferPrice').first().text().trim();

			p.options[1].condition = $condition;
			p.options[1].price = $price;
			p.options[1].url = amazonNew;

			//Second request for New
			

			res.send(p);
		});
	});
	
});

function getPrice(url, p, cb){

	const options = {  
	    url: url,
	    method: 'GET',
	    headers: {
	        'Accept': 'application/json',
	        'Accept-Charset': 'utf-8',
	        'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-GB; rv:1.8.1.6) Gecko/20070725'
	    }
	};

	request(options, function(err, resp, body){

		let $ = cheerio.load(body);

		$title = $('h1').first().text().trim().replace(/  /g, '');
		$condition = $('.olpCondition').first().text().trim().replace(/  /g, '').replace('\n', ' ');
		$price = $('.olpOfferPrice').first().text().trim();
		$shipping = $('.olpShippingPrice').first().text();

		p.title = $title;
		p.options.push({
			condition: $condition,
			price: $price,
			shipping: $shipping,
			url: options.url
		});
		cb();
	});
}



app.listen(3000, function(){
	console.log('Server Started on Port 3000...');
});













