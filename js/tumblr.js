// tumblrBadge by Robert Nyman, http://www.robertnyman.com/, http://code.google.com/p/tumblrbadge/
var tumblrBadge = function () {
	// User settings
	var settings = {
		userName : "makesweetshit", // Your Tumblr user name
		itemsToShow : 3, // Number of Tumblr posts to retrieve
		itemToAddBadgeTo : "tumblr-badge", // Id of HTML element to put badge code into
		imageSize : 75, // Values can be 75, 100, 250, 400 or 500
		shortPublishDate : true, // Whether the publishing date should be cut shorter
		timeToWait : 2000 // Milliseconds, 1000 = 1 second
	};
	
	// Badge functionality
	var head = document.getElementsByTagName("head")[0];
	var badgeContainer = document.getElementById(settings.itemToAddBadgeTo);
	if (head && badgeContainer) {
		var badgeJSON = document.createElement("script");
		badgeJSON.type = "text/javascript";
		badgeJSON.src = "http://" + settings.userName + ".tumblr.com/api/read/json?callback=tumblrBadge.listItems&num=" + settings.itemsToShow;
		head.appendChild(badgeJSON);
		
		var wait = setTimeout(function () {
			badgeJSON.onload = null;
			badgeJSON.parentNode.removeChild(badgeJSON);
			badgeJSON = null;
		}, settings.timeToWait);
		
		listItems = function (json) {
			var posts = json.posts,
				list = document.createElement("p"), 
				text;
			list.className = "tumblr";
			for (var i=0, il=posts.length; i<il; i=i+1) {
				post = posts[i];

				// Only get content for text, photo, quote and link posts
				if (/regular/.test(post.type)) {
					listItem = document.createElement("p");
					text = post["regular-body"];
					listItem.innerHTML += text;

					// Create a link to Tumblr post
					postLink = document.createElement("a");
					postLink.className = "tumblr-regular-title";
					postLink.href = post.url;
					postLink.innerHTML = post["regular-title"];
					listItem.insertBefore(listItem);

					// Apply list item to list
					list.insertBefore(listItem);
				}
			}
			
			// Apply list to container element
			badgeContainer.innerHTML = "";
			badgeContainer.appendChild(list);
		};
		
		return {
			listItems : listItems
		};
	}
}();