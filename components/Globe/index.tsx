import React, {
	Suspense,
	useEffect,
	useState,
	useRef,
	forwardRef,
} from 'react';
import dynamic from 'next/dynamic';
import { arcs } from './globeLandmarks';
import { GlobeMethods } from 'react-globe.gl';

const ReactGlobeGL = dynamic(() => import('react-globe.gl'), {
	ssr: false,
});

// eslint-disable-next-line react/display-name
const GlobeTemplate = forwardRef((props: any, ref) => (
	<ReactGlobeGL {...props} ref={ref} />
));

function Globe() {
	const globeRef = useRef();

	const [countries, setCountries] = useState<any>([]);

	useEffect(() => {
		const fetchGeoJson = async () => {
			const res = await fetch('/all-countries.geojson');
			setCountries(await res.json());
		};

		fetchGeoJson();

		// aim at continental US centroid
		globeRef.current?.pointOfView({ lat: 39.6, lng: -98.5, altitude: 2 });
	}, [globeRef.current]);

	return (
		<Suspense>
			<GlobeTemplate
				ref={globeRef}
				animateIn={false}
				globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
				arcsData={arcs}
				arcColor="color"
			/>
		</Suspense>
	);
}

export default Globe;
