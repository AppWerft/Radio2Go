exports.get = function(_callback) {
	function onOffline() {
		console.log('Info: dradio : offline');
		if (Ti.App.Properties.hasProperty('drlist')) {
			_callback(Ti.App.Properties.getObject('dlrlist'));
		} else
			_callback(podcasts);
	}
	if (true == Ti.Network.online) {
		var xhr = Ti.Network.createHTTPClient({
			onerror : onOffline,
			onload : function() {
				var station = '';
				var html = this.responseText.replace(/\n/, '');
				var match, pattern = /<a.*?href="(.*?podcast\.xml)".*?>\s*<img.*?src="(.*?)".*?class="dradioImage".*?title="(.*?)".*?><\/a>/gim;
				while ( match = pattern.exec(html)) {
					match.shift();
					var feed = match[0];
					var logo = match[1];
					var title = match[2].replace(/^Podcast /, '');
					if (feed.match(/deutschlandradiokultur/))
						station = 'drk';
					if (feed.match(/deutschlandfunk/))
						station = 'dlf';
					try {
						podcasts[station].push({
							station : station,
							feed : feed,
							logo : logo,
							title : title.replace(/&amp;/, '&')
						});
					} catch(E) {
						console.log(E);
					}

				}
				Ti.App.Properties.setObject('dlrlist', podcasts);
				_callback(podcasts);
			}
		});
		xhr.open('GET', 'http://www.deutschlandradio.de/podcasts.226.de.html', true);
		xhr.send();
		Ti.App.addEventListener('app:exit', xhr.abort);
	} else
		onOffline();
};

// defaults
var podcasts = {
	dlf : [],
	drk : [],
	drw : [{
		feed : 'http://dradiowissen.de/podcast/eine-stunde-film',
		title : 'Eine Stunde Film',
		logo : 'http://static.dradiowissen.de/cover/Podcasts/eine_stunde_film.jpg',
		station : 'drw'
	},{
		feed : 'http://dradiowissen.de/podcast/eine-stunde-liebe',
		title : 'Eine Stunde Liebe',
		logo : 'http://static.dradiowissen.de/cover/Podcasts/eine_stunde_liebe.jpg',
		station : 'drw'
	},{
		feed : 'http://dradiowissen.de/podcast/eine-stunde-netz',
		title : 'Eine Stunde Netz',
		logo : 'http://static.dradiowissen.de/cover/Podcasts/eine_stunde_netz.jpg',
		station : 'drw'
	},{
		feed : 'http://dradiowissen.de/podcast/eine-stunde-medien',
		title : 'Eine Stunde Was mit Medien',
		logo : 'http://static.dradiowissen.de/cover/Podcasts/eine_stunde_medien.jpg',
		station : 'drw'
	},{
		feed : 'http://dradiowissen.de/podcast/einhundert',
		title : 'Einhundert',
		logo : 'http://static.dradiowissen.de/cover/Podcasts/einhundert.jpg',
		station : 'drw'
	},{
		feed : 'http://dradiowissen.de/podcast/hoersaal-der-podcast',
		title : 'Hörsaal',
		logo : 'http://static.dradiowissen.de/cover/Podcasts/horsaal.jpg',
		station : 'drw'
	},{
		feed : 'http://dradiowissen.de/podcast/redaktionskonferenz',
		title : 'Redaktionskonferenz',
		logo : 'http://static.dradiowissen.de/cover/Podcasts/redaktion.jpg',
		station : 'drw'
	},{
		feed : 'http://dradiowissen.de/podcast/update',
		title : 'Update',
		logo : 'http://static.dradiowissen.de/cover/Podcasts/update.jpg',
		station : 'drw'
	},{
		feed : 'http://dradiowissen.de/podcast/zeitmaschine',
		title : 'Zeitmaschine',
		logo : 'http://static.dradiowissen.de/cover/Podcasts/zeitmachine.jpg',
		station : 'drw'
	}]
};
