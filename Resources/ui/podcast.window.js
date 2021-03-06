exports.create = function(_data) {
	var self = Ti.UI.createWindow({
		backgroundColor : 'white',
		fullscreen : true
	});
	console.log('Info: start creating podcast window');
	self.podcastlist = require('ui/podcast.listview').create(self, _data);
	self.add(self.podcastlist);
	self.addEventListener("close", function() {
		console.log('Info: podcast window closed ');
	});
	self.addEventListener("open", function() {
		if (Ti.Platform.osname === "android") {
			if (! self.getActivity()) {
				Ti.API.error("Can't access action bar on a lightweight window.");
			} else {
				var activity = self.getActivity();
				activity.onCreateOptionsMenu = function(e) {
					e.menu.add({
						title : "Einstellungen",
						icon : '/images/preferences.png',
						showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
						itemId : 1
					}).addEventListener("click", function() {
						Ti.Android && Ti.UI.Android.openPreferences();
					});
					// comes from loading event of listview
					// will fired after successful loading of data, wee need filesize
					self.addEventListener('podcasts_loaded', function(_filesize) {
						console.log('Info: event podcasts_loaded ');
						_data.filesize = _filesize.filesize;
						var saved = Ti.App.Model.isChannelsaved(_data);
						if (!saved) {
							e.menu.add({
								title : "Kanal bestellen",
								icon : '/images/channels.png',
								showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
								itemId : 2
							}).addEventListener("click", function(_menuclick) {
								Ti.App.Model.saveChannel(_data);
								console.log(_menuclick.source);
								e.menu.removeItem(2);
							});
						}
					});
				};
				if (activity.actionBar) {
					activity.actionBar.setDisplayHomeAsUp(true);
					activity.actionBar.setTitle(_data.title);
					activity.actionBar.setLogo('/images/' + _data.station + '.png');
					//	actionBar.setIcon('/images/'+_data.station + '.png');
					activity.actionBar.onHomeIconItemSelected = function() {
						self.close();
					};
				}
			}
		}
	});

	return self;
};
