exports.isRightVersion = function() {
	var options = arguments[0] || {};
	var url = 'https://play.google.com/store/apps/details?id=' + Ti.App.getId();
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			var res = /itemprop="softwareVersion">(.*?)</m.exec(this.responseText);
			if (res && ( version = res[1].replace(' ', '')) != Ti.App.getVersion()) {
				var dialog = Ti.UI.createAlertDialog({
					cancel : 1,
					buttonNames : ['Update', 'Abbruch'],
					message : 'Es gibt eine neue Version im Playstore. Möchtest Du erneuern?\nDu hast ' + Ti.App.getVersion() + ' im Store ist ' + version,
					title : 'Neue Version Radio2Go'
				});
				dialog.addEventListener('click', function(_e) {
					if (_e.index != _e.source.cancel)
						Ti.Platform.openURL(url);
				});
				dialog.show();
			}
		}
	});
	xhr.open('GET', url);
	xhr.send();
};
