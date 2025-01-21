import React, { useEffect, useState } from "react";
import Globe from "react-globe.gl";


interface Country {
    properties: {
        ADMIN: string; // Nom du pays
        ISO_A2: string; // Code ISO
        GDP_MD_EST: number; // PIB estimé
        POP_EST: number; // Population estimée
    };
    geometry: {
        type: string;
        coordinates: any;
    };
}

interface EarthProps {
    onCountrySelect: (country: Country) => void;
    isModalOpen: boolean;
}

const Earth: React.FC<EarthProps> = ({ onCountrySelect, isModalOpen }) => {
    const [countries, setCountries] = useState<{ features: Country[] }>({ features: [] });
    const [hoverD, setHoverD] = useState<Country | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const globeRef = React.useRef<any>(null);

    useEffect(() => {
        // Charger les données GeoJSON des pays
        fetch(
            "https://raw.githubusercontent.com/vasturiano/react-globe.gl/refs/heads/master/example/datasets/ne_110m_admin_0_countries.geojson"
        )
            .then((res) => res.json())
            .then(setCountries);
    }, []);

    useEffect(() => {
        if (!isModalOpen) {
            // Si la modal est fermée, supprimer la sélection
            setSelectedCountry(null);
        }
    }, [isModalOpen]);

    const calculateCentroid = (country: Country): { lat: number; lng: number } => {
        if (!country.geometry || !country.geometry.coordinates) {
            return { lat: 0, lng: 0 };
        }

        const { type, coordinates } = country.geometry;

        if (type === "MultiPolygon") {
            const merged = coordinates.flat(1); // Combine all polygons
            return calculateCentroidFromPolygon(merged);
        } else if (type === "Polygon") {
            return calculateCentroidFromPolygon(coordinates);
        } else {
            return { lat: 0, lng: 0 };
        }
    };

    const calculateCentroidFromPolygon = (coordinates: any[]): { lat: number; lng: number } => {
        let totalPoints = 0;
        let lngSum = 0;
        let latSum = 0;

        coordinates.forEach((polygon) => {
            polygon.forEach(([lng, lat]: [number, number]) => {
                lngSum += lng;
                latSum += lat;
                totalPoints++;
            });
        });

        return {
            lat: latSum / totalPoints,
            lng: lngSum / totalPoints,
        };
    };

    const handlePolygonClick = (country: Country) => {
        const centroid = calculateCentroid(country);
        setSelectedCountry(country);

        if (globeRef.current) {
            globeRef.current.pointOfView({ ...centroid, altitude: 1.5 }, 1000);
        }
        onCountrySelect(country);
    };

    return (
        <div className={isModalOpen ? "globe-container modal-open" : "globe-container"}>
            <Globe
                ref={globeRef}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                lineHoverPrecision={0}
                polygonsData={countries.features.filter((d) => d.properties.ISO_A2 !== "AQ")}
                polygonAltitude={(d) =>
                    d === hoverD || d === selectedCountry ? 0.12 : 0.06
                }
                polygonCapColor={(d) =>
                    d === selectedCountry
                        ? "rgba(255, 255, 255, 0.9)" // Pays sélectionné en surbrillance
                        : d === hoverD
                            ? "rgba(255, 255, 255, 0.7)" // Pays survolé
                            : "rgba(255, 255, 255, 0.3)" // Autres pays
                }
                polygonSideColor={() => "rgba(255, 255, 255, 0.1)"}
                polygonStrokeColor={() => "rgba(255, 255, 255, 0.5)"}
                polygonLabel={({ properties: d }) => (
                    `<div><b>${d.ADMIN} (${d.ISO_A2}):</b></div>`
                )}
                onPolygonHover={setHoverD}
                onPolygonClick={handlePolygonClick}
                polygonsTransitionDuration={300}
            />
        </div>
    );
};

export default Earth;
