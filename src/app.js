import React, { useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
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
};

function ProductCard({ productId, x = 0, y = 1.2, z = 0, scale = 1 }) {
  const product = catalog[productId] || catalog.harvardArcTeeCrimson;
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

function FourWayRack({ fixture, selectedId, setSelectedId }) {
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
            productId={fixture.products[i % fixture.products.length]}
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

function DisplayTable({ fixture, selectedId, setSelectedId }) {
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
          x={-0.75 + i * 0.5}
          y={0.83}
          z={0}
          scale={0.65}
        />
      ))}
    </group>
  );
}

function HorizontalRack({ fixture, selectedId, setSelectedId }) {
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
          productId={fixture.products[i % fixture.products.length]}
          x={-0.75 + i * 0.75}
          y={1.15}
          z={0.15}
          scale={0.8}
        />
      ))}
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
function ThreeWayRack({ fixture, selectedId, setSelectedId }) {
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
     {/* base */}
  <mesh position={[0, 0.05, 0]}>
    <boxGeometry args={[2.4, 0.1, 0.45]} />
    <meshStandardMaterial color={selected ? "#2563eb" : "#cfcfcf"} />
  </mesh>

      {/* legs */}
      <mesh position={[-1.35, 0.75, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.4]} />
        <meshStandardMaterial color="#777" />
        </mesh>
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
{
  id: "3-Way Rack 1",
  type: "threeWay",
  x: 0,
  z: .8,
  rotation: 0,
  products: [
    "crestHoodCrimson",
    "crestHoodOxford",
    "crestHoodNavy",
    ],
  },
];
export default function App() {
  const [fixtures, setFixtures] = useState(() => {
  const saved = localStorage.getItem("storeLayout");
  return saved ? JSON.parse(saved) : startingFixtures;
});

useEffect(() => {
  localStorage.setItem("storeLayout", JSON.stringify(fixtures));
}, [fixtures]);
  const [selectedId, setSelectedId] = useState("Rack 1");

  const selectedFixture = fixtures.find((f) => f.id === selectedId);

  function moveSelected(dx, dz) {
    setFixtures((current) =>
      current.map((f) =>
        f.id === selectedId ? { ...f, x: f.x + dx, z: f.z + dz } : f
      )
    );
  }

  function rotateSelected(amount) {
    setFixtures((current) =>
      current.map((f) =>
        f.id === selectedId ? { ...f, rotation: f.rotation + amount } : f
      )
    );
  }

  function resetLayout() {
  localStorage.removeItem("storeLayout");
  setFixtures(startingFixtures);
  setSelectedId("Rack 1");
}

  const buttonStyle = {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    background: "white",
    cursor: "pointer",
    fontWeight: "bold",
  };

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#f2f2f2" }}>
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 10,
          background: "rgba(255,255,255,0.95)",
          padding: 16,
          borderRadius: 16,
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          width: 280,
          fontFamily: "Arial",
        }}
      >
        <h3 style={{ margin: "0 0 8px" }}>Move Fixtures</h3>

        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 10,
            marginBottom: 12,
          }}
        >
          {fixtures.map((f) => (
            <option key={f.id} value={f.id}>
              {f.id}
            </option>
          ))}
        </select>

        <div style={{ fontSize: 13, marginBottom: 10 }}>
          <b>Selected:</b> {selectedFixture?.id}
          <br />
          x: {selectedFixture?.x.toFixed(1)} | z:{" "}
          {selectedFixture?.z.toFixed(1)} | rot:{" "}
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
      </div>

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

        {fixtures.map((fixture) => {
          if (fixture.type === "fourWay") {
            return (
              <FourWayRack
                key={fixture.id}
                fixture={fixture}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
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
              />
            );
          }
          if (fixture.type === "table") {
            return (
              <DisplayTable
                key={fixture.id}
                fixture={fixture}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
              />
            );
          }

          return null;
        })}

        <WallHookRack
          x={-7.2}
          z={-7.25}
          rotation={0}
          product="harvardArcTeeCrimson"
        />
        <WallHookRack
          x={-5.7}
          z={-7.25}
          rotation={0}
          product="harvardArcTeeOxford"
        />
        <WallHookRack
          x={-4.3}
          z={-7.25}
          rotation={0}
          product="harvardArcTeeBlack"
        />
        <WallHookRack
          x={-3.0}
          z={-7.25}
          rotation={0}
          product="harvardArcTeeWhite"
        />
        <WallHookRack
          x={-1.7}
          z={-7.25}
          rotation={0}
          product="crestTeeOxford"
        />

       
      </Canvas>
    </div>
  );
}
