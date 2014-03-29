exports.create = function() {// this sets the background color of the master UIView (when there are no windows/tab groups on it)
	var self = Ti.UI.createTabGroup({
		fullscreen : true,
		exitOnClose : true,
	});
	self.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];
	self.open();
	if (Ti.Network.online == false) {
		alert("Radio2Go braucht das Internet.");
	}
	self.addEventListener("open", function(e) {
		if (Ti.Android) {
			self.activity = self.getActivity();
			self.activity.addEventListener('androidback', function() {
				Ti.App.fireEvent('app:exit');
				setTimeout(function() {
					self.activity.finish();
				}, 3000);
			});
			self.actionBar = self.activity.actionBar;
			if (self.actionBar !== undefined) {
				self.activity.onCreateOptionsMenu = function(e) {
					e.menu.clear();
					e.activity = self.activity;
					e.actionBar = self.actionBar;
					self.activeTab && self.activeTab.fireEvent('onCreateOptionsMenu', e);
				};
				self.activity.invalidateOptionsMenu();
			}
		}
	});
	self.addEventListener('focus', function(e) {
		self.getActivity().invalidateOptionsMenu();
	});
	var tabs = [Ti.UI.createTab({
		title : '>> on Air',
		window : require('ui/timeline.window').create()
	}), Ti.UI.createTab({
		title : 'Senderliste',
		window : require('ui/stations.window').create()
	}), Ti.UI.createTab({
		title : 'Radiokarte',
		window : require('ui/map.window').create()
	}), Ti.UI.createTab({
		title : 'Podcasts',
		window : require('ui/podcasts.window').create()
	}), Ti.UI.createTab({
		title : 'Depot',
		window : require('ui/myradio.window').create()
	}), Ti.UI.createTab({
		title : 'Hörspiel-Tipps',
		window : require('ui/hoerspieltipps.window').create()
	}), Ti.UI.createTab({
		title : 'Twitter',
		window : require('ui/twitter/start.window').create()
	})];
	for (var i = 0; i < tabs.length; i++) {
		self.addTab(tabs[i]);
	}
	require('controls/tabs').create(self);
};
