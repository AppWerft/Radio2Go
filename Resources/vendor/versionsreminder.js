exports.isRightVersion = function() {
	var options = arguments[0] || {};
	var url = 'https://play.google.com/store/apps/details?id=' + Ti.App.getId();
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			var res = /itemprop="softwareVersion">(.*?)</m.exec(this.responseText);
			if (res && ( version = res[1].replace(/\s+/g, '')) != Ti.App.getVersion()) {
				var dialog = Ti.UI.createAlertDialog({
					cancel : 1,
					buttonNames : ['Zum Store', 'Abbruch'],
					message : 'Es gibt eine neue Version im Playstore.\n\nDiese App auf dem ' + Ti.Platform.model + ' von ' + Ti.Platform.manufacturer + ' hat die Version ' + Ti.App.getVersion() + ' – im Store ist derweil ' + version + '.\n\nMöchtest Du erneuern?',
					title : 'Neue Version Radio2Go'
				});
				dialog.addEventListener('click', function(_e) {
					if (_e.index != _e.source.cancel)
						Ti.Platform.openURL(url);
				});
				dialog.show();
			} else {
				Ti.Android && Ti.UI.createNotification({message:'Radio2Go ist in neuester Version ('+Ti.App.getVersion()+')'}).show();
			}
		}
	});
	xhr.open('GET', url);
	xhr.send();
};
