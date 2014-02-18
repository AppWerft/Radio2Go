var myPushDeviceToken;
var CloudPush = require('ti.cloudpush');
var Cloud = require('ti.cloud');
//Import the cloud module.
CloudPush.retrieveDeviceToken({
	success : function (e) {
		myPushDeviceToken = e.deviceToken;
		var user = new Apiomat.User;
		user.setUserName("phimi");
		user.setPassword("geheim");
		user.loadMe({
			onOk : function() {
				/* set token for android */
				if (OS_ANDROID) {
					user.setRegistrationId(myPushDeviceToken);
				} else if (OS_IOS) {
					user.setDeviceToken(myPushDeviceToken);
				}
				/* update */
				user.save({
					onOk : function() {
						Ti.API.info("Updated user");
					},
					onError : function(e) {
						Ti.API.error("Can't update user: " + e);
					}
				});
			},
			onError : function(err) {

			}
		});
		Ti.API.info('Device Token: ' + e.deviceToken);
	},
	error : function deviceTokenError(e) {
		alert('Failed to register for push! ' + e.error);
	}
});

CloudPush.addEventListener('callback', function(evt) {
	Ti.API.info("Event: " + JSON.stringify(evt));
	alert(evt.payload);
});
CloudPush.addEventListener('trayClickLaunchedApp', function(evt) {
	Ti.API.info('Tray Click Launched App (app was not running)');
});
CloudPush.addEventListener('trayClickFocusedApp', function(evt) {
	Ti.API.info('Tray Click Focused App (app was already running)');
});

function enablePush(e) {
	Cloud.Users.login({
		"login" : 'phimi',
		"password" : 'secret'
	}, function(e) {
		if (e.success) {
			alert('Login successfully ');
			Cloud.PushNotifications.subscribe({
				type : 'android',
				channel : 'friend_request',
				device_token : myPushDeviceToken
			}, function(e) {
				if (e.success) {
					alert('Device subscribe successfully');
					CloudPush.enabled = true;
					// Used to enable the push service.
				} else {
					alert('Error :-' + ((e.error && e.message) || JSON.stringify(e)));
				}
			});
		} else {
			alert('Error : ' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
}