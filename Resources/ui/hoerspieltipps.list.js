exports.create = function() {
	function updateSection(offset) {
		Ti.App.Model.getHoerspieltipps(offset, function(_data) {
			var items = [];
			for (var i = 0; i < _data.length; i++) {
				items.push({
					properties : {
						accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DETAIL,
						itemId : _data[i].detaillink
					},
					senderlogo : {
						image : _data[i].logo
					},
					titel : {
						text : _data[i].titel
					},
					start : {
						text : _data[i].datum + '  ' + _data[i].uhrzeit + ' Uhr'
					},
					produktion : {
						text : _data[i].produktion
					},
					autor : {
						text : _data[i].autor
					},
					dauer : {
						text : _data[i].dauer
					},
					bemerkung : {
						text : _data[i].bemerkung
					}

				});
				self.sections[offset].setItems(items);
				self.setSections(self.sections);
			}
		});
	}

	var self = Ti.UI.createListView({
		templates : {
			'template' : require('ui/templates').tippsTemplate
		},
		defaultItemTemplate : 'template',
	});
	self.sections = [Ti.UI.createListSection({
		headerTitle : 'Diese Woche'
	}), Ti.UI.createListSection({
		headerTitle : 'Nächste Woche'
	}), Ti.UI.createListSection({
		headerTitle : 'Übernächste Woche'
	})];
	for (var offset = 0; offset < self.sections.length; offset++)
		updateSection(offset);
	self.addEventListener('itemclick', function(_e) {
		var win = Ti.UI.createWindow({
			fullscreen : true,
			navBarHidden : true
		});
		win.open();
		var web = Ti.UI.createWebView({
			url : _e.itemId
		});
		win.add(web);
	});
	return self;
};
