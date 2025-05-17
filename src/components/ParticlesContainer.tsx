"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
	type Container,
	type ISourceOptions,
	MoveDirection,
	OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.

export const ParticlesContainer = () => {
	const [init, setInit] = useState(false);

	// this should be run only once per application lifetime
	useEffect(() => {
		initParticlesEngine(async (engine) => {
			// you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
			// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
			// starting from v2 you can add only the features you need reducing the bundle size
			//await loadAll(engine);
			//await loadFull(engine);
			await loadSlim(engine);
			//await loadBasic(engine);
		}).then(() => {
			setInit(true);
		});
	}, []);

	const particlesLoaded = async (container?: Container): Promise<void> => {
		console.log(container);
	};

	const options: ISourceOptions = useMemo(
		() => ({
			particles: {
				number: {
					value: 80,
					density: {
						enable: true,
						value_area: 800,
					},
				},
				color: {
					value: "#a1a1aa",
				},
				shape: {
					type: "circle",
				},
				opacity: {
					value: 1,
				},
				size: {
					value: 1,
				},
				links: {
					color: "#a1a1aa",
					distance: 200,
					enable: true,
					width: 1,
					opacity: 1,
				},
				move: {
					enable: true,
					speed: 0.2,
					direction: "none",
					random: false,
					straight: false,
					outModes: "bounce",
				},
			},
			interactivity: {
				detect_on: "canvas",
			},
			detectRetina: false,
		}),
		[]
	);

	if (init) {
		return (
			<Particles
				id="tsparticles"
				particlesLoaded={particlesLoaded}
				options={options}
				className="-z-50 absolute animate-fade-in"
			/>
		);
	}

	return <></>;
};
