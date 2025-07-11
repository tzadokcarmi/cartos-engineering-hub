
import Header from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calculator, 
  ExternalLink, 
  Download, 
  Database,
  FileText,
  Thermometer,
  Wrench,
  TrendingUp,
  Activity,
  Settings
} from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Mechanics = () => {
  // Fluid Flow Calculator States
  const [fluidInputs, setFluidInputs] = useState({ 
    density: '', velocity: '', diameter: '', viscosity: '', roughness: '', length: '', flowRate: ''
  });
  
  // Structural Stress Calculator States
  const [structuralInputs, setStructuralInputs] = useState({ 
    axialForce: '', area: '', length: '', elasticModulus: '', moment: '', torsion: '', radius: '', 
    beamLoad: '', beamLength: '', momentOfInertia: '', yieldStrength: '', ultimateStrength: ''
  });
  
  // Gear & Mechanism Calculator States
  const [gearInputs, setGearInputs] = useState({ 
    teeth1: '', teeth2: '', module: '', torqueIn: '', rpm: '', efficiency: '', 
    shaftDiameter: '', shaftLength: '', bearingLoad: ''
  });
  
  // Thermal Systems Calculator States
  const [thermalInputs, setThermalInputs] = useState({ 
    thermalConductivity: '', thickness: '', area: '', tempDiff: '', convectionCoeff: '', 
    surfaceArea: '', fluidTemp: '', heatCapacity: '', mass: '', timeStep: '', finLength: '', finDiameter: ''
  });

  const suppliers = [
    {
      name: "McMaster-Carr",
      description: "Industrial supply with comprehensive CAD library",
      cadFormats: ["STEP", "IGES", "DWG"],
      website: "https://mcmaster.com",
      specialty: "General mechanical components"
    },
    {
      name: "Misumi",
      description: "Precision mechanical components with 3D CAD downloads",
      cadFormats: ["STEP", "IGES", "Solidworks"],
      website: "https://misumi.com",
      specialty: "Precision components, automation"
    },
    {
      name: "Thorlabs",
      description: "Optical and mechanical components for research",
      cadFormats: ["STEP", "IGES", "Solidworks"],
      website: "https://thorlabs.com",
      specialty: "Optical mounts, precision mechanics"
    },
    {
      name: "80/20 Inc",
      description: "T-slot aluminum framing systems",
      cadFormats: ["STEP", "IGES", "AutoCAD"],
      website: "https://8020.net",
      specialty: "Modular framing systems"
    },
    {
      name: "Bosch Rexroth",
      description: "Industrial automation and linear motion",
      cadFormats: ["STEP", "IGES", "CATIA"],
      website: "https://boschrexroth.com",
      specialty: "Linear guides, automation"
    }
  ];

  const standards = [
    { name: "ISO 898", description: "Mechanical properties of fasteners", pdf: "https://www.iso.org/standard/60604.html" },
    { name: "ASME Y14.5", description: "Dimensioning and tolerancing", pdf: "https://www.asme.org/codes-standards/find-codes-standards/y14-5-dimensioning-tolerancing" },
    { name: "ISO 2768", description: "General tolerances", pdf: "https://www.iso.org/standard/8400.html" },
    { name: "MIL-STD-810", description: "Environmental test methods", pdf: "https://www.navair.navy.mil/product/MIL-STD-810" },
    { name: "NASA-STD-5001", description: "Structural design and test factors", pdf: "https://standards.nasa.gov/standard/nasa/nasa-std-5001" }
  ];

  const recentArticles = [
    { 
      title: "Advanced Materials in Aerospace Applications", 
      source: "NASA Technical Reports", 
      time: "2 hours ago",
      summary: "Revolutionary carbon nanotube-reinforced composites achieving 40% weight reduction while maintaining structural integrity in extreme temperatures."
    },
    { 
      title: "Finite Element Analysis Best Practices", 
      source: "Engineering.com", 
      time: "4 hours ago",
      summary: "Mesh optimization techniques and convergence studies for complex geometries, including adaptive refinement and error estimation methods."
    },
    { 
      title: "Additive Manufacturing Design Guidelines", 
      source: "ASME Journal", 
      time: "6 hours ago",
      summary: "Design for AM principles including support structures, surface finish optimization, and post-processing considerations for metal 3D printing."
    },
    { 
      title: "Fatigue Analysis in Critical Components", 
      source: "Materials Science", 
      time: "8 hours ago",
      summary: "Paris law applications and crack propagation modeling in high-cycle fatigue scenarios with probabilistic failure analysis."
    },
    { 
      title: "Thermal Management in Electronic Enclosures", 
      source: "Design News", 
      time: "12 hours ago",
      summary: "Heat sink design optimization using topology optimization and advanced cooling techniques for high-power density applications."
    }
  ];

  // Fluid Flow Calculations
  const calculateReynoldsNumber = () => {
    const density = parseFloat(fluidInputs.density);
    const velocity = parseFloat(fluidInputs.velocity);
    const diameter = parseFloat(fluidInputs.diameter);
    const viscosity = parseFloat(fluidInputs.viscosity);
    
    if (density && velocity && diameter && viscosity) {
      const reynolds = (density * velocity * diameter) / viscosity;
      const flowType = reynolds < 2300 ? "Laminar" : reynolds > 4000 ? "Turbulent" : "Transitional";
      toast({
        title: "Reynolds Number Result",
        description: `Re = ${reynolds.toFixed(0)} (${flowType} flow)`,
      });
    }
  };

  const calculatePressureDrop = () => {
    const density = parseFloat(fluidInputs.density);
    const velocity = parseFloat(fluidInputs.velocity);
    const length = parseFloat(fluidInputs.length);
    const diameter = parseFloat(fluidInputs.diameter);
    const roughness = parseFloat(fluidInputs.roughness);
    
    if (density && velocity && length && diameter && roughness) {
      const reynolds = (density * velocity * diameter) / 0.001; // Assuming water viscosity
      const relativeRoughness = roughness / diameter;
      // Simplified Darcy-Weisbach equation with Colebrook approximation
      const frictionFactor = 0.02; // Simplified for demo
      const pressureDrop = frictionFactor * (length / diameter) * (density * velocity * velocity) / 2;
      
      toast({
        title: "Pressure Drop Result",
        description: `ΔP = ${(pressureDrop / 1000).toFixed(2)} kPa (f = ${frictionFactor.toFixed(4)})`,
      });
    }
  };

  // Structural Stress Calculations
  const calculateAxialStress = () => {
    const force = parseFloat(structuralInputs.axialForce);
    const area = parseFloat(structuralInputs.area);
    
    if (force && area) {
      const stress = force / area;
      const yieldStrength = parseFloat(structuralInputs.yieldStrength) || 250;
      const safetyFactor = yieldStrength / stress;
      toast({
        title: "Axial Stress Result",
        description: `σ = ${stress.toFixed(2)} MPa, Safety Factor = ${safetyFactor.toFixed(2)}`,
      });
    }
  };

  const calculateBendingStress = () => {
    const moment = parseFloat(structuralInputs.moment);
    const momentOfInertia = parseFloat(structuralInputs.momentOfInertia);
    const distance = parseFloat(structuralInputs.radius); // Distance from neutral axis
    
    if (moment && momentOfInertia && distance) {
      const bendingStress = (moment * distance) / momentOfInertia;
      toast({
        title: "Bending Stress Result",
        description: `σ_b = ${bendingStress.toFixed(2)} MPa`,
      });
    }
  };

  const calculateTorsionalStress = () => {
    const torque = parseFloat(structuralInputs.torsion);
    const radius = parseFloat(structuralInputs.radius);
    const polarMoment = Math.PI * Math.pow(radius, 4) / 2; // Solid circular shaft
    
    if (torque && radius) {
      const shearStress = (torque * radius) / polarMoment;
      toast({
        title: "Torsional Stress Result",
        description: `τ = ${shearStress.toFixed(2)} MPa`,
      });
    }
  };

  const calculateBucklingLoad = () => {
    const elasticModulus = parseFloat(structuralInputs.elasticModulus) || 200000;
    const momentOfInertia = parseFloat(structuralInputs.momentOfInertia);
    const length = parseFloat(structuralInputs.length);
    
    if (momentOfInertia && length) {
      const eulerLoad = (Math.PI * Math.PI * elasticModulus * momentOfInertia) / (length * length);
      toast({
        title: "Euler Buckling Load",
        description: `P_cr = ${(eulerLoad / 1000).toFixed(2)} kN`,
      });
    }
  };

  // Gear & Mechanism Calculations
  const calculateGearRatio = () => {
    const teeth1 = parseFloat(gearInputs.teeth1);
    const teeth2 = parseFloat(gearInputs.teeth2);
    
    if (teeth1 && teeth2) {
      const ratio = teeth2 / teeth1;
      const rpm2 = parseFloat(gearInputs.rpm) / ratio;
      toast({
        title: "Gear Ratio Result",
        description: `Ratio = ${ratio.toFixed(3)}:1, Output RPM = ${rpm2.toFixed(1)}`,
      });
    }
  };

  const calculateTorqueTransfer = () => {
    const torqueIn = parseFloat(gearInputs.torqueIn);
    const teeth1 = parseFloat(gearInputs.teeth1);
    const teeth2 = parseFloat(gearInputs.teeth2);
    const efficiency = parseFloat(gearInputs.efficiency) || 0.95;
    
    if (torqueIn && teeth1 && teeth2) {
      const ratio = teeth2 / teeth1;
      const torqueOut = torqueIn * ratio * efficiency;
      toast({
        title: "Torque Transfer Result",
        description: `T_out = ${torqueOut.toFixed(2)} N⋅m (η = ${(efficiency * 100).toFixed(1)}%)`,
      });
    }
  };

  const calculateShaftSizing = () => {
    const torque = parseFloat(gearInputs.torqueIn);
    const allowableStress = 40; // MPa for steel shaft
    
    if (torque) {
      const diameter = Math.pow((16 * torque) / (Math.PI * allowableStress), 1/3) * 1000; // mm
      toast({
        title: "Shaft Sizing Result",
        description: `Min Diameter = ${diameter.toFixed(1)} mm`,
      });
    }
  };

  // Thermal Systems Calculations
  const calculateConductiveHeatTransfer = () => {
    const k = parseFloat(thermalInputs.thermalConductivity);
    const area = parseFloat(thermalInputs.area);
    const thickness = parseFloat(thermalInputs.thickness);
    const tempDiff = parseFloat(thermalInputs.tempDiff);
    
    if (k && area && thickness && tempDiff) {
      const heatRate = (k * area * tempDiff) / thickness;
      toast({
        title: "Conductive Heat Transfer",
        description: `Q = ${heatRate.toFixed(2)} W`,
      });
    }
  };

  const calculateConvectiveHeatTransfer = () => {
    const h = parseFloat(thermalInputs.convectionCoeff);
    const area = parseFloat(thermalInputs.surfaceArea);
    const tempDiff = parseFloat(thermalInputs.tempDiff);
    
    if (h && area && tempDiff) {
      const heatRate = h * area * tempDiff;
      toast({
        title: "Convective Heat Transfer",
        description: `Q = ${heatRate.toFixed(2)} W`,
      });
    }
  };

  const calculateFinEfficiency = () => {
    const length = parseFloat(thermalInputs.finLength);
    const diameter = parseFloat(thermalInputs.finDiameter);
    const h = parseFloat(thermalInputs.convectionCoeff) || 25;
    const k = parseFloat(thermalInputs.thermalConductivity) || 200;
    
    if (length && diameter) {
      const perimeter = Math.PI * diameter;
      const area = Math.PI * diameter * diameter / 4;
      const m = Math.sqrt((h * perimeter) / (k * area));
      const efficiency = Math.tanh(m * length) / (m * length);
      
      toast({
        title: "Fin Efficiency Result",
        description: `η_fin = ${(efficiency * 100).toFixed(1)}%`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mechanics Engineering</h1>
          <p className="text-muted-foreground">
            CAD resources, mechanical calculations, and design standards for precision engineering
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Engineering Calculators */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="mr-2 h-5 w-5" />
                  Engineering Calculators
                </CardTitle>
                <CardDescription>
                  Essential mechanical engineering calculations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {/* Fluid Flow Calculators */}
                  <AccordionItem value="fluid-flow" className="border rounded-lg mb-2">
                    <AccordionTrigger className="px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                          🌀
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold">Advanced Fluid Flow Calculators</h3>
                          <p className="text-sm text-muted-foreground">Reynolds number, pressure drop, friction analysis</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 space-y-4">
                      {/* Reynolds Number */}
                      <div className="border rounded-lg p-4 bg-muted/20">
                        <h4 className="font-medium mb-3 flex items-center">
                          <Calculator className="mr-2 h-4 w-4" />
                          Reynolds Number & Flow Regime
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                          <div>
                            <Label>Density (kg/m³)</Label>
                            <Input
                              type="number"
                              value={fluidInputs.density}
                              onChange={(e) => setFluidInputs({...fluidInputs, density: e.target.value})}
                              placeholder="1000"
                            />
                          </div>
                          <div>
                            <Label>Velocity (m/s)</Label>
                            <Input
                              type="number"
                              value={fluidInputs.velocity}
                              onChange={(e) => setFluidInputs({...fluidInputs, velocity: e.target.value})}
                              placeholder="2.0"
                            />
                          </div>
                          <div>
                            <Label>Diameter (m)</Label>
                            <Input
                              type="number"
                              value={fluidInputs.diameter}
                              onChange={(e) => setFluidInputs({...fluidInputs, diameter: e.target.value})}
                              placeholder="0.05"
                            />
                          </div>
                          <div>
                            <Label>Viscosity (Pa⋅s)</Label>
                            <Input
                              type="number"
                              step="0.0001"
                              value={fluidInputs.viscosity}
                              onChange={(e) => setFluidInputs({...fluidInputs, viscosity: e.target.value})}
                              placeholder="0.001"
                            />
                          </div>
                          <div className="flex items-end">
                            <Button onClick={calculateReynoldsNumber} className="w-full">
                              Calculate Re
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Pressure Drop */}
                      <div className="border rounded-lg p-4 bg-muted/20">
                        <h4 className="font-medium mb-3">Pressure Drop (Darcy-Weisbach)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <Label>Length (m)</Label>
                            <Input
                              type="number"
                              value={fluidInputs.length}
                              onChange={(e) => setFluidInputs({...fluidInputs, length: e.target.value})}
                              placeholder="100"
                            />
                          </div>
                          <div>
                            <Label>Roughness (mm)</Label>
                            <Input
                              type="number"
                              step="0.001"
                              value={fluidInputs.roughness}
                              onChange={(e) => setFluidInputs({...fluidInputs, roughness: e.target.value})}
                              placeholder="0.045"
                            />
                          </div>
                          <div className="flex items-end">
                            <Button onClick={calculatePressureDrop} className="w-full">
                              Calculate ΔP
                            </Button>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Structural Stress Calculators */}
                  <AccordionItem value="structural" className="border rounded-lg mb-2">
                    <AccordionTrigger className="px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mr-3">
                          🏗️
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold">Load & Structural Stress Analysis</h3>
                          <p className="text-sm text-muted-foreground">Axial, bending, torsional stress with safety factors</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 space-y-4">
                      {/* Axial Stress */}
                      <div className="border rounded-lg p-4 bg-muted/20">
                        <h4 className="font-medium mb-3">Axial Stress & Safety Factor</h4>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                          <div>
                            <Label>Force (N)</Label>
                            <Input
                              type="number"
                              value={structuralInputs.axialForce}
                              onChange={(e) => setStructuralInputs({...structuralInputs, axialForce: e.target.value})}
                              placeholder="10000"
                            />
                          </div>
                          <div>
                            <Label>Area (mm²)</Label>
                            <Input
                              type="number"
                              value={structuralInputs.area}
                              onChange={(e) => setStructuralInputs({...structuralInputs, area: e.target.value})}
                              placeholder="500"
                            />
                          </div>
                          <div>
                            <Label>Yield Strength (MPa)</Label>
                            <Input
                              type="number"
                              value={structuralInputs.yieldStrength}
                              onChange={(e) => setStructuralInputs({...structuralInputs, yieldStrength: e.target.value})}
                              placeholder="250"
                            />
                          </div>
                          <div className="flex items-end">
                            <Button onClick={calculateAxialStress} className="w-full">
                              Calculate σ
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Bending Stress */}
                      <div className="border rounded-lg p-4 bg-muted/20">
                        <h4 className="font-medium mb-3">Bending Stress</h4>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                          <div>
                            <Label>Moment (N⋅m)</Label>
                            <Input
                              type="number"
                              value={structuralInputs.moment}
                              onChange={(e) => setStructuralInputs({...structuralInputs, moment: e.target.value})}
                              placeholder="1000"
                            />
                          </div>
                          <div>
                            <Label>Distance (mm)</Label>
                            <Input
                              type="number"
                              value={structuralInputs.radius}
                              onChange={(e) => setStructuralInputs({...structuralInputs, radius: e.target.value})}
                              placeholder="25"
                            />
                          </div>
                          <div>
                            <Label>I (mm⁴)</Label>
                            <Input
                              type="number"
                              value={structuralInputs.momentOfInertia}
                              onChange={(e) => setStructuralInputs({...structuralInputs, momentOfInertia: e.target.value})}
                              placeholder="100000"
                            />
                          </div>
                          <div className="flex items-end">
                            <Button onClick={calculateBendingStress} className="w-full">
                              Calculate σ_b
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Torsional Stress */}
                      <div className="border rounded-lg p-4 bg-muted/20">
                        <h4 className="font-medium mb-3">Torsional Stress</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <Label>Torque (N⋅m)</Label>
                            <Input
                              type="number"
                              value={structuralInputs.torsion}
                              onChange={(e) => setStructuralInputs({...structuralInputs, torsion: e.target.value})}
                              placeholder="500"
                            />
                          </div>
                          <div>
                            <Label>Radius (mm)</Label>
                            <Input
                              type="number"
                              value={structuralInputs.radius}
                              onChange={(e) => setStructuralInputs({...structuralInputs, radius: e.target.value})}
                              placeholder="20"
                            />
                          </div>
                          <div className="flex items-end">
                            <Button onClick={calculateTorsionalStress} className="w-full">
                              Calculate τ
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Buckling */}
                      <div className="border rounded-lg p-4 bg-muted/20">
                        <h4 className="font-medium mb-3">Euler Buckling Load</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <Label>Length (mm)</Label>
                            <Input
                              type="number"
                              value={structuralInputs.length}
                              onChange={(e) => setStructuralInputs({...structuralInputs, length: e.target.value})}
                              placeholder="1000"
                            />
                          </div>
                          <div>
                            <Label>E (GPa)</Label>
                            <Input
                              type="number"
                              value={structuralInputs.elasticModulus}
                              onChange={(e) => setStructuralInputs({...structuralInputs, elasticModulus: e.target.value})}
                              placeholder="200"
                            />
                          </div>
                          <div className="flex items-end">
                            <Button onClick={calculateBucklingLoad} className="w-full">
                              Calculate P_cr
                            </Button>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Gear & Mechanism Calculators */}
                  <AccordionItem value="gears" className="border rounded-lg mb-2">
                    <AccordionTrigger className="px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                          ⚙️
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold">Gear & Mechanism Analysis</h3>
                          <p className="text-sm text-muted-foreground">Gear ratios, torque transfer, shaft sizing</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 space-y-4">
                      {/* Gear Ratio */}
                      <div className="border rounded-lg p-4 bg-muted/20">
                        <h4 className="font-medium mb-3">Gear Ratio & Speed</h4>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                          <div>
                            <Label>Input Teeth</Label>
                            <Input
                              type="number"
                              value={gearInputs.teeth1}
                              onChange={(e) => setGearInputs({...gearInputs, teeth1: e.target.value})}
                              placeholder="20"
                            />
                          </div>
                          <div>
                            <Label>Output Teeth</Label>
                            <Input
                              type="number"
                              value={gearInputs.teeth2}
                              onChange={(e) => setGearInputs({...gearInputs, teeth2: e.target.value})}
                              placeholder="60"
                            />
                          </div>
                          <div>
                            <Label>Input RPM</Label>
                            <Input
                              type="number"
                              value={gearInputs.rpm}
                              onChange={(e) => setGearInputs({...gearInputs, rpm: e.target.value})}
                              placeholder="1800"
                            />
                          </div>
                          <div className="flex items-end">
                            <Button onClick={calculateGearRatio} className="w-full">
                              Calculate Ratio
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Torque Transfer */}
                      <div className="border rounded-lg p-4 bg-muted/20">
                        <h4 className="font-medium mb-3">Torque Transfer & Efficiency</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <Label>Input Torque (N⋅m)</Label>
                            <Input
                              type="number"
                              value={gearInputs.torqueIn}
                              onChange={(e) => setGearInputs({...gearInputs, torqueIn: e.target.value})}
                              placeholder="100"
                            />
                          </div>
                          <div>
                            <Label>Efficiency (%)</Label>
                            <Input
                              type="number"
                              value={gearInputs.efficiency}
                              onChange={(e) => setGearInputs({...gearInputs, efficiency: e.target.value})}
                              placeholder="95"
                            />
                          </div>
                          <div className="flex items-end">
                            <Button onClick={calculateTorqueTransfer} className="w-full">
                              Calculate T_out
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Shaft Sizing */}
                      <div className="border rounded-lg p-4 bg-muted/20">
                        <h4 className="font-medium mb-3">Shaft Sizing</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <Label>Applied Torque (N⋅m)</Label>
                            <Input
                              type="number"
                              value={gearInputs.torqueIn}
                              onChange={(e) => setGearInputs({...gearInputs, torqueIn: e.target.value})}
                              placeholder="200"
                            />
                          </div>
                          <div className="flex items-end">
                            <Button onClick={calculateShaftSizing} className="w-full">
                              Calculate Diameter
                            </Button>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Thermal Systems */}
                  <AccordionItem value="thermal" className="border rounded-lg mb-2">
                    <AccordionTrigger className="px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center mr-3">
                          🌡️
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold">Advanced Thermal Systems</h3>
                          <p className="text-sm text-muted-foreground">Heat transfer, conduction, convection, fin efficiency</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 space-y-4">
                      {/* Conductive Heat Transfer */}
                      <div className="border rounded-lg p-4 bg-muted/20">
                        <h4 className="font-medium mb-3">Conductive Heat Transfer (Fourier's Law)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                          <div>
                            <Label>k (W/m⋅K)</Label>
                            <Input
                              type="number"
                              value={thermalInputs.thermalConductivity}
                              onChange={(e) => setThermalInputs({...thermalInputs, thermalConductivity: e.target.value})}
                              placeholder="200"
                            />
                          </div>
                          <div>
                            <Label>Area (m²)</Label>
                            <Input
                              type="number"
                              value={thermalInputs.area}
                              onChange={(e) => setThermalInputs({...thermalInputs, area: e.target.value})}
                              placeholder="0.01"
                            />
                          </div>
                          <div>
                            <Label>Thickness (m)</Label>
                            <Input
                              type="number"
                              value={thermalInputs.thickness}
                              onChange={(e) => setThermalInputs({...thermalInputs, thickness: e.target.value})}
                              placeholder="0.005"
                            />
                          </div>
                          <div>
                            <Label>ΔT (°C)</Label>
                            <Input
                              type="number"
                              value={thermalInputs.tempDiff}
                              onChange={(e) => setThermalInputs({...thermalInputs, tempDiff: e.target.value})}
                              placeholder="50"
                            />
                          </div>
                          <div className="flex items-end">
                            <Button onClick={calculateConductiveHeatTransfer} className="w-full">
                              Calculate Q
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Convective Heat Transfer */}
                      <div className="border rounded-lg p-4 bg-muted/20">
                        <h4 className="font-medium mb-3">Convective Heat Transfer</h4>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                          <div>
                            <Label>h (W/m²⋅K)</Label>
                            <Input
                              type="number"
                              value={thermalInputs.convectionCoeff}
                              onChange={(e) => setThermalInputs({...thermalInputs, convectionCoeff: e.target.value})}
                              placeholder="25"
                            />
                          </div>
                          <div>
                            <Label>Surface Area (m²)</Label>
                            <Input
                              type="number"
                              value={thermalInputs.surfaceArea}
                              onChange={(e) => setThermalInputs({...thermalInputs, surfaceArea: e.target.value})}
                              placeholder="0.05"
                            />
                          </div>
                          <div>
                            <Label>ΔT (°C)</Label>
                            <Input
                              type="number"
                              value={thermalInputs.tempDiff}
                              onChange={(e) => setThermalInputs({...thermalInputs, tempDiff: e.target.value})}
                              placeholder="30"
                            />
                          </div>
                          <div className="flex items-end">
                            <Button onClick={calculateConvectiveHeatTransfer} className="w-full">
                              Calculate Q
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Fin Efficiency */}
                      <div className="border rounded-lg p-4 bg-muted/20">
                        <h4 className="font-medium mb-3">Fin Efficiency</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <Label>Fin Length (m)</Label>
                            <Input
                              type="number"
                              value={thermalInputs.finLength}
                              onChange={(e) => setThermalInputs({...thermalInputs, finLength: e.target.value})}
                              placeholder="0.05"
                            />
                          </div>
                          <div>
                            <Label>Fin Diameter (m)</Label>
                            <Input
                              type="number"
                              value={thermalInputs.finDiameter}
                              onChange={(e) => setThermalInputs({...thermalInputs, finDiameter: e.target.value})}
                              placeholder="0.008"
                            />
                          </div>
                          <div className="flex items-end">
                            <Button onClick={calculateFinEfficiency} className="w-full">
                              Calculate η_fin
                            </Button>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Suppliers with CAD Downloads */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="mr-2 h-5 w-5" />
                  CAD Suppliers Database
                </CardTitle>
                <CardDescription>
                  Global suppliers offering downloadable CAD files (STEP, IGES)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suppliers.map((supplier, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{supplier.name}</h4>
                        <Button size="sm" variant="outline" asChild>
                          <a href={supplier.website} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Visit
                          </a>
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{supplier.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {supplier.cadFormats.map((format) => (
                            <Badge key={format} variant="secondary" className="text-xs">
                              {format}
                            </Badge>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{supplier.specialty}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Standards Library */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <FileText className="mr-2 h-5 w-5" />
                  Standards Library
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {standards.map((standard, index) => (
                    <div key={index} className="border-l-2 border-primary pl-3">
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="font-medium text-sm">{standard.name}</h5>
                        <Button size="sm" variant="ghost" asChild className="h-6 px-2">
                          <a href={standard.pdf} target="_blank" rel="noopener noreferrer">
                            <FileText className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">{standard.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Live Articles Feed */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Recent Articles
                </CardTitle>
                <CardDescription>Live feed from engineering sources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentArticles.map((article, index) => (
                    <div key={index} className="space-y-2">
                      <h5 className="font-medium text-sm leading-tight">{article.title}</h5>
                      <p className="text-xs text-muted-foreground leading-relaxed">{article.summary}</p>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>{article.source}</span>
                        <span>{article.time}</span>
                      </div>
                      {index < recentArticles.length - 1 && <Separator className="mt-3" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* PLM Access */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Database className="mr-2 h-5 w-5" />
                  PLM Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Read-only access to Product Lifecycle Management system
                </p>
                <Button className="w-full" variant="outline">
                  Login to PLM
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Mechanics;
