exports.create = function() {
	function addAnnotation(_args) {
		require('vendor/geo.resolve').get({
			city : _args.city
		}, function(_e) {
			var total = _args.stations.length;
			if (total > 5)
				total = 5;
			var annotation = TiMap.createAnnotation({
				latitude : parseFloat(_e.lat),
				longitude : parseFloat(_e.lng),
				image : '/images/radiopin' + total + '.png',
				rightButton : '/images/play.png',
				title : _args.city,
				radiostations : _args.stations,
				subtitle : (total == 1) ? _args.stations[0].longname : _args.stations.length + ' Stationen'
			});
			_args.onload && _args.onload(annotation);
		});

	}

	var rc = require('controls/geo').init(function(_e) {
	});

	var self = Ti.UI.createView({
		mapadded : false
	});
	self.radiowidget = new (require('ui/radio.widget'))();
	self.add(self.radiowidget.getView());
	var TiMap = require('ti.map');
	var Map = TiMap.createView({
		mapType : TiMap.TERRAIN_TYPE,
		animate : true,
		userLocation : true,
		userLocationButton : false,
		enableZoomControls : false,
		region : {
			latitude : 52,
			longitude : 10,
			latitudeDelta : 12,
			longitudeDelta : 12
		}
	});
	self.add(Map);
	self.setMaptype = function(_type) {
		var types = [TiMap.NORMAL_TYPE, TiMap.SATELLITE_TYPE,  TiMap.HYBRID_TYPE,TiMap.TERRAIN_TYPE];
		Map.mapType = types[_type];
	};
	self.addPins = function() {
		var allstations = Ti.App.Model.getAllStationList();
		var location;
		for (location in allstations) {
			addAnnotation({
				city : location,
				stations : allstations[location],
				onload : function(_annotation) {
					Map.addAnnotation(_annotation);
				}
			});
		}
		self.mapadded = true;
	};
	Map.addEventListener('click', function() {
		console.log(arguments[0].clicksource);
		if (arguments[0].clicksource != "pin") {
			var annotation = arguments[0].annotation;
			var radiostations = annotation.radiostations;
			var stationnames = [];
			for (var i = 0; i < radiostations.length; i++) {
				radiostations[i].longname && stationnames.push(radiostations[i].longname);
			}
			var opts = {
				title : annotation.title,
				options : stationnames
			};
			var dialog = Ti.UI.createOptionDialog(opts);
			dialog.show();
			dialog.addEventListener('click', function(_evt) {
				var ndx = _evt.index;
				console.log(ndx);
				if (ndx >= 0)
					self.radiowidget.togglePlay({
						senderlongname : radiostations[ndx].longname,
						isplaylisturl : true,
						media : radiostations[ndx].livestream.url
					});
				console.log(radiostations[ndx]);
			});
		}
	});
	return self;
};
