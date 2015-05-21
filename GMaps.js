var GMaps = (function () {

	var zoom = 12;
	
	var markerImg = '';

	var markerImgWidth = 0;
	
	var markerImgHeight = 0;
	
	var configGoogleMap = function(config){
		if (typeof config.zoom != 'undefined') {
			zoom = config.zoom;
		}
		if (typeof config.markerImg != 'undefined') {
			markerImg = config.markerImg;
		}
		if (typeof config.markerImgWidth != 'undefined') {
			markerImgWidth = config.markerImgWidth;
		}
		if (typeof config.markerImgHeight != 'undefined') {
			markerImgHeight = config.markerImgHeight;
		}
	};

	var loadGoogleMap = function(data)	{

		var mapOptions = {
          center: { lat: data.lat, lng: data.lng},
          zoom: zoom
		};

        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		setMarker(map, data.marker);

		return true;
	};

	var setMarker = function(map, locations){
	
		var image = {
			url: markerImg,
			// This marker is 20 pixels wide by 32 pixels tall.
			size: new google.maps.Size(markerImgWidth, markerImgHeight),
			// The origin for this image is 0,0.
			origin: new google.maps.Point(0,0),
			// The anchor for this image is the base of the flagpole at 0,32.
			anchor: new google.maps.Point(0, markerImgWidth)
		};

		var shape = {
			coords: [1, 1, 1, 37, 32, 37, 32 , 1],
			type: 'poly'
		};
		
		var markers = [];
		var infowindow = [];
		
		for (var i = 0; i < locations.length; i++) {
	
			var item = locations[i];

			var myLatLng = new google.maps.LatLng(item.lat, item.lng);
			markers[i] = new google.maps.Marker({
				position: myLatLng,
				map: map,
				icon: image,
				shape: shape,
				title: item.name,
				zIndex: item.zIndex
			});
			
			var content = item.infoText;
			var infowindow = new google.maps.InfoWindow();

			google.maps.event.addListener(markers[i],'click', (function(marker,content,infowindow){
				return function() {
					infowindow.setContent(content);
					infowindow.open(map,marker);
				};
			})(markers[i], content, infowindow));			
		}
		
		

		var bounds = new google.maps.LatLngBounds();

		for(i=0;i<markers.length;i++) {
			bounds.extend(markers[i].getPosition());
		}

		map.fitBounds(bounds);

		return true;
	};
	
	return {
		configGoogleMap : configGoogleMap,
		loadGoogleMap : loadGoogleMap
	}
})();