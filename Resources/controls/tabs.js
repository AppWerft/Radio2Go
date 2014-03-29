exports.create = function(self) {
	var tabs = self.getTabs();
	tabs[0].addEventListener('onCreateOptionsMenu', function(e) {
		if (e.actionBar) {
			self.actionBar.setTitle('Hörspielkalender');
			self.actionBar.setIcon('/images/appicon.png');
		}
		e.menu.add({
			title : "Einstellungen",
			icon : '/images/preferences.png',
			showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
			itemId : 1
		}).addEventListener("click", function() {
			Ti.UI.Android.openPreferences();
			//e.activity.invalidateOptionsMenu();
		});
	});
	tabs[1].addEventListener('onCreateOptionsMenu', function(e) {
		if (e.actionBar) {
			self.actionBar.setTitle('Öffentlich-rechtliche Sender');
			self.actionBar.setIcon('/images/appicon.png');
		}
		e.menu.add({
			title : "Alle Sender",
			icon : '/images/out.png',
			showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
			itemId : 1
		}).addEventListener("click", function() {
			if (self.allstations) {
				e.menu.getItem(0).setIcon('/images/out.png');
				self.actionBar.setTitle('Öffentlich-rechtliche Sender');
				tabs[1].window.setList('public');
				self.allstations = false;
			} else {
				tabs[1].window.setList('all');
				self.actionBar.setTitle('Alle Sender');
				e.menu.getItem(0).setIcon('/images/in.png');
				self.allstations = true;
			}
		});
	});
	tabs[2].addEventListener('onCreateOptionsMenu', function(e) {
		if (e.actionBar) {
			self.actionBar.setTitle('Karte aller Sender');
			self.actionBar.setIcon('/images/map.png');
		}
		var clearAllChecked = function() {
			var items = e.menu.getItems(), item;
			while ( item = items.pop()) {
				item.setChecked(false);
			}
		};
		e.menu.add({
			title : "Standardkarte",
			showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
			itemId : 0,
			checked : true,

			visible : true
		}).addEventListener("click", function() {
			clearAllChecked();
			e.menu.getItem(0).checked = true;
			tabs[2].window.mapwidget.setMaptype(0);
		});
		e.menu.add({
			title : "Satellitenkarte",
			showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
			itemId : 1,
			checkable : true,
			visible : true
		}).addEventListener("click", function() {
			clearAllChecked();
			e.menu.getItem(1).checked = true;
			tabs[2].window.mapwidget.setMaptype(1);
		});
		e.menu.add({
			title : "Mischkarte",
			showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
			itemId : 2,
			checkable : true,
			visible : true
		}).addEventListener("click", function() {
			clearAllChecked();
			e.menu.getItem(2).checked = true;
			tabs[2].window.mapwidget.setMaptype(2);
		});
		e.menu.add({
			title : "Landschaftskarte",
			showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
			itemId : 3,
			checkable : true,
			visible : true
		}).addEventListener("click", function() {
			clearAllChecked();
			e.menu.getItem(3).checked = true;
			tabs[2].window.mapwidget.setMaptype(3);
		});

	});
	tabs[3].addEventListener('onCreateOptionsMenu', function(e) {
		if (e.actionBar) {
			self.actionBar.setTitle('Podcasts (auch zum Mitnehmen)');
			self.actionBar.setIcon('/images/appicon.png');
		}
	});

	tabs[4].addEventListener('onCreateOptionsMenu', function(e) {
		if (e.actionBar) {
			self.actionBar.setTitle('Mein Podcast-Depot');
			self.actionBar.setIcon('/images/appicon.png');
		}
		e.menu.add({
			title : "Einstellungen",
			icon : '/images/preferences.png',
			showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
			itemId : 1
		}).addEventListener("click", function() {
			Ti.UI.Android.openPreferences();
			//e.activity.invalidateOptionsMenu();
		});

	});
	tabs[5].addEventListener('onCreateOptionsMenu', function(e) {
		if (e.actionBar) {
			self.actionBar.setTitle('Hörspieltipps von Olaf von der Heydt ');
			self.actionBar.setIcon('/images/hoerspieltipps.png');
		}
	});
	tabs[6].addEventListener('onCreateOptionsMenu', function(e) {
		if (e.actionBar) {
			self.actionBar.setTitle('Hörspiel@Twitter');
			self.actionBar.setIcon('/images/twitter.png');
		}
		e.menu.add({
			title : "Nachladen",
			icon : '/images/reload.png',
			showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
			itemId : 0
		}).addEventListener("click", function() {
			tabs[6].window.fireEvent('reload!');
			e.activity.invalidateOptionsMenu();
		});
		e.menu.add({
			title : "Einloggen",
			icon : '/images/pencil.png',
			showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
			itemId : 1
		}).addEventListener("click", function() {
			tabs[6].window.fireEvent('write!');
			//e.activity.invalidateOptionsMenu();
		});
	});
};
