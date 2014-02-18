exports.create = function() {
	var self = Ti.UI.createWindow({
		fullscreen : true,
		backgroundColor : 'white'
	});
	self.mapwidget = require('ui/map.widget').create();
	self.addEventListener('focus', function() {
		self.add(self.mapwidget);
		self.mapwidget.addPins();
	});
	return self;
};
