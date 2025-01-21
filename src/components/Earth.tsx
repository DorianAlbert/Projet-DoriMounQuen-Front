import React, { useEffect, useMemo, useState } from "react";
import Globe from "react-globe.gl";
import { scaleSequentialSqrt } from "d3-scale";
import { interpolateBlues } from "d3-scale-chromatic";

interface Country {
    properties: {
        ADMIN: string; // Nom du pays
        ISO_A2: string; // Code ISO
        GDP_MD_EST: number; // PIB estimé
        POP_EST: number; // Population estimée
    };
    geometry: {
        coordinates: any; // Coordonnées géographiques
    };
}

interface EarthProps {
    onCountrySelect: (country: Country) => void;
}

const Earth: React.FC<EarthProps> = ({ onCountrySelect }) => {
    const [countries, setCountries] = useState<{ features: Country[] }>({ features: [] });
    const [hoverD, setHoverD] = useState<Country | null>(null);
    const globeRef = React.useRef<any>(null);

    useEffect(() => {
        // Charger les données GeoJSON des pays
        fetch(
            "https://raw.githubusercontent.com/vasturiano/react-globe.gl/refs/heads/master/example/datasets/ne_110m_admin_0_countries.geojson"
        )
            .then((res) => res.json())
            .then(setCountries);
    }, []);

    const colorScale = scaleSequentialSqrt(interpolateBlues);

    const getVal = (feat: Country) =>
        feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);

    const maxVal = useMemo(
        () => Math.max(...countries.features.map(getVal)),
        [countries]
    );
    colorScale.domain([0, maxVal]);

    const calculateCentroid = (coordinates: any): { lat: number; lng: number } => {
        if (!coordinates || coordinates.length === 0) return { lat: 0, lng: 0 };

        // Récupération des coordonnées du premier polygone pour calculer le centroïde
        const [lngSum, latSum] = coordinates[0][0].reduce(
            ([lngAcc, latAcc]: number[], [lng, lat]: number[]) => [
                lngAcc + lng,
                latAcc + lat,
            ],
            [0, 0]
        );
        const totalPoints = coordinates[0][0].length;
        return {
            lat: latSum / totalPoints,
            lng: lngSum / totalPoints,
        };
    };

    const handlePolygonClick = (country: Country) => {
        const { lat, lng } = calculateCentroid(country.geometry.coordinates);

        if (globeRef.current) {
            globeRef.current.pointOfView({ lat, lng, altitude: 1.5 }, 1000);
        }
        onCountrySelect(country);
    };

    return (
        <Globe
            ref={globeRef}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            lineHoverPrecision={0}
            polygonsData={countries.features.filter((d) => d.properties.ISO_A2 !== "AQ")}
            polygonAltitude={(d) => (d === hoverD ? 0.12 : 0.06)}
            polygonCapColor={(d) =>
                d === hoverD ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.3)"
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
    );
};

export default Earth;
