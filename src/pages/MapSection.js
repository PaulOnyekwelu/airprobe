import * as React from "react";
import ReactMapGl, { Marker, Popup } from "react-map-gl";
import { IoIosSchool } from "react-icons/io";
import { PopupImg } from "../images";

const MapSection = () => {
	const [selected, setSelected] = React.useState(false);
	const [viewport, setViewport] = React.useState({
		latitude: 45.4211,
		longitude: -75.6903,
		width: "100%",
		height: "100vh",
		zoom: 2,
	});

	return (
		<div className="map-section">
			<ReactMapGl
				{...viewport}
				mapStyle="mapbox://styles/silanka/ckh50ybbp00t519pfh1229ejt"
				mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
				onViewportChange={newViewport => setViewport(newViewport)}
			>
				<Marker latitude={53.311679} longitude={-113.311679}>
					<IoIosSchool
						size="2rem"
						color="white"
						onClick={() => {
							setSelected(!selected);
						}}
					/>
				</Marker>
				{selected && (
					<Popup latitude={53.311679} longitude={-113.311679} onClose={() => setSelected(false)}>
						<div style={{width:"350px", padding: "1rem"}}>
							<img src={PopupImg} style={{width:"100%"}} alt="University of Alberta" />
							<h2>University of Alberta</h2>
							<p>The great citadel of learning. I aspire to get a bachelors or masters degree from the University someday.</p>
						</div>
						
					</Popup>
				)}
			</ReactMapGl>
		</div>
	);
};

export default MapSection;
