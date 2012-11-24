window.fbAsyncInit = function() {
    
	FB.init({
	  appId      : 'APP ID',
	  channelUrl : 'http://www.domain-name.com/fb-channel-proxy.html',
	  status     : true,
	  cookie     : true,
	  xfbml      : false,
	  oauth      : true
	});

    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          // the user is logged in and has authenticated your app
            defineUser();
        } else if (response.status === 'not_authorized') {
			// the user is logged in to Facebook, but has not authenticated your app so ask for permissions
			FB.login(function(response) {
               if (response.authResponse) {
                 var access_token =   FB.getAuthResponse()['accessToken'];
                 FB.api('/me', function(response) {
                     defineUser();
                 });
               } else {
                   // user has not authenticated app
               }
			}, {scope: 'email,user_about_me'});
        } else {
        	// the user isn't logged in to FB
        }
    });

    function defineUser() {
        FB.api('/me', function(user) {
            if (user) {                    
                var userID = user.id;
                var userName = user.name;                   
                // write js code here for FB specific stuff
            }
        });
    }
    
};

// Load the SDK Asynchronously
(function(d){
	var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement('script'); js.id = id; js.async = true;
	js.src = "//connect.facebook.net/en_US/all.js";
	ref.parentNode.insertBefore(js, ref);
}(document));