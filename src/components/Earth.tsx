import React, { useEffect, useState } from 'react'
import Globe from 'react-globe.gl'
import { Country } from '../types'
import useCountryProvider from '../hooks/useCountryProvider'

export interface GlobePos {
  translateX: number
  scale: number
}

export default function Earth() {
  const [countries, setCountries] = useState<{ features: Country[] }>({
    features: []
  })
  const [hoveredCountry, setHoveredCountry] = useState<Country | null>(null)
  const [globePos, setGlobePos] = useState<GlobePos>({ translateX: 0, scale: 0.85 })
  const globeRef = React.useRef<any>(null)

  const selectedCountry = useCountryProvider()

  useEffect(() => {
    // Charger les données GeoJSON des pays
    fetch(
      'https://raw.githubusercontent.com/vasturiano/react-globe.gl/refs/heads/master/example/datasets/ne_110m_admin_0_countries.geojson'
    )
      .then(res => res.json())
      .then(setCountries)
  }, [])

  useEffect(() => {
    setGlobePos({ scale: 0.85, translateX: 0 })
  }, [selectedCountry.country])

  const calculateCentroid = (country: Country): { lat: number; lng: number } => {
    if (!country.geometry || !country.geometry.coordinates) {
      return { lat: 0, lng: 0 }
    }

    const { type, coordinates } = country.geometry

    if (type === 'MultiPolygon') {
      const merged = coordinates.flat(1)
      return calculateCentroidFromPolygon(merged)
    } else if (type === 'Polygon') {
      return calculateCentroidFromPolygon(coordinates)
    } else {
      return { lat: 0, lng: 0 }
    }
  }

  const calculateCentroidFromPolygon = (coordinates: any[]): { lat: number; lng: number } => {
    let totalPoints = 0
    let lngSum = 0
    let latSum = 0

    coordinates.forEach(polygon => {
      polygon.forEach(([lng, lat]: [number, number]) => {
        lngSum += lng
        latSum += lat
        totalPoints++
      })
    })

    return {
      lat: latSum / totalPoints,
      lng: lngSum / totalPoints
    }
  }

  const handlePolygonClick = (country: Country) => {
    const centroid = calculateCentroid(country)
    selectedCountry.setCountry(country)

    if (globeRef.current) globeRef.current.pointOfView({ ...centroid, altitude: 1.5 }, 1000)
  }

  return (
    <div
      className={selectedCountry.country ? 'globe-container modal-open' : 'globe-container'}
      style={{
        transform: `translateX(${globePos.translateX}px)`,
        transition: 'transform 1s ease, scale 1s ease',
        transformOrigin: 'center center',
        scale: globePos.scale
      }}
    >
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        lineHoverPrecision={0}
        polygonsData={countries.features.filter(d => d.properties.ISO_A2 !== 'AQ')}
        polygonAltitude={d => (d === selectedCountry.country || d === hoveredCountry ? 0.12 : 0.06)}
        polygonCapColor={d =>
          d === selectedCountry.country
            ? 'rgba(255, 255, 255, 0.9)'
            : d === hoveredCountry
            ? 'rgba(255, 255, 255, 0.7)'
            : 'rgba(255, 255, 255, 0.3)'
        }
        polygonSideColor={() => 'rgba(255, 255, 255, 0.1)'}
        polygonStrokeColor={() => 'rgba(255, 255, 255, 0.5)'}
        polygonLabel={({ properties: d }: any) => `<div class="select-none"><b>${d.ADMIN} (${d.ISO_A2}):</b></div>`}
        onPolygonHover={(x: any, _) => setHoveredCountry(x as Country)}
        onPolygonClick={(x: any) => handlePolygonClick(x as Country)}
        polygonsTransitionDuration={300}
      />
    </div>
  )
}
