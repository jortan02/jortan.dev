"use client"

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
        background: {
            color: {
                value: "#171717",
            },
        },
        particles: {
            color: {
                value: "#a1a1aa",
            },
            links: {
                color: "#a1a1aa",
                distance: 200,
                enable: true,
            },
            move: {
                enable: true,
                outModes: {
                    default: "out",
                },
                random: true,
                speed: 0.2,
                straight: true,
            },
            number: {
                value: 80,
                density: {
                  enable: true,
                  value_area: 800
                }
            },
            size: {
                value: 1,
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                resize: {
                  enable: true
                }
              },
            },
            
        },
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="-z-50 absolute"
      />
    );
  }

  return <></>;
};