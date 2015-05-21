var GMapsHotel = (function (GMaps) {
	var mapsData = [],
		navigationId = 'mapnavigation';
 
	var mapConfig = {
		zoom: 12,
		markerImg: 'hotel_0star.png',
		markerImgWidth: 32,
		markerImgHeight: 37
	};
 
	var loadMap = function(index)	{
		GMaps.configGoogleMap(mapConfig);
		GMaps.loadGoogleMap(mapsData[index]);
		document.getElementById("map-head").innerHTML = mapsData[index].name;
		return true;
	};

	var init = function (data)	{ 

		mapsData = data;
	
		loadMap(0);
  
		var maps = document.getElementById(navigationId).children[0];
		childs = maps.children;
		
		for(i=0;i<childs.length;i++){
			childs[i].children[0].addEventListener("click", function(e) {
				e.preventDefault();
				clearSelected();
				this.setAttribute('class','active');
				loadMap(this.getAttribute("data-index"));
			}, false);
		}
		return true;
	};

	var clearSelected = function(){
	
		var maps = document.getElementById(navigationId).children[0];
		childs = maps.children;
		
		for(i=0;i<childs.length;i++){
			childs[i].children[0].removeAttribute('class');
		}
		return true;
	};
	
    return {
        init : init
    };
    
})(GMaps);

GMapsHotel.init(mapData);




