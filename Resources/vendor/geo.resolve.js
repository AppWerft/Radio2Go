exports.get = function(options, _callback) {
	if (!options.country)
		options.country = 'Germany';
	if (!options.city)
		options.city = '';
	if (!options.street)
		options.street = '';
	var url = 'https://maps.googleapis.com/maps/api/geocode/json?language=de&region=de&sensor=true&address=' + encodeURI(options.country + ' ' + options.city + ' ' + options.street);
	var key = Ti.Utils.md5HexDigest(url);
	if (Ti.App.Properties.hasProperty(key))
		_callback(Ti.App.Properties.getObject(key));

	setTimeout(function() {
		xhr = Ti.Network.createHTTPClient();
		xhr.open('GET', url);
		xhr.onload = function() {
			var res = JSON.parse(this.responseText);
			if (res.status == 'OK') {
				var location = res.results[0].geometry.location;
				Ti.App.Properties.setObject(key, location);
				_callback(location);
			}
		};
		xhr.onerror = function() {
			_callback({
				success : false
			});
		};
		xhr.send();
	}, Math.random() * 3000);
};
