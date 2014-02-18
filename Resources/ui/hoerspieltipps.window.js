exports.create = function() {
	var self = Ti.UI.createWindow({
		fullscreen : true,
		listadded : false,
		
		backgroundColor : 'white'
	});
	
	self.addEventListener('focus', function() {
		if (!self.listadded) {
			Ti.UI.createNotification({
				message : 'Hole Daten von Hoerspieltipps.net'
			}).show();
			self.add(require('ui/hoerspieltipps.list').create());
			self.listadded = true;
		}
	});
	return self;
};
