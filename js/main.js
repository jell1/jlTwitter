$(function(){

	var msg = 'default';
	var User = {
			title: '@JLeon',
			image: "images/nike.png"
		};

	var renderTweet = function(User, message) {
			var source = $('#template-tweet').html();
			var tweet_template = Handlebars.compile(source);
			console.log(message);
			var output = tweet_template(
				{
					title: User.title,
					image: User.image,
					message: message
				});
			return output;	
		};

	var renderCompose = function() {
			var source = $('#template-compose').html();
			var tweet_template = Handlebars.compile(source);
			var output = tweet_template();
			return output;
	}
	
    var renderThread = function(User, message) {
			var source = $('#template-thread').html();
			var tweet_template = Handlebars.compile(source);
			var context = {
 				'tweet': renderTweet(User, message),
 				'compose': renderCompose()
 			};
			var output = tweet_template(context);
			return output;
	}
			
	$(document).on('click', 'textarea', function() {
		$(this).parents('.compose').toggleClass('expand');
	});

	$(document).on('click', '.tweet', function() {
		$(this).parents('.thread').toggleClass('expand');
	});
	
	
	$('header form').on('submit', function(event) {
		event.preventDefault();
		var msg = $('header textarea').val();
		console.log(msg);
		$('.tweets').append(renderThread(User, msg));
		$(this).find('textarea').val('');
	});

	$(document).on('submit', '.tweets form', function(event) {
		event.preventDefault();
		var msg = $(this).find('textarea').val();
		$(this).parents('.replies').append(renderTweet(User, msg ));
		$(this).find('textarea').val('');
	});
});





