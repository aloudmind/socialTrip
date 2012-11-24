window.fbAsyncInit = function() {
	
	FB.init({
		appId      : 'APP ID',
		channelUrl : 'http://www.domain-name.com/fb-channel-proxy.html',
		status     : true,
		cookie     : true,
		xfbml      : false
	});
	
	FB.getLoginStatus(function(response) {
		
		var page_id = "PAGE ID";
		
		if (response && response.authResponse) {
			
			var user_id = response.authResponse.userID;
			var fql_query = "SELECT uid FROM page_fan WHERE page_id = "+page_id+"and uid="+user_id;
			FB.Data.query(fql_query).wait(function(rows) {
				if (rows.length == 1 && rows[0].uid == user_id) {
					alert("LIKE");
				} else {
					alert("NO LIKE");
				}
			});
			
		} else {
			
			FB.login(function(response) {
				if (response && response.authResponse) {
					var user_id = response.authResponse.userID;
					var fql_query = "SELECT uid FROM page_fan WHERE page_id = "+page_id+"and uid="+user_id;
					FB.Data.query(fql_query).wait(function(rows) {
						if (rows.length == 1 && rows[0].uid == user_id) {
							alert("LIKE");
						} else {
							alert("NO LIKE");
						}
					});
				} else {
					alert("NO LIKE");
				}
			}, {scope: 'user_likes'});
			
		}
		
	});
	
};

// Load the SDK Asynchronously
(function(d){
  var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
  js = d.createElement('script'); js.id = id; js.async = true;
  js.src = "//connect.facebook.net/en_US/all.js";
  d.getElementsByTagName('head')[0].appendChild(js);
}(document));
