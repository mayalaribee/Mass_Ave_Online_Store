import React, { useEffect, useState } from "react";
#testwhyisntitworking
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three";

const catalog = {
  harvardArcTeeCrimson: {
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Harvard-Arc-T-Shirt-Quality-199895987.jpg?v=1750257252&width=1220",
  },
  harvardArcTeeOxford: {
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Harvard-Arc-T-Shirt-Quality-199896729.jpg?v=1750257252&width=1220",
  },
  harvardArcTeeBlack: {
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Harvard-Arc-T-Shirt-Quality-199896311.jpg?v=1750257252&width=1220",
  },
  harvardArcTeeWhite: {
    image:
      "https://www.theharvardshop.com/cdn/shop/files/HarvardArcT-Shirt_White.jpg?v=1754063103&width=1220",
  },
  crestTeeOxford: {
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Harvard-Crest-T-Shirt-Quality-199894672.jpg?v=1754063343&width=1220",
  },
  crestTeeNavy: {
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Harvard-Crest-T-Shirt-Quality-199895040.jpg?v=1754063343&width=1220",
  },
  crestTeeWhite: {
    image:
      "https://www.theharvardshop.com/cdn/shop/files/HarvardCrestT-Shirt_White.jpg?v=1754063343&width=1220",
  },
  crestHoodCrimson: {
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Harvard-Hooded-Crest-Sweatshirt-Quality-199988176.jpg?v=1720623769&width=1220",
  },
  crestHoodNavy: {
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Harvard-Hooded-Crest-Sweatshirt-Quality-199987681.jpg?v=1720623777&width=1220",
  },
  crestHoodOxford: {
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Harvard-Hooded-Crest-Sweatshirt-Quality-199988554.jpg?v=1720623764&width=1220",
  },
  benchmarkCrewNavy: {
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Benchmark-Crew-Ouray-200008257.jpg?v=1720624426&width=1220",
  },
  benchmarkCrewRed: {
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Benchmark-Crew-Ouray-200008852.jpg?v=1720624387&width=1220",
  },
  benchmarkCrewOxford: {
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Benchmark-Crew-Ouray-200009444.jpg?v=1720624384&width=1220",
  },
  proWeaveCrewBlack: {
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Pro-Weave-Crewneck-Quality-199940174.jpg?v=1750257160&width=1220",
  },
  proWeaveCrewOxford: {
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Pro-WeaveCrewneck_Oatmeal.jpg?v=1754063820&width=1220",
  },
  proWeaveHoodCrimson: {
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Pro-Weave-Hood-Quality-199932325.jpg?v=1720622066&width=1220",
  },
  proWeaveHoodOatmeal: {
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Pro-Weave-Hood-Quality-199931913.jpg?v=1720622085&width=1220",
  },

  // Temporary family tee entries. Replace these image URLs when you have the real links.
  brotherTee: {
    name: "Brother Tee",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Harvard-Arc-T-Shirt-Quality-199895987.jpg?v=1750257252&width=1220",
  },
  sisterTee: {
    name: "Sister Tee",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Harvard-Arc-T-Shirt-Quality-199895987.jpg?v=1750257252&width=1220",
  },
  grandmaTee: {
    name: "Grandma Tee",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Harvard-Arc-T-Shirt-Quality-199895987.jpg?v=1750257252&width=1220",
  },
  grandpaTee: {
    name: "Grandpa Tee",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Harvard-Arc-T-Shirt-Quality-199895987.jpg?v=1750257252&width=1220",
  },
  momTee: {
    name: "Mom Tee",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Harvard-Arc-T-Shirt-Quality-199895987.jpg?v=1750257252&width=1220",
  },
  dadTee: {
    name: "Dad Tee",
    image:
      "https://www.theharvardshop.com/cdn/shop/files/Harvard-Arc-T-Shirt-Quality-199895987.jpg?v=1750257252&width=1220",
  },
};
function WindowSegment({ start, end, height = 3.2 }) {
  const [x1, z1] = start;
  const [x2, z2] = end;

  const length = Math.sqrt((x2 - x1) ** 2 + (z2 - z1) ** 2);
  const x = (x1 + x2) / 2;
  const z = (z1 + z2) / 2;
  const rotation = -Math.atan2(z2 - z1, x2 - x1);

  return (
    <group position={[x, 0, z]} rotation={[0, rotation, 0]}>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[length, height, 0.08]} />
        <meshStandardMaterial
          color="#bfe7ff"
          transparent
          opacity={0.35}
          roughness={0.05}
          metalness={0.1}
        />
      </mesh>

      <mesh position={[0, height + 0.05, 0]}>
        <boxGeometry args={[length, 0.12, 0.16]} />
        <meshStandardMaterial color="#222" />
      </mesh>

      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[length, 0.12, 0.16]} />
        <meshStandardMaterial color="#222" />
      </mesh>

      {[-0.33, 0, 0.33].map((p) => (
        <mesh key={p} position={[length * p, height / 2, 0]}>
          <boxGeometry args={[0.06, height, 0.16]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      ))}
    </group>
  );
}
function DoubleDoor({ x, z, rotation = 0 }) {
  return (
    <group position={[x, 0, z]} rotation={[0, rotation, 0]}>
      <mesh position={[-0.45, 1.15, 0]}>
        <boxGeometry args={[0.85, 2.3, 0.08]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      <mesh position={[0.45, 1.15, 0]}>
        <boxGeometry args={[0.85, 2.3, 0.08]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      <mesh position={[-0.45, 1.15, 0.04]}>
        <boxGeometry args={[0.72, 1.9, 0.04]} />
        <meshStandardMaterial color="#bfe7ff" transparent opacity={0.45} />
      </mesh>

      <mesh position={[0.45, 1.15, 0.04]}>
        <boxGeometry args={[0.72, 1.9, 0.04]} />
        <meshStandardMaterial color="#bfe7ff" transparent opacity={0.45} />
      </mesh>

      <mesh position={[-0.1, 1.05, 0.12]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#c8a24a" />
      </mesh>

      <mesh position={[0.1, 1.05, 0.12]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#c8a24a" />
      </mesh>
    </group>
  );
}
const rackTypes = {
  fourWay: { label: "Four-Way Rack", slots: 4 },
  horizontal: { label: "Horizontal Rack", slots: 5 },
  threeWay: { label: "Family / Six-Hook Rack", slots: 6 },
  table: { label: "Display Table", slots: 4 },
  wallHook: { label: "Wall Hook Rack", slots: 2 },
};

function getSlotCount(type) {
  return rackTypes[type]?.slots || 4;
}

function makeEmptyProducts(type) {
  return Array(getSlotCount(type)).fill(null);
}

function ProductCard({
  productId,
  productCatalog,
  x = 0,
  y = 1.2,
  z = 0,
  scale = 1,
  rotation = [0, 0, 0],
}) {
  if (!productId) return null;

  const product = productCatalog?.[productId];
  const fallbackImage = catalog.harvardArcTeeCrimson.image;
  const texture = useLoader(TextureLoader, product?.image || fallbackImage);

  return (
    <group position={[x, y, z]} scale={scale} rotation={rotation}>
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

function FourWayRack({ fixture, selectedId, setSelectedId, productCatalog }) {
  const selected = selectedId === fixture.id;
  const arms = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];

  return (
    <group
      position={[fixture.x, 0, fixture.z]}
      rotation={[0, fixture.rotation, 0]}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedId(fixture.id);
      }}
    >
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
            productId={fixture.products[i] || null}
            productCatalog={productCatalog}
            x={0.55}
            y={1.15}
            z={0}
          />
        </group>
      ))}

      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
        <meshStandardMaterial color={selected ? "#2563eb" : "#cfcfcf"} />
      </mesh>
    </group>
  );
}

function DisplayTable({ fixture, selectedId, setSelectedId, productCatalog }) {
  const selected = selectedId === fixture.id;

  return (
    <group
      position={[fixture.x, 0, fixture.z]}
      rotation={[0, fixture.rotation, 0]}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedId(fixture.id);
      }}
    >
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[2.4, 0.2, 1.15]} />
        <meshStandardMaterial color={selected ? "#2563eb" : "#8b5a2b"} />
      </mesh>

      {fixture.products.slice(0, 4).map((p, i) => (
        <ProductCard
          key={i}
          productId={p}
          productCatalog={productCatalog}
          x={-0.75 + i * 0.5}
          y={0.83}
          z={0}
          scale={0.65}
        />
      ))}
    </group>
  );
}

function HorizontalRack({ fixture, selectedId, setSelectedId, productCatalog }) {
  const selected = selectedId === fixture.id;

  return (
    <group
      position={[fixture.x, 0, fixture.z]}
      rotation={[0, fixture.rotation, 0]}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedId(fixture.id);
      }}
    >
      <mesh position={[0, 1.4, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 2.5]} />
        <meshStandardMaterial color={selected ? "#2563eb" : "#777"} />
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

      {fixture.products.slice(0, 5).map((p, i) => (
        <ProductCard
          key={i}
          productId={p}
          productCatalog={productCatalog}
          x={-0.75 + i * 0.75}
          y={1.15}
          z={0.15}
          scale={0.8}
        />
      ))}
    </group>
  );
}

function WallHookRack({
  fixture,
  selectedId,
  setSelectedId,
  productCatalog,
  x,
  z,
  rotation = 0,
  product,
}) {
  const isFixture = !!fixture;
  const selected = fixture && selectedId === fixture.id;

  const rackX = fixture ? fixture.x : x;
  const rackZ = fixture ? fixture.z : z;
  const rackRotation = fixture ? fixture.rotation : rotation;
  const products = fixture ? fixture.products || [] : [product, product];

  return (
    <group
      position={[rackX, 0, rackZ]}
      rotation={[0, rackRotation, 0]}
      onClick={(e) => {
        if (!isFixture) return;
        e.stopPropagation();
        setSelectedId(fixture.id);
      }}
    >
      <mesh position={[0, 1.8, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.7]} />
        <meshStandardMaterial color={selected ? "#2563eb" : "#9ca3af"} />
      </mesh>

      <mesh position={[0, 1.0, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.7]} />
        <meshStandardMaterial color={selected ? "#2563eb" : "#9ca3af"} />
      </mesh>

      <ProductCard
        productId={products[0]}
        productCatalog={productCatalog}
        x={0}
        y={1.55}
        z={0.65}
        scale={0.75}
      />

      <ProductCard
        productId={products[1]}
        productCatalog={productCatalog}
        x={0}
        y={0.75}
        z={0.65}
        scale={0.75}
      />
    </group>
  );
}
function ThreeWayRack({ fixture, selectedId, setSelectedId, productCatalog }) {
  const selected = selectedId === fixture.id;
  const products = fixture.products || [];
  const hookPositions = [-0.6, 0, 0.6];

  return (
    <group
      position={[fixture.x, 0, fixture.z]}
      rotation={[0, fixture.rotation, 0]}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedId(fixture.id);
      }}
    >
      {/* base */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[2.4, 0.1, 0.6]} />
        <meshStandardMaterial color={selected ? "#2563eb" : "#cfcfcf"} />
      </mesh>

      {/* two legs */}
      <mesh position={[-0.9, 0.75, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.4]} />
        <meshStandardMaterial color="#777" />
      </mesh>

      <mesh position={[0.9, 0.75, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.4]} />
        <meshStandardMaterial color="#777" />
      </mesh>

      {/* main horizontal bar */}
      <mesh position={[0, 1.45, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 2.0]} />
        <meshStandardMaterial color="#777" />
      </mesh>

      {/* 3 hooks on the front and 3 hooks on the back */}
      {hookPositions.map((x, i) => (
        <React.Fragment key={x}>
          <mesh position={[x, 1.45, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.7]} />
            <meshStandardMaterial color="#777" />
          </mesh>

          <mesh position={[x, 1.45, -0.35]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.7]} />
            <meshStandardMaterial color="#777" />
          </mesh>

          <ProductCard
            productId={products[i]}
            productCatalog={productCatalog}
            x={x}
            y={1.1}
            z={0.7}
            scale={0.75}
          />

          <ProductCard
            productId={products[i + 3]}
            productCatalog={productCatalog}
            x={x}
            y={1.1}
            z={-0.7}
            scale={0.75}
            rotation={[0, Math.PI, 0]}
          />
        </React.Fragment>
      ))}
    </group>
  );
}

const startingFixtures = [
  {
    id: "Rack 1",
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
    id: "Rack 2",
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
    id: "Rack 3",
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
    id: "Rack 4",
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
    id: "Rack 5",
    type: "fourWay",
    x: -6.1,
    z: 4.0,
    rotation: 0.8,
    products: [
      "benchmarkCrewNavy",
      "benchmarkCrewRed",
      "benchmarkCrewOxford",
      "proWeaveCrewOxford",
    ],
  },
  {
    id: "Rack 6",
    type: "fourWay",
    x: 0.6,
    z: 4.3,
    rotation: 0.8,
    products: [
      "harvardArcTeeCrimson",
      "crestTeeOxford",
      "crestTeeNavy",
      "crestTeeWhite",
    ],
  },
  {
    id: "Rack 7",
    type: "fourWay",
    x: 3.8,
    z: 3.7,
    rotation: 0.8,
    products: [
      "crestHoodCrimson",
      "crestHoodNavy",
      "proWeaveHoodCrimson",
      "proWeaveHoodOatmeal",
    ],
  },
  {
    id: "Horizontal Rack 1",
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
    id: "Family Tee Rack",
    type: "threeWay",
    x: -2.2,
    z: -3.7,
    rotation: 0.45,
    products: [
      "brotherTee",
      "sisterTee",
      "grandmaTee",
      "grandpaTee",
      "momTee",
      "dadTee",
    ],
  },
  {
    id: "Table 1",
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
    id: "Table 2",
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


const storeOptions = [
  { id: "massAve", name: "Mass Ave" },
  { id: "mtAuburn", name: "Mt. Auburn" },
  { id: "jfk", name: "JFK" },
];

const wallsByStore = {
  massAve: [
    [[-8.5, -7.5], [1.5, -7.5]],
    [[1.5, -7.5], [7.4, -1.8]],
    [[7.4, -1.8], [8.7, 1.8]],
    [[8.7, 1.8], [5.8, 5.3]],
    [[-8.5, 7.5], [-8.5, -7.5]],
  ],

  // Traced from the 65 Mt. Auburn existing plan PDF.
  // It is intentionally simplified into wall segments so the editor remains easy to use.
  mtAuburn: [
    // Upper-left storage block
    [[-8.3, -8.4], [-2.9, -8.4]],
    [[-8.3, -8.4], [-8.3, -4.9]],
    [[-8.3, -4.9], [-7.6, -4.9]],
    [[-7.6, -4.9], [-7.6, -2.1]],
    [[-7.6, -2.1], [-8.0, -2.1]],
    [[-8.0, -2.1], [-8.0, 0.7]],
    [[-8.0, 0.7], [-6.7, 0.7]],
    [[-6.7, 0.7], [-6.2, 1.5]],
    [[-6.2, 1.5], [-5.3, 1.5]],
    [[-5.3, 1.5], [-4.7, 2.0]],
    [[-4.7, 2.0], [-3.0, 2.0]],
    [[-3.0, 2.0], [-2.9, -8.4]],

    // Upper-middle storage room
    [[-2.9, -7.8], [-0.5, -7.8]],
    [[-0.5, -7.8], [-0.5, -6.8]],
    [[-0.5, -6.8], [0.1, -6.8]],
    [[0.1, -6.8], [0.1, -5.4]],
    [[0.1, -5.4], [-2.9, -5.4]],

    // Main long retail room
    [[0.1, -8.0], [4.9, -8.0]],
    [[4.9, -8.0], [4.9, 9.1]],
    [[4.9, 9.1], [3.0, 9.1]],
    [[3.0, 9.1], [3.0, 8.2]],
    [[3.0, 8.2], [1.2, 8.2]],
    [[1.2, 8.2], [1.2, 9.1]],
    [[1.2, 9.1], [-0.4, 9.1]],
    [[-0.4, 9.1], [-0.4, 4.6]],
    [[-0.4, 4.6], [-1.0, 4.6]],
    [[-1.0, 4.6], [-1.0, 2.0]],
    [[-1.0, 2.0], [-2.9, 2.0]],

    // Restroom / fitting-room support space along the left side of the sales floor
    [[-1.0, -2.6], [0.6, -2.6]],
    [[0.6, -2.6], [0.6, 0.2]],
    [[0.6, 0.2], [-0.4, 0.2]],
    [[-0.4, 0.2], [-0.4, -1.0]],
    [[-0.4, -1.0], [-1.0, -1.0]],
  ],

  jfk: [
    [[-7.5, -7.5], [7.5, -7.5]],
    [[7.5, -7.5], [7.5, 7.5]],
    [[7.5, 7.5], [-7.5, 7.5]],
    [[-7.5, 7.5], [-7.5, -7.5]],
  ],
};

const floorSizesByStore = {
  massAve: [22, 20],
  mtAuburn: [18, 22],
  jfk: [18, 18],
};

const wallHooksByStore = {
  massAve: [
    { x: -7.2, z: -7.25, rotation: 0, product: "harvardArcTeeCrimson" },
    { x: -5.7, z: -7.25, rotation: 0, product: "harvardArcTeeOxford" },
    { x: -4.3, z: -7.25, rotation: 0, product: "harvardArcTeeBlack" },
    { x: -3.0, z: -7.25, rotation: 0, product: "harvardArcTeeWhite" },
    { x: -1.7, z: -7.25, rotation: 0, product: "crestTeeOxford" },
  ],
  mtAuburn: [],
  jfk: [],
};

const startingFixturesByStore = {
  massAve: startingFixtures,
  mtAuburn: [],
  jfk: [],
};

function cloneFixtures(fixtures) {
  return fixtures.map((fixture) => ({
    ...fixture,
    products: [...(fixture.products || [])],
  }));
}

function getStoredLayoutKey(storeId) {
  return `storeLayout-${storeId}`;
}

function getDefaultFixturesForStore(storeId) {
  return cloneFixtures(startingFixturesByStore[storeId] || []);
}
function WoodFloor({ size = [22, 20] }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={size} />
      <meshStandardMaterial color="#a8753b" roughness={0.65} />
    </mesh>
  );
}
export default function App() {
  const [activeStoreId, setActiveStoreId] = useState("massAve");
  const [fixtures, setFixtures] = useState(() => getDefaultFixturesForStore("massAve"));
  const [selectedId, setSelectedId] = useState("Rack 1");
  const [customProducts, setCustomProducts] = useState({});
  const [newRackType, setNewRackType] = useState("fourWay");
  const [newProductName, setNewProductName] = useState("");
  const [newProductImage, setNewProductImage] = useState("");

  const productCatalog = { ...catalog, ...customProducts };
  const productOptions = Object.entries(productCatalog).map(([id, product]) => ({
    id,
    name: product.name || id,
  }));

  useEffect(() => {
    const savedProducts = window.localStorage.getItem("storeProducts");

    if (savedProducts) {
      setCustomProducts(JSON.parse(savedProducts));
    }
  }, []);

  useEffect(() => {
    const legacyMassAveLayout =
      activeStoreId === "massAve" ? window.localStorage.getItem("storeLayout") : null;
    const savedLayout =
      window.localStorage.getItem(getStoredLayoutKey(activeStoreId)) || legacyMassAveLayout;
    const nextFixtures = savedLayout
      ? JSON.parse(savedLayout)
      : getDefaultFixturesForStore(activeStoreId);

    setFixtures(nextFixtures);
    setSelectedId(nextFixtures[0]?.id || "");
  }, [activeStoreId]);

  useEffect(() => {
    window.localStorage.setItem(getStoredLayoutKey(activeStoreId), JSON.stringify(fixtures));
  }, [activeStoreId, fixtures]);

  useEffect(() => {
    window.localStorage.setItem("storeProducts", JSON.stringify(customProducts));
  }, [customProducts]);

  const selectedFixture = fixtures.find((f) => f.id === selectedId);

  function moveSelected(dx, dz) {
    if (!selectedId) return;

    setFixtures((current) =>
      current.map((f) =>
        f.id === selectedId ? { ...f, x: f.x + dx, z: f.z + dz } : f
      )
    );
  }

  function rotateSelected(amount) {
    if (!selectedId) return;

    setFixtures((current) =>
      current.map((f) =>
        f.id === selectedId ? { ...f, rotation: f.rotation + amount } : f
      )
    );
  }

  function addRack() {
    const countOfType = fixtures.filter((f) => f.type === newRackType).length + 1;
    const newFixture = {
      id: `${rackTypes[newRackType].label} ${countOfType}`,
      type: newRackType,
      x: 0,
      z: 0,
      rotation: 0,
      products: makeEmptyProducts(newRackType),
    };

    setFixtures((current) => [...current, newFixture]);
    setSelectedId(newFixture.id);
  }

  function addProduct() {
    const trimmedName = newProductName.trim();
    const trimmedImage = newProductImage.trim();

    if (!trimmedName || !trimmedImage) {
      alert("Add a product name and image link first.");
      return;
    }

    const id = trimmedName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") + `-${Date.now()}`;

    setCustomProducts((current) => ({
      ...current,
      [id]: { name: trimmedName, image: trimmedImage },
    }));

    setNewProductName("");
    setNewProductImage("");
  }

  function assignProductToSlot(slotIndex, productId) {
    setFixtures((current) =>
      current.map((fixture) => {
        if (fixture.id !== selectedId) return fixture;

        const slotCount = getSlotCount(fixture.type);
        const nextProducts = [...(fixture.products || makeEmptyProducts(fixture.type))];

        while (nextProducts.length < slotCount) {
          nextProducts.push(null);
        }

        nextProducts[slotIndex] = productId || null;

        return {
          ...fixture,
          products: nextProducts.slice(0, slotCount),
        };
      })
    );
  }

  function deleteSelectedFixture() {
    if (!selectedFixture) return;

    setFixtures((current) => current.filter((f) => f.id !== selectedId));
    setSelectedId(fixtures.find((f) => f.id !== selectedId)?.id || "");
  }

  function resetLayout() {
    localStorage.removeItem(getStoredLayoutKey(activeStoreId));
    if (activeStoreId === "massAve") {
      localStorage.removeItem("storeLayout");
    }

    const defaultFixtures = getDefaultFixturesForStore(activeStoreId);
    setFixtures(defaultFixtures);
    setSelectedId(defaultFixtures[0]?.id || "");
  }

  const activeStore = storeOptions.find((store) => store.id === activeStoreId);
  const activeWalls = wallsByStore[activeStoreId] || [];
  const activeFloorSize = floorSizesByStore[activeStoreId] || [22, 20];
  const activeWallHooks = wallHooksByStore[activeStoreId] || [];

  const buttonStyle = {
    padding: "10px",
    borderRadius: "12px",
    border: "1px solid #d8d3cc",
    background: "white",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const inputStyle = {
    width: "100%",
    padding: 10,
    borderRadius: 12,
    marginBottom: 8,
    border: "1px solid #d8d3cc",
    boxSizing: "border-box",
  };

  const sectionTitleStyle = {
    margin: "0 0 8px",
    fontSize: 15,
    color: "#3b2f2f",
    letterSpacing: "0.01em",
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #f7f3ee 0%, #ece3dc 100%)",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          right: 16,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          background: "rgba(255,255,255,0.92)",
          border: "1px solid rgba(120, 72, 72, 0.14)",
          padding: "12px 16px",
          borderRadius: 20,
          boxShadow: "0 14px 40px rgba(69, 32, 32, 0.14)",
        }}
      >
        <div>
          <div style={{ fontSize: 12, color: "#7f6b5f", fontWeight: 700 }}>
            Harvard Shop Store Layout Editor
          </div>
          <div style={{ fontSize: 22, fontWeight: 900, color: "#241515" }}>
            {activeStore?.name}
          </div>
          <div style={{ fontSize: 11, color: "#8a7468", fontWeight: 700 }}>
            {activeStoreId === "mtAuburn" ? "Floor plan traced from 65 Mt. Auburn PDF" : "Interactive fixture planner"}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          {storeOptions.map((store) => {
            const active = activeStoreId === store.id;

            return (
              <button
                key={store.id}
                onClick={() => setActiveStoreId(store.id)}
                style={{
                  padding: "10px 16px",
                  borderRadius: 999,
                  border: active ? "1px solid #7f1d1d" : "1px solid #d8d3cc",
                  background: active ? "#7f1d1d" : "white",
                  color: active ? "white" : "#3b2f2f",
                  cursor: "pointer",
                  fontWeight: 800,
                }}
              >
                {store.name}
              </button>
            );
          })}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 96,
          left: 16,
          zIndex: 10,
          background: "rgba(255,255,255,0.95)",
          padding: 16,
          borderRadius: 20,
          border: "1px solid rgba(120, 72, 72, 0.14)",
          boxShadow: "0 14px 40px rgba(69, 32, 32, 0.14)",
          width: 340,
          maxHeight: "calc(100vh - 112px)",
          overflowY: "auto",
        }}
      >
        <h3 style={sectionTitleStyle}>Move Fixtures</h3>

        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          style={{ ...inputStyle, marginBottom: 12 }}
        >
          {fixtures.length === 0 && <option value="">No fixtures yet</option>}
          {fixtures.map((f) => (
            <option key={f.id} value={f.id}>
              {f.id}
            </option>
          ))}
        </select>

        <div style={{ fontSize: 13, marginBottom: 10 }}>
          <b>Selected:</b> {selectedFixture?.id}
          <br />
          x: {selectedFixture?.x.toFixed(1)} | z: {selectedFixture?.z.toFixed(1)} | rot:{" "}
          {selectedFixture?.rotation.toFixed(2)}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 8,
            marginBottom: 10,
          }}
        >
          <span></span>
          <button style={buttonStyle} onClick={() => moveSelected(0, -0.2)}>
            ↑
          </button>
          <span></span>

          <button style={buttonStyle} onClick={() => moveSelected(-0.2, 0)}>
            ←
          </button>
          <button style={buttonStyle} onClick={() => moveSelected(0, 0.2)}>
            ↓
          </button>
          <button style={buttonStyle} onClick={() => moveSelected(0.2, 0)}>
            →
          </button>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <button style={buttonStyle} onClick={() => rotateSelected(-0.15)}>
            Rotate -
          </button>
          <button style={buttonStyle} onClick={() => rotateSelected(0.15)}>
            Rotate +
          </button>
        </div>

        <button style={{ ...buttonStyle, width: "100%" }} onClick={resetLayout}>
          Reset Layout
        </button>

        <button
          style={{ ...buttonStyle, width: "100%", marginTop: 10 }}
          onClick={() => {
            window.localStorage.setItem(getStoredLayoutKey(activeStoreId), JSON.stringify(fixtures));
            window.localStorage.setItem("storeProducts", JSON.stringify(customProducts));
            alert("Layout saved!");
          }}
        >
          Save Layout
        </button>

        <hr style={{ margin: "14px 0", border: "none", borderTop: "1px solid #ddd" }} />

        <h3 style={sectionTitleStyle}>Add Rack</h3>
        <select
          value={newRackType}
          onChange={(e) => setNewRackType(e.target.value)}
          style={inputStyle}
        >
          {Object.entries(rackTypes).map(([type, rack]) => (
            <option key={type} value={type}>
              {rack.label}
            </option>
          ))}
        </select>
        <button style={{ ...buttonStyle, width: "100%" }} onClick={addRack}>
          Add Selected Rack
        </button>

        <hr style={{ margin: "14px 0", border: "none", borderTop: "1px solid #ddd" }} />

        <h3 style={sectionTitleStyle}>Add Product</h3>
        <input
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          placeholder="Product name"
          style={inputStyle}
        />
        <input
          value={newProductImage}
          onChange={(e) => setNewProductImage(e.target.value)}
          placeholder="Product image link"
          style={inputStyle}
        />
        <button style={{ ...buttonStyle, width: "100%" }} onClick={addProduct}>
          Add Product
        </button>

        {selectedFixture && (
          <>
            <hr style={{ margin: "14px 0", border: "none", borderTop: "1px solid #ddd" }} />

            <h3 style={sectionTitleStyle}>Products on Selected Rack</h3>
            {Array.from({ length: getSlotCount(selectedFixture.type) }).map((_, slotIndex) => (
              <select
                key={slotIndex}
                value={selectedFixture.products?.[slotIndex] || ""}
                onChange={(e) => assignProductToSlot(slotIndex, e.target.value)}
                style={{ ...inputStyle, padding: 8, marginBottom: 6 }}
              >
                <option value="">Slot {slotIndex + 1}: Empty</option>
                {productOptions.map((product) => (
                  <option key={product.id} value={product.id}>
                    Slot {slotIndex + 1}: {product.name}
                  </option>
                ))}
              </select>
            ))}

            <button
              style={{ ...buttonStyle, width: "100%", marginTop: 8 }}
              onClick={deleteSelectedFixture}
            >
              Delete Selected Rack
            </button>
          </>
        )}

      </div>

     <Canvas camera={{ position: [18, 18, 18], fov: 55 }} shadows>
  <ambientLight intensity={0.6} />
  <directionalLight position={[10, 20, 10]} intensity={1} castShadow />

  <OrbitControls enablePan enableZoom enableRotate />

  <WoodFloor size={activeFloorSize} />

      <WoodFloor size={activeFloorSize} />

        {activeWalls.map(([start, end], index) => (
      <WallSegment key={`${activeStoreId}-wall-${index}`} start={start} end={end} />
    ))}
    
    {activeStoreId === "massAve" && (
      <>
        <WindowSegment start={[-8.5, 7.5]} end={[-3.2, 7.5]} />
        <WindowSegment start={[-1.1, 7.5]} end={[0.8, 7.5]} />
        <WindowSegment start={[0.8, 7.5]} end={[5.8, 5.3]} />
        <DoubleDoor x={-2.15} z={7.5} rotation={0} />
      </>
    )}

        {fixtures.map((fixture) => {
          if (fixture.type === "fourWay") {
            return (
              <FourWayRack
                key={fixture.id}
                fixture={fixture}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                productCatalog={productCatalog}
              />
            );
          }

          if (fixture.type === "horizontal") {
            return (
              <HorizontalRack
                key={fixture.id}
                fixture={fixture}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                productCatalog={productCatalog}
              />
            );
          }

          if (fixture.type === "threeWay") {
            return (
              <ThreeWayRack
                key={fixture.id}
                fixture={fixture}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                productCatalog={productCatalog}
              />
            );
          }

          if (fixture.type === "wallHook") {
            return (
              <WallHookRack
                key={fixture.id}
                fixture={fixture}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                productCatalog={productCatalog}
              />
            );
          }

          return null;
        })}

        {activeWallHooks.map((hook, index) => (
          <WallHookRack
            key={`${activeStoreId}-wall-hook-${index}`}
            x={hook.x}
            z={hook.z}
            rotation={hook.rotation}
            product={hook.product}
            productCatalog={productCatalog}
          />
        ))}
      </Canvas>
    </div>
  );
}
