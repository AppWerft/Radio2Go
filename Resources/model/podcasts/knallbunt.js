exports.get = function(_callback) {
	var podcasts = [{
		feed : 'http://www.hoerspieltipps.net/media/knallbunt.xml',
		station : 'knallbunt',
		logo : '/images/knallbunt.png',
		title : "Knallbunt – Das Hörspielmagazin"
	}];

	_callback && _callback(podcasts);
	return podcasts;
};

