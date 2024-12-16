import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";

interface MapComponentProps {
    lat: number;
    lng: number;
}

function MapComponent({ lat, lng }: MapComponentProps) {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "";
    const mapID = process.env.REACT_APP_GOOGLE_MAPS_MAP_ID || "";

    const position = { lat, lng };

    return (
        <APIProvider apiKey={apiKey}>
            <div style={{
                height: "250px",
                borderRadius: "20px",
                overflow: "hidden", 
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}>
                <Map
                    defaultCenter={position}
                    defaultZoom={12}
                    mapId={mapID}
                    style={{ width: "100%", height: "100%" }}
                >
                    <AdvancedMarker position={position} />
                </Map>
            </div>
        </APIProvider>
    );
}

export default MapComponent;
