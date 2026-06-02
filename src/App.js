import React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three";

const catalog = {
  crestTeeOxford: {
    name: "Crest T-Shirt Oxford",
    category: "tshirt",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Harvard-Crest-T-Shirt-Quality-199894672.jpg?v=1754063343&width=1220",
  },
  crestTeeNavy: {
    name: "Crest T-Shirt Navy",
    category: "tshirt",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Harvard-Crest-T-Shirt-Quality-199895040.jpg?v=1754063343&width=1220",
  },
  crestTeeWhite: {
    name: "Crest T-Shirt White",
    category: "tshirt",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/HarvardCrestT-Shirt_White.jpg?v=1754063343&width=1220",
  },
  harvardArcTeeCrimson: {
    name: "Harvard Arc T-Shirt Crimson",
    category: "tshirt",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Harvard-Arc-T-Shirt-Quality-199895987.jpg?v=1750257252&width=1220",
  },
  harvardArcTeeOxford: {
    name: "Harvard Arc T-Shirt Oxford",
    category: "tshirt",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Harvard-Arc-T-Shirt-Quality-199896729.jpg?v=1750257252&width=1220",
  },
  harvardArcTeeBlack: {
    name: "Harvard Arc T-Shirt Black",
    category: "tshirt",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Harvard-Arc-T-Shirt-Quality-199896311.jpg?v=1750257252&width=1220",
  },
  harvardArcTeeWhite: {
    name: "Harvard Arc T-Shirt White",
    category: "tshirt",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/HarvardArcT-Shirt_White.jpg?v=1754063103&width=1220",
  },

  crestHoodCrimson: {
    name: "Crest Hood Crimson",
    category: "hoodie",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Harvard-Hooded-Crest-Sweatshirt-Quality-199988176.jpg?v=1720623769&width=1220",
  },
  crestHoodNavy: {
    name: "Crest Hood Navy",
    category: "hoodie",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Harvard-Hooded-Crest-Sweatshirt-Quality-199987681.jpg?v=1720623777&width=1220",
  },
  crestHoodOxford: {
    name: "Crest Hood Oxford",
    category: "hoodie",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Harvard-Hooded-Crest-Sweatshirt-Quality-199988554.jpg?v=1720623764&width=1220",
  },
  proWeaveHoodCrimson: {
    name: "Pro-Weave Hood Crimson",
    category: "hoodie",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Pro-Weave-Hood-Quality-199932325.jpg?v=1720622066&width=1220",
  },
  proWeaveHoodOatmeal: {
    name: "Pro-Weave Hood Oatmeal",
    category: "hoodie",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Pro-Weave-Hood-Quality-199931913.jpg?v=1720622085&width=1220",
  },
  hoodedArcCrimson: {
    name: "Harvard Hooded Arc Sweatshirt Crimson",
    category: "hoodie",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Harvard-Hooded-Arc-Sweatshirt-Quality-199898177.jpg?v=1720621069&width=1220",
  },
  hoodedArcOxford: {
    name: "Harvard Hooded Arc Sweatshirt Oxford",
    category: "hoodie",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Harvard-Hooded-Arc-Sweatshirt-Quality-199897646.jpg?v=1720621060&width=1220",
  },

  benchmarkCrewNavy: {
    name: "Benchmark Crew Navy",
    category: "crewneck",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Benchmark-Crew-Ouray-200008257.jpg?v=1720624426&width=1220",
  },
  benchmarkCrewRed: {
    name: "Benchmark Crew Red",
    category: "crewneck",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Benchmark-Crew-Ouray-200008852.jpg?v=1720624387&width=1220",
  },
  benchmarkCrewOxford: {
    name: "Benchmark Crew Oxford",
    category: "crewneck",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Benchmark-Crew-Ouray-200009444.jpg?v=1720624384&width=1220",
  },
  proWeaveCrewBlack: {
    name: "Pro-Weave Crew Black",
    category: "crewneck",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Pro-Weave-Crewneck-Quality-199940174.jpg?v=1750257160&width=1220",
  },
  proWeaveCrewOxford: {
    name: "Pro-Weave Crew Oxford",
    category: "crewneck",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Pro-WeaveCrewneck_Oatmeal.jpg?v=1754063820&width=1220",
  },
  crestCrewCrimson: {
    name: "Harvard Crest Crewneck Crimson",
    category: "crewneck",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Harvard-Crest-Crewneck-Quality-199994052.jpg?v=1720623986&width=1220",
  },
  crestCrewOxford: {
    name: "Harvard Crest Crewneck Oxford",
    category: "crewneck",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Harvard-Crest-Crewneck-Quality-199994428.jpg?v=1720623958&width=1220",
  },
  arcCrewCrimson: {
    name: "Harvard Arc Crewneck Crimson",
    category: "crewneck",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Harvard-Arc-Crewneck-Quality-199995115.jpg?v=1720624015&width=1220",
  },
  arcCrewOxford: {
    name: "Harvard Arc Crewneck Oxford",
    category: "crewneck",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Harvard-Arc-Crewneck-Quality-199995558.jpg?v=1720623994&width=1220",
  },

  hSweaterCrimson: {
    name: "The H Sweater Crimson",
    category: "sweater",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/The-H-Sweater-Varsity-200070268.jpg?v=1720626274&width=1220",
  },
  hSweaterCream: {
    name: "The H Sweater Cream",
    category: "sweater",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/The-H-Sweater-Varsity-200070712.jpg?v=1720626276&width=1220",
  },

  plaidPajamaCrimson: {
    name: "Plaid Pajama Pants Crimson",
    category: "bottoms",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Plaid-Pajama-Pants-Concepts-Sport-200004480.jpg?v=1720624256&width=1220",
  },
  plaidPajamaGrey: {
    name: "Plaid Pajama Pants Grey",
    category: "bottoms",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Plaid-Pajama-Pants-Concepts-Sport-200004955.jpg?v=1720624264&width=1220",
  },
  garityShortsCrimson: {
    name: "Garity Shorts Crimson",
    category: "bottoms",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/The-Garity-Shorts-Atla-Global-200061861.png?v=1720626005&width=1220",
  },
  garityShortsBlack: {
    name: "Garity Shorts Black",
    category: "bottoms",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/The-Garity-Shorts-Atla-Global-200062351.png?v=1720626002&width=1220",
  },
  championSweatpantsGrey: {
    name: "Champion Cuffed Sweatpants Grey",
    category: "bottoms",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/HarvardChampionCuffedSweatpants.jpg?v=1754063127&width=1220",
  },

  nikePoloBlack: {
    name: "Harvard Nike Varsity Polo Black",
    category: "polo",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Harvard-Nike-Varsity-Polo-Branded-Custom-Sportswear-200066247.jpg?v=1750102299&width=1220",
  },
  nikePoloCrimson: {
    name: "Harvard Nike Varsity Polo Crimson",
    category: "polo",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/HarvardNikeVarsityPolo_Crimson.jpg?v=1754063523&width=1220",
  },
};

function ProductCard({ productId, x = 0, y = 1.2, z = 0, scale = 1 }) {
  const product = catalog[productId];
  const texture = useLoader(TextureLoader, product.image);

  return (
    <group position={[x, y, z]} scale={scale}>
      <mesh>
        <boxGeometry args={[0.5, 0.65, 0.04]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  );
}

function WallSegment({ start, end, height = 3.5 }) {
  const [x1, z1] = start;
  const [x2, z2] = end;
  const length = Math.sqrt((x2 - x1) ** 2 + (z2 - z1) ** 2);
  const x = (x1 + x2) / 2;
  const z = (z1 + z2) / 2;
  const rotation = -Math.atan2(z2 - z1, x2 - x1);

  return (
    <mesh position={[x, height / 2, z]} rotation={[0, rotation, 0]}>
      <boxGeometry args={[length, height, 0.25]} />
      <meshStandardMaterial color="#f5f5f5" />
    </mesh>
  );
}

function FourWayRack({ x, z, rotation = 0, products = [] }) {
  const arms = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];

  return (
    <group position={[x, 0, z]} rotation={[0, rotation, 0]}>
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 2]} />
        <meshStandardMaterial color="#777" />
      </mesh>

      {arms.map((r, i) => (
        <group key={i} rotation={[0, r, 0]}>
          <mesh position={[0.55, 1.6, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.035, 0.035, 1.1]} />
            <meshStandardMaterial color="#777" />
          </mesh>

          <ProductCard
            productId={products[i % products.length]}
            x={0.55}
            y={1.15}
            z={0}
          />
        </group>
      ))}

      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.1, 32]} />
        <meshStandardMaterial color="#cfcfcf" />
      </mesh>
    </group>
  );
}

function WallHookRack({ x, z, rotation = 0, product }) {
  return (
    <group position={[x, 0, z]} rotation={[0, rotation, 0]}>
      <mesh position={[0, 1.8, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.7]} />
        <meshStandardMaterial color="#9ca3af" />
      </mesh>

      <mesh position={[0, 1.0, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.7]} />
        <meshStandardMaterial color="#9ca3af" />
      </mesh>

      <ProductCard productId={product} x={0} y={1.55} z={0.65} scale={0.75} />
      <ProductCard productId={product} x={0} y={0.75} z={0.65} scale={0.75} />
    </group>
  );
}

function DisplayTable({ x, z, rotation = 0, products = [] }) {
  return (
    <group position={[x, 0, z]} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[2.4, 0.2, 1.15]} />
        <meshStandardMaterial color="#8b5a2b" />
      </mesh>

      {products.slice(0, 4).map((p, i) => (
        <ProductCard
          key={i}
          productId={p}
          x={-0.75 + i * 0.5}
          y={0.83}
          z={0}
          scale={0.65}
        />
      ))}
    </group>
  );
}

function HorizontalRack({ x, z, rotation = 0, products = [] }) {
  return (
    <group position={[x, 0, z]} rotation={[0, rotation, 0]}>
      <mesh position={[0, 1.4, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 2.5]} />
        <meshStandardMaterial color="#777" />
      </mesh>

      <mesh position={[-1.15, 0.75, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.4]} />
        <meshStandardMaterial color="#777" />
      </mesh>

      <mesh position={[1.15, 0.75, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.4]} />
        <meshStandardMaterial color="#777" />
      </mesh>

      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[2.8, 0.1, 0.5]} />
        <meshStandardMaterial color="#cfcfcf" />
      </mesh>

      {products.slice(0, 5).map((p, i) => (
        <ProductCard
          key={i}
          productId={p}
          x={-0.8 + i * 0.4}
          y={1.15}
          z={0}
          scale={0.65}
        />
      ))}
    </group>
  );
}

export default function App() {
  const fixtures = [
    {
      type: "fourWay",
      x: -5.7,
      z: -2.7,
      rotation: 0.8,
      products: [
        "harvardArcTeeCrimson",
        "harvardArcTeeOxford",
        "harvardArcTeeBlack",
        "harvardArcTeeWhite",
      ],
    },
    {
      type: "fourWay",
      x: 1.1,
      z: -3.2,
      rotation: 0.8,
      products: [
        "crestHoodCrimson",
        "crestHoodNavy",
        "crestHoodOxford",
        "proWeaveHoodOatmeal",
      ],
    },
    {
      type: "fourWay",
      x: 2.4,
      z: -1.0,
      rotation: 0.8,
      products: [
        "benchmarkCrewNavy",
        "benchmarkCrewRed",
        "benchmarkCrewOxford",
        "proWeaveCrewBlack",
      ],
    },
    {
      type: "fourWay",
      x: 4.9,
      z: 0.2,
      rotation: 0.8,
      products: [
        "crestTeeOxford",
        "crestTeeNavy",
        "crestTeeWhite",
        "harvardArcTeeCrimson",
      ],
    },
    {
      type: "fourWay",
      x: -6.1,
      z: 4.0,
      rotation: 0.8,
      products: [
        "plaidPajamaCrimson",
        "plaidPajamaGrey",
        "garityShortsCrimson",
        "championSweatpantsGrey",
      ],
    },
    {
      type: "fourWay",
      x: 0.6,
      z: 4.3,
      rotation: 0.8,
      products: [
        "hSweaterCrimson",
        "hSweaterCream",
        "arcCrewCrimson",
        "arcCrewOxford",
      ],
    },
    {
      type: "fourWay",
      x: 3.8,
      z: 3.7,
      rotation: 0.8,
      products: [
        "nikePoloBlack",
        "nikePoloCrimson",
        "hoodedArcCrimson",
        "hoodedArcOxford",
      ],
    },
    {
      type: "horizontal",
      x: 0.7,
      z: -4.0,
      rotation: 0.45,
      products: [
        "crestHoodCrimson",
        "crestHoodNavy",
        "crestHoodOxford",
        "proWeaveHoodCrimson",
      ],
    },
    {
      type: "table",
      x: -6.1,
      z: 0.5,
      rotation: 0,
      products: [
        "harvardArcTeeCrimson",
        "harvardArcTeeOxford",
        "harvardArcTeeBlack",
        "harvardArcTeeWhite",
      ],
    },
    {
      type: "table",
      x: -1.2,
      z: 1.2,
      rotation: 0.45,
      products: [
        "benchmarkCrewNavy",
        "benchmarkCrewRed",
        "benchmarkCrewOxford",
        "proWeaveCrewOxford",
      ],
    },
  ];

  const wallProducts = [
    "harvardArcTeeCrimson",
    "harvardArcTeeOxford",
    "harvardArcTeeBlack",
    "harvardArcTeeWhite",
    "crestTeeOxford",
    "crestTeeNavy",
    "crestTeeWhite",
    "crestHoodCrimson",
    "crestHoodNavy",
    "benchmarkCrewRed",
    "benchmarkCrewOxford",
    "proWeaveCrewBlack",
  ];

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#f2f2f2" }}>
      <Canvas camera={{ position: [18, 18, 18], fov: 55 }} shadows>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 20, 10]} intensity={1} castShadow />

        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[22, 20]} />
          <meshStandardMaterial color="#bfbfbf" />
        </mesh>

        <WallSegment start={[-8.5, -7.5]} end={[1.5, -7.5]} />
        <WallSegment start={[1.5, -7.5]} end={[7.4, -1.8]} />
        <WallSegment start={[7.4, -1.8]} end={[8.7, 1.8]} />
        <WallSegment start={[8.7, 1.8]} end={[5.8, 5.3]} />
        <WallSegment start={[5.8, 5.3]} end={[0.8, 7.5]} />
        <WallSegment start={[0.8, 7.5]} end={[-1.1, 7.5]} />
        <WallSegment start={[-3.2, 7.5]} end={[-8.5, 7.5]} />
        <WallSegment start={[-8.5, 7.5]} end={[-8.5, -7.5]} />

        {fixtures.map((f, i) => {
          if (f.type === "fourWay") {
            return <FourWayRack key={i} {...f} />;
          }
          if (f.type === "horizontal") {
            return <HorizontalRack key={i} {...f} />;
          }
          if (f.type === "table") {
            return <DisplayTable key={i} {...f} />;
          }
          return null;
        })}

        <WallHookRack
          x={-7.2}
          z={-7.25}
          rotation={0}
          product={wallProducts[0]}
        />
        <WallHookRack
          x={-5.7}
          z={-7.25}
          rotation={0}
          product={wallProducts[1]}
        />
        <WallHookRack
          x={-4.3}
          z={-7.25}
          rotation={0}
          product={wallProducts[2]}
        />
        <WallHookRack
          x={-3.0}
          z={-7.25}
          rotation={0}
          product={wallProducts[3]}
        />
        <WallHookRack
          x={-1.7}
          z={-7.25}
          rotation={0}
          product={wallProducts[4]}
        />
        <WallHookRack
          x={0.8}
          z={-7.15}
          rotation={-0.18}
          product={wallProducts[5]}
        />
        <WallHookRack
          x={2.3}
          z={-6.4}
          rotation={-0.72}
          product={wallProducts[6]}
        />
        <WallHookRack
          x={3.7}
          z={-5.0}
          rotation={-0.72}
          product={wallProducts[7]}
        />
        <WallHookRack
          x={5.0}
          z={-3.6}
          rotation={-0.72}
          product={wallProducts[8]}
        />
        <WallHookRack
          x={6.2}
          z={-2.0}
          rotation={-1.02}
          product={wallProducts[9]}
        />
        <WallHookRack
          x={7.0}
          z={-0.4}
          rotation={-1.02}
          product={wallProducts[10]}
        />
        <WallHookRack
          x={7.5}
          z={1.4}
          rotation={-1.02}
          product={wallProducts[11]}
        />

        <OrbitControls enableDamping dampingFactor={0.1} />
      </Canvas>
    </div>
  );
}
