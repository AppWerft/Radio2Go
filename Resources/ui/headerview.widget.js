exports.create = function(_options) {
	var self = Ti.UI.createView({
		height : '36dp',
		backgroundColor : 'gray'
	});
	if (_options.key == 'cached') {
		var quotaView = Ti.UI.createProgressBar({
			min : 0,
			max : 1,
			value : 0,
			height : Ti.UI.FILL,
			width : Ti.UI.FILL,
			left : '18	0dp',
			right : '10dp'
		});
		self.addEventListener('setquota', function() {
			console.log('Info: quota received');
			var quota = (Ti.App.Model.getQuota()) ? Ti.App.Model.getQuota().quota : 0;
				quotaView.setValue(quota);
		});
		self.add(quotaView);
		quotaView.show();
	}
	self.add(Ti.UI.createLabel({
		left : '40dp',
		textAlign : 'left',
		color : 'white',
		font : {
			fontWeight : 'bold'
		},
		text : _options.title
	}));
	self.add(Ti.UI.createImageView({
		left : '5dp',
		width : '32dp',
		height : '32dp',
		image : '/images/' + _options.key + '.png'
	}));
	return self;
};
