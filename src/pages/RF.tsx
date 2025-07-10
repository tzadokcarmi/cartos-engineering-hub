
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
  Radio, 
  Database,
  FileText,
  TrendingUp,
  Waves
} from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const RF = () => {
  const [impedanceInputs, setImpedanceInputs] = useState({ z1: '', z2: '' });
  const [vswriteInputs, setVswriteInputs] = useState({ forward: '', reflected: '' });
  const [frequencyInputs, setFrequencyInputs] = useState({ frequency: '', wavelength: '' });

  const suppliers = [
    {
      name: "Mini-Circuits",
      description: "RF/microwave components and test equipment",
      website: "https://minicircuits.com",
      specialty: "Amplifiers, filters, mixers, power dividers",
      products: "25K+ RF products"
    },
    {
      name: "Analog Devices",
      description: "High-performance RF and microwave ICs",
      website: "https://analog.com",
      specialty: "RF transceivers, PLLs, ADCs/DACs",
      products: "RF/Microwave portfolio"
    },
    {
      name: "Qorvo",
      description: "RF solutions for mobile, infrastructure, defense",
      website: "https://qorvo.com",
      specialty: "GaN, GaAs power amplifiers",
      products: "Broadband solutions"
    },
    {
      name: "Keysight Technologies",
      description: "Electronic test and measurement equipment",
      website: "https://keysight.com",
      specialty: "Vector network analyzers, signal generators",
      products: "RF test solutions"
    },
    {
      name: "Rohde & Schwarz",
      description: "Test and measurement, broadcast technology",
      website: "https://rohde-schwarz.com",
      specialty: "Spectrum analyzers, EMC test",
      products: "RF measurement"
    }
  ];

  const standards = [
    { name: "IEEE 802.11", description: "Wireless LAN standards and protocols" },
    { name: "3GPP TS 36", description: "LTE and 5G technical specifications" },
    { name: "MIL-STD-461", description: "EMC requirements for military systems" },
    { name: "FCC Part 15", description: "Radio frequency device regulations" },
    { name: "ETSI EN 300", description: "European telecommunications standards" }
  ];

  const recentArticles = [
    { title: "5G mmWave Antenna Design", source: "Microwave Journal", time: "30 min ago" },
    { title: "GaN Power Amplifier Efficiency", source: "RF Design", time: "2 hours ago" },
    { title: "Phased Array Beamforming", source: "IEEE Microwave Magazine", time: "4 hours ago" },
    { title: "RF Filter Design Techniques", source: "All About Circuits", time: "6 hours ago" },
    { title: "Satellite Communication Trends", source: "Via Satellite", time: "8 hours ago" }
  ];

  const calculateImpedanceMatch = () => {
    const z1 = parseFloat(impedanceInputs.z1);
    const z2 = parseFloat(impedanceInputs.z2);
    
    if (z1 && z2) {
      // Calculate impedance matching network (L-section)
      const q = Math.sqrt((z2 / z1) - 1);
      const xl = q * z1;
      const xc = z2 / q;
      
      toast({
        title: "Impedance Matching Result",
        description: `XL: ${xl.toFixed(2)} Ω, XC: ${xc.toFixed(2)} Ω, Q: ${q.toFixed(2)}`,
      });
    }
  };

  const calculateVSWR = () => {
    const forward = parseFloat(vswriteInputs.forward);
    const reflected = parseFloat(vswriteInputs.reflected);
    
    if (forward && reflected >= 0) {
      const gamma = reflected / forward;
      const vswr = (1 + gamma) / (1 - gamma);
      const returnLoss = -20 * Math.log10(gamma);
      
      toast({
        title: "VSWR Analysis Result",
        description: `VSWR: ${vswr.toFixed(2)}, RL: ${returnLoss.toFixed(1)} dB, Γ: ${gamma.toFixed(3)}`,
      });
    }
  };

  const calculateFrequencyWavelength = (type: string) => {
    const c = 299792458; // Speed of light in m/s
    
    if (type === 'wavelength') {
      const freq = parseFloat(frequencyInputs.frequency) * 1e6; // Convert MHz to Hz
      if (freq) {
        const wavelength = (c / freq) * 100; // Convert to cm
        toast({
          title: "Wavelength Calculation",
          description: `λ = ${wavelength.toFixed(2)} cm (${(wavelength/100).toFixed(3)} m)`,
        });
      }
    } else {
      const wavelength = parseFloat(frequencyInputs.wavelength) / 100; // Convert cm to m
      if (wavelength) {
        const frequency = (c / wavelength) / 1e6; // Convert Hz to MHz
        toast({
          title: "Frequency Calculation",
          description: `f = ${frequency.toFixed(2)} MHz (${(frequency/1000).toFixed(3)} GHz)`,
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">RF Engineering</h1>
          <p className="text-muted-foreground">
            Microwave design, S-parameters, impedance matching, and RF calculations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* RF Calculators */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="mr-2 h-5 w-5" />
                  RF Calculators
                </CardTitle>
                <CardDescription>
                  Essential RF and microwave engineering calculations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Impedance Matching Calculator */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center">
                    <Radio className="mr-2 h-4 w-4" />
                    Impedance Matching (L-Network)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <Label htmlFor="z1">Source Z (Ω)</Label>
                      <Input
                        id="z1"
                        type="number"
                        value={impedanceInputs.z1}
                        onChange={(e) => setImpedanceInputs({...impedanceInputs, z1: e.target.value})}
                        placeholder="50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="z2">Load Z (Ω)</Label>
                      <Input
                        id="z2"
                        type="number"
                        value={impedanceInputs.z2}
                        onChange={(e) => setImpedanceInputs({...impedanceInputs, z2: e.target.value})}
                        placeholder="75"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button onClick={calculateImpedanceMatch} className="w-full">
                        Calculate Match
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* VSWR Calculator */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center">
                    <Waves className="mr-2 h-4 w-4" />
                    VSWR & Return Loss Calculator
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <Label htmlFor="forward">Forward Power</Label>
                      <Input
                        id="forward"
                        type="number"
                        value={vswriteInputs.forward}
                        onChange={(e) => setVswriteInputs({...vswriteInputs, forward: e.target.value})}
                        placeholder="100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="reflected">Reflected Power</Label>
                      <Input
                        id="reflected"
                        type="number"
                        value={vswriteInputs.reflected}
                        onChange={(e) => setVswriteInputs({...vswriteInputs, reflected: e.target.value})}
                        placeholder="5"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button onClick={calculateVSWR} className="w-full">
                        Calculate VSWR
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Frequency/Wavelength Calculator */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Frequency ↔ Wavelength Calculator</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <Label htmlFor="frequency">Frequency (MHz)</Label>
                      <Input
                        id="frequency"
                        type="number"
                        value={frequencyInputs.frequency}
                        onChange={(e) => setFrequencyInputs({...frequencyInputs, frequency: e.target.value})}
                        placeholder="2400"
                      />
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full mt-2" 
                        onClick={() => calculateFrequencyWavelength('wavelength')}
                      >
                        → Get λ
                      </Button>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-2xl font-bold text-muted-foreground">↔</span>
                    </div>
                    <div>
                      <Label htmlFor="wavelength">Wavelength (cm)</Label>
                      <Input
                        id="wavelength"
                        type="number"
                        value={frequencyInputs.wavelength}
                        onChange={(e) => setFrequencyInputs({...frequencyInputs, wavelength: e.target.value})}
                        placeholder="12.5"
                      />
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full mt-2" 
                        onClick={() => calculateFrequencyWavelength('frequency')}
                      >
                        → Get f
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* RF Suppliers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Radio className="mr-2 h-5 w-5" />
                  RF/Microwave Suppliers
                </CardTitle>
                <CardDescription>
                  Global RF component suppliers and test equipment manufacturers
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
                        <Badge variant="secondary" className="text-xs">
                          {supplier.products}
                        </Badge>
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
                  RF Standards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {standards.map((standard, index) => (
                    <div key={index} className="border-l-2 border-primary pl-3">
                      <h5 className="font-medium text-sm">{standard.name}</h5>
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
                  Recent RF Articles
                </CardTitle>
                <CardDescription>Live feed from RF/microwave sources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentArticles.map((article, index) => (
                    <div key={index} className="space-y-1">
                      <h5 className="font-medium text-sm leading-tight">{article.title}</h5>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>{article.source}</span>
                        <span>{article.time}</span>
                      </div>
                      {index < recentArticles.length - 1 && <Separator className="mt-2" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* S-Parameters Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Database className="mr-2 h-5 w-5" />
                  S-Parameters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div><strong>S11:</strong> Input reflection coefficient</div>
                  <div><strong>S21:</strong> Forward transmission coefficient</div>
                  <div><strong>S12:</strong> Reverse transmission coefficient</div>
                  <div><strong>S22:</strong> Output reflection coefficient</div>
                </div>
                <Button className="w-full mt-3" variant="outline" size="sm">
                  S-Parameter Tools
                </Button>
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

export default RF;
