
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
  const [stressInputs, setStressInputs] = useState({ force: '', area: '' });
  const [torqueInputs, setTorqueInputs] = useState({ force: '', radius: '' });
  const [thermalInputs, setThermalInputs] = useState({ length: '', temp: '', coefficient: '' });
  const [beamInputs, setBeamInputs] = useState({ load: '', length: '', momentOfInertia: '' });
  const [fatigueInputs, setFatigueInputs] = useState({ maxStress: '', minStress: '', cycles: '' });
  const [materialInputs, setMaterialInputs] = useState({ youngsModulus: '', stress: '' });

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

  const calculateStress = () => {
    const force = parseFloat(stressInputs.force);
    const area = parseFloat(stressInputs.area);
    if (force && area) {
      const stress = force / area;
      toast({
        title: "Stress Calculation Result",
        description: `Stress: ${stress.toFixed(2)} MPa`,
      });
    }
  };

  const calculateTorque = () => {
    const force = parseFloat(torqueInputs.force);
    const radius = parseFloat(torqueInputs.radius);
    if (force && radius) {
      const torque = force * radius;
      toast({
        title: "Torque Calculation Result",
        description: `Torque: ${torque.toFixed(2)} N⋅m`,
      });
    }
  };

  const calculateThermalExpansion = () => {
    const length = parseFloat(thermalInputs.length);
    const temp = parseFloat(thermalInputs.temp);
    const coefficient = parseFloat(thermalInputs.coefficient);
    if (length && temp && coefficient) {
      const expansion = length * coefficient * temp;
      toast({
        title: "Thermal Expansion Result",
        description: `Expansion: ${expansion.toFixed(6)} mm`,
      });
    }
  };

  const calculateBeamDeflection = () => {
    const load = parseFloat(beamInputs.load);
    const length = parseFloat(beamInputs.length);
    const momentOfInertia = parseFloat(beamInputs.momentOfInertia);
    const E = 200000; // Steel modulus in MPa (default)
    
    if (load && length && momentOfInertia) {
      // Simply supported beam with point load at center
      const deflection = (load * Math.pow(length, 3)) / (48 * E * momentOfInertia);
      toast({
        title: "Beam Deflection Result",
        description: `Maximum Deflection: ${deflection.toFixed(6)} mm`,
      });
    }
  };

  const calculateFatigueLife = () => {
    const maxStress = parseFloat(fatigueInputs.maxStress);
    const minStress = parseFloat(fatigueInputs.minStress);
    const cycles = parseFloat(fatigueInputs.cycles);
    
    if (maxStress && minStress) {
      const stressAmplitude = (maxStress - minStress) / 2;
      const meanStress = (maxStress + minStress) / 2;
      const stressRatio = minStress / maxStress;
      
      toast({
        title: "Fatigue Analysis Result",
        description: `Stress Amplitude: ${stressAmplitude.toFixed(2)} MPa, R-ratio: ${stressRatio.toFixed(3)}`,
      });
    }
  };

  const calculateStrain = () => {
    const youngsModulus = parseFloat(materialInputs.youngsModulus);
    const stress = parseFloat(materialInputs.stress);
    
    if (youngsModulus && stress) {
      const strain = stress / youngsModulus;
      const strainPercent = strain * 100;
      toast({
        title: "Strain Calculation",
        description: `Strain: ${strain.toFixed(6)} (${strainPercent.toFixed(4)}%)`,
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
                  <AccordionItem value="stress">
                    <AccordionTrigger className="flex items-center">
                      <Wrench className="mr-2 h-4 w-4" />
                      Stress Calculator
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <Label htmlFor="force">Force (N)</Label>
                          <Input
                            id="force"
                            type="number"
                            value={stressInputs.force}
                            onChange={(e) => setStressInputs({...stressInputs, force: e.target.value})}
                            placeholder="Enter force"
                          />
                        </div>
                        <div>
                          <Label htmlFor="area">Area (mm²)</Label>
                          <Input
                            id="area"
                            type="number"
                            value={stressInputs.area}
                            onChange={(e) => setStressInputs({...stressInputs, area: e.target.value})}
                            placeholder="Enter area"
                          />
                        </div>
                        <div className="flex items-end">
                          <Button onClick={calculateStress} className="w-full">
                            Calculate Stress
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="torque">
                    <AccordionTrigger>
                      Torque Calculator
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <Label htmlFor="torque-force">Force (N)</Label>
                          <Input
                            id="torque-force"
                            type="number"
                            value={torqueInputs.force}
                            onChange={(e) => setTorqueInputs({...torqueInputs, force: e.target.value})}
                            placeholder="Enter force"
                          />
                        </div>
                        <div>
                          <Label htmlFor="radius">Radius (m)</Label>
                          <Input
                            id="radius"
                            type="number"
                            value={torqueInputs.radius}
                            onChange={(e) => setTorqueInputs({...torqueInputs, radius: e.target.value})}
                            placeholder="Enter radius"
                          />
                        </div>
                        <div className="flex items-end">
                          <Button onClick={calculateTorque} className="w-full">
                            Calculate Torque
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="thermal">
                    <AccordionTrigger className="flex items-center">
                      <Thermometer className="mr-2 h-4 w-4" />
                      Thermal Expansion Calculator
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div>
                          <Label htmlFor="length">Length (mm)</Label>
                          <Input
                            id="length"
                            type="number"
                            value={thermalInputs.length}
                            onChange={(e) => setThermalInputs({...thermalInputs, length: e.target.value})}
                            placeholder="Initial length"
                          />
                        </div>
                        <div>
                          <Label htmlFor="temp">ΔT (°C)</Label>
                          <Input
                            id="temp"
                            type="number"
                            value={thermalInputs.temp}
                            onChange={(e) => setThermalInputs({...thermalInputs, temp: e.target.value})}
                            placeholder="Temp change"
                          />
                        </div>
                        <div>
                          <Label htmlFor="coefficient">α (1/°C)</Label>
                          <Input
                            id="coefficient"
                            type="number"
                            step="0.000001"
                            value={thermalInputs.coefficient}
                            onChange={(e) => setThermalInputs({...thermalInputs, coefficient: e.target.value})}
                            placeholder="Coefficient"
                          />
                        </div>
                        <div className="flex items-end">
                          <Button onClick={calculateThermalExpansion} className="w-full">
                            Calculate
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="beam">
                    <AccordionTrigger className="flex items-center">
                      <Activity className="mr-2 h-4 w-4" />
                      Beam Deflection Calculator
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div>
                          <Label htmlFor="load">Load (N)</Label>
                          <Input
                            id="load"
                            type="number"
                            value={beamInputs.load}
                            onChange={(e) => setBeamInputs({...beamInputs, load: e.target.value})}
                            placeholder="Point load"
                          />
                        </div>
                        <div>
                          <Label htmlFor="beam-length">Length (mm)</Label>
                          <Input
                            id="beam-length"
                            type="number"
                            value={beamInputs.length}
                            onChange={(e) => setBeamInputs({...beamInputs, length: e.target.value})}
                            placeholder="Beam length"
                          />
                        </div>
                        <div>
                          <Label htmlFor="moment">I (mm⁴)</Label>
                          <Input
                            id="moment"
                            type="number"
                            value={beamInputs.momentOfInertia}
                            onChange={(e) => setBeamInputs({...beamInputs, momentOfInertia: e.target.value})}
                            placeholder="Moment of inertia"
                          />
                        </div>
                        <div className="flex items-end">
                          <Button onClick={calculateBeamDeflection} className="w-full">
                            Calculate
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="fatigue">
                    <AccordionTrigger className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Fatigue Analysis Calculator
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <Label htmlFor="max-stress">Max Stress (MPa)</Label>
                          <Input
                            id="max-stress"
                            type="number"
                            value={fatigueInputs.maxStress}
                            onChange={(e) => setFatigueInputs({...fatigueInputs, maxStress: e.target.value})}
                            placeholder="Maximum"
                          />
                        </div>
                        <div>
                          <Label htmlFor="min-stress">Min Stress (MPa)</Label>
                          <Input
                            id="min-stress"
                            type="number"
                            value={fatigueInputs.minStress}
                            onChange={(e) => setFatigueInputs({...fatigueInputs, minStress: e.target.value})}
                            placeholder="Minimum"
                          />
                        </div>
                        <div className="flex items-end">
                          <Button onClick={calculateFatigueLife} className="w-full">
                            Analyze
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="strain">
                    <AccordionTrigger>
                      Strain Calculator
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <Label htmlFor="youngs">Young's Modulus (GPa)</Label>
                          <Input
                            id="youngs"
                            type="number"
                            value={materialInputs.youngsModulus}
                            onChange={(e) => setMaterialInputs({...materialInputs, youngsModulus: e.target.value})}
                            placeholder="200"
                          />
                        </div>
                        <div>
                          <Label htmlFor="stress-input">Stress (MPa)</Label>
                          <Input
                            id="stress-input"
                            type="number"
                            value={materialInputs.stress}
                            onChange={(e) => setMaterialInputs({...materialInputs, stress: e.target.value})}
                            placeholder="Stress"
                          />
                        </div>
                        <div className="flex items-end">
                          <Button onClick={calculateStrain} className="w-full">
                            Calculate
                          </Button>
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
