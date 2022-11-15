import React, {
	Suspense,
	useEffect,
	useState,
	useRef,
	forwardRef,
	ForwardedRef,
	MutableRefObject,
} from 'react';
import { arcs } from './globeLandmarks';
import ReactGlobeGL, { GlobeMethods, GlobeProps } from 'react-globe.gl';

function Globe() {
	const globeRef = useRef<GlobeMethods>();

	const [countries, setCountries] = useState<any>([]);

	useEffect(() => {
		const fetchGeoJson = async () => {
			const res = await fetch('/all-countries.geojson');
			setCountries(await res.json());
		};

		fetchGeoJson();
	}, []);

	return (
		<Suspense>
			<ReactGlobeGL
				ref={globeRef}
				animateIn={false}
				globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
				arcsData={arcs}
				arcColor="color"
				onGlobeReady={() => {
					globeRef.current?.pointOfView({
						altitude: 1,
						lat: 22.51,
						lng: -81.43,
					});
				}}
			/>
		</Suspense>
	);
}

export default Globe;
