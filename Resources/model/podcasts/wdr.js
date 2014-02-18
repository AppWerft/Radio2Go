exports.get = function(_callback) {
	var podcasts = [{
		feed : "http://www1.wdr.de/radio/glosse178.podcast",
		station : "wdr",
		logo : "http://www1.wdr.de/radio/podcasts/wdr/podcast_glosse100_v-Podcast.jpg",
		title : "Glosse"
	}, {
		feed : "http://www1.wdr.de/radio/wdr_hoerspielspeicher114.podcast",
		station : "wdr",
		logo : "http://www1.wdr.de/radio/podcasts/1live/hoerspiel_podcast104_v-Podcast.jpg",
		title : "WDR Hörspielspeicher"
	}, {
		feed : "http://www1.wdr.de/radio/hoerspielundfeature/feature/feature_depot108.podcast",
		station : "wdr",
		logo : "http://www1.wdr.de/radio/hoerspielundfeature/feature/feature_podcast104_v-Podcast.jpg",
		title : "WDR Featuredepot"
	},{
		feed : "http://www1.wdr.de/radio/podcasts/1live/talk112.podcast",
		station : "wdr",
		logo : "http://www1.wdr.de/radio/podcasts/1live/podcast_planbtalk100_v-Podcast.jpg",
		title : "1LIVE Talk"
	},{
		feed : "http://www1.wdr.de/radio/podcasts/wdr2/einfach_gote100.podcast",
		station : "wdr",
		logo : "http://www1.wdr.de/radio/podcasts/wdr2/podcast_einfachgote100_v-Podcast.jpg",
		title : "WDR 2 Einfach Gote!"
	},{
		feed : "http://www1.wdr.de/radio/podcasts/wdr5/leo_kleineanfrage104.podcast",
		station : "wdr",
		logo : "http://www1.wdr.de/radio/podcasts/wdr5/podcast_kleineanfrage102_v-Podcast.jpg",
		title : "Leonardo - Die Kleine Anfrage"
	}, {
		feed : 'http://podcast.wdr.de/radio/baerenbude.xml',
		station : 'wdr',
		logo : 'http://www1.wdr.de/themen/baerenbude100_v-TeaserAufmacher.jpg',
		title : 'Bärenbude – Kinderprogramm'
	}, {
		feed : 'http://podcast.wdr.de/radio/zeitzeichen.xml',
		station : 'wdr',
		logo : 'http://www.wdr5.de/sendungen/zeitzeichen/zeitzeichen_symbolbild100_v-TeaserNormal.jpg',
		title : 'Zeitzeichen'
	}, {
		feed : 'http://podcast.wdr.de/radio/philosophischesradio.xml',
		station : 'wdr',
		logo : 'http://www1.wdr.de/radio/podcasts/wdr5/podcast_dasphilosophischeradio100_v-TeaserAufmacher.jpg',
		title : 'Das philosophische Radio'
	}];
	_callback && _callback(podcasts);
	return podcasts;
};

