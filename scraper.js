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















