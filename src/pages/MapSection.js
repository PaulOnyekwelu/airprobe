import * as React from "react";
import ReactMapGl from "react-map-gl";

const MapSection = () => {
	const [viewport, setViewport] = React.useState({
		latitude: 45.4211,
		longitude: -75.6903,
		width: "100%",
		height: "100vh",
		zoom: 10,
    });

	return (
		<div className="map-section">
			<ReactMapGl
                {...viewport}
                mapStyle="mapbox://styles/silanka/ckh50ybbp00t519pfh1229ejt"
                mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
                onViewportChange = {newViewport => setViewport(newViewport)}
			>
			
			</ReactMapGl>
		</div>
	);
};

export default MapSection;
