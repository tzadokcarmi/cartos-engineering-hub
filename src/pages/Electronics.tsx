
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
  Zap, 
  Database,
  FileText,
  TrendingUp,
  Cpu,
  Activity,
  Settings
} from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

const Electronics = () => {
  const { t } = useLanguage();
  const [ohmInputs, setOhmInputs] = useState({ voltage: '', current: '', resistance: '' });
  const [dividerInputs, setDividerInputs] = useState({ vin: '', r1: '', r2: '' });
  const [powerInputs, setPowerInputs] = useState({ voltage: '', current: '' });
  const [capacitorInputs, setCapacitorInputs] = useState({ capacitance: '', frequency: '' });
  const [inductorInputs, setInductorInputs] = useState({ inductance: '', frequency: '' });
  const [rcInputs, setRcInputs] = useState({ resistance: '', capacitance: '' });

  const suppliers = [
    {
      name: "Digi-Key Electronics",
      description: "Global electronic components distributor",
      website: "https://digikey.com",
      specialty: "Semiconductors, passives, connectors",
      inventory: "10M+ parts"
    },
    {
      name: "Mouser Electronics",
      description: "Authorized distributor of electronic components",
      website: "https://mouser.com",
      specialty: "Latest semiconductors, development boards",
      inventory: "5M+ parts"
    },
    {
      name: "Arrow Electronics",
      description: "Global provider of products and services",
      website: "https://arrow.com",
      specialty: "Enterprise solutions, embedded",
      inventory: "2M+ parts"
    },
    {
      name: "Newark/Farnell",
      description: "High-service distributor of technology products",
      website: "https://newark.com",
      specialty: "Test equipment, development tools",
      inventory: "1M+ parts"
    },
    {
      name: "RS Components",
      description: "Industrial and electronic products supplier",
      website: "https://rs-online.com",
      specialty: "Industrial automation, maintenance",
      inventory: "500K+ parts"
    }
  ];

  const standards = [
    { name: "IPC-2221", description: "Generic Standard for PCB Design", pdf: "https://www.ipc.org/TOC/IPC-2221A.pdf" },
    { name: "IPC-6012", description: "Qualification and Performance Specification for Rigid PCB", pdf: "https://www.ipc.org/TOC/IPC-6012D.pdf" },
    { name: "JEDEC", description: "Semiconductor standards and publications", pdf: "https://www.jedec.org/standards-documents" },
    { name: "IEEE 802.11", description: "Wireless LAN standards", pdf: "https://standards.ieee.org/ieee/802.11/7028/" },
    { name: "MIL-STD-202", description: "Electronic and Electrical Component Parts", pdf: "https://quicksearch.dla.mil/qsDocDetails.aspx?ident_number=35978" }
  ];

  const recentArticles = [
    { 
      title: "Next-Gen Power Management ICs", 
      source: "EDN", 
      time: "1 hour ago",
      summary: "Revolutionary PMICs with 95% efficiency and integrated AI-driven load balancing for automotive and industrial applications.",
      url: "https://www.edn.com/power-management-ic-trends/"
    },
    { 
      title: "5G RF Circuit Design Challenges", 
      source: "Microwave Journal", 
      time: "3 hours ago",
      summary: "Overcoming thermal and linearity challenges in 5G millimeter-wave front-end modules using advanced GaN technology.",
      url: "https://www.microwavejournal.com/articles/38741-5g-rf-circuit-design-challenges"
    },
    { 
      title: "Advanced PCB Layout Techniques", 
      source: "All About Circuits", 
      time: "5 hours ago",
      summary: "Best practices for high-speed digital design including via stitching, layer stackup optimization, and crosstalk mitigation.",
      url: "https://www.allaboutcircuits.com/technical-articles/advanced-pcb-layout-techniques/"
    },
    { 
      title: "EMC/EMI Design Guidelines", 
      source: "IEEE Spectrum", 
      time: "7 hours ago",
      summary: "New approaches to electromagnetic compatibility in dense electronics using metamaterial shielding and active filtering.",
      url: "https://spectrum.ieee.org/emc-emi-design-guidelines"
    },
    { 
      title: "SiC and GaN Power Devices", 
      source: "Power Electronics News", 
      time: "10 hours ago",
      summary: "Comparative analysis of Silicon Carbide vs Gallium Nitride for high-voltage, high-frequency power conversion applications.",
      url: "https://www.powerelectronicsnews.com/sic-gan-power-devices/"
    }
  ];

  const calculateOhmsLaw = (type: string) => {
    const V = parseFloat(ohmInputs.voltage);
    const I = parseFloat(ohmInputs.current);
    const R = parseFloat(ohmInputs.resistance);

    let result = '';
    
    if (type === 'voltage' && I && R) {
      result = `Voltage: ${(I * R).toFixed(2)} V`;
    } else if (type === 'current' && V && R) {
      result = `Current: ${(V / R).toFixed(3)} A`;
    } else if (type === 'resistance' && V && I) {
      result = `Resistance: ${(V / I).toFixed(2)} Ω`;
    }

    if (result) {
      toast({
        title: "Ohm's Law Calculation",
        description: result,
      });
    }
  };

  const calculateVoltageDivider = () => {
    const vin = parseFloat(dividerInputs.vin);
    const r1 = parseFloat(dividerInputs.r1);
    const r2 = parseFloat(dividerInputs.r2);
    
    if (vin && r1 && r2) {
      const vout = vin * (r2 / (r1 + r2));
      toast({
        title: "Voltage Divider Result",
        description: `Output Voltage: ${vout.toFixed(3)} V`,
      });
    }
  };

  const calculatePower = () => {
    const voltage = parseFloat(powerInputs.voltage);
    const current = parseFloat(powerInputs.current);
    
    if (voltage && current) {
      const power = voltage * current;
      toast({
        title: "Power Calculation Result",
        description: `Power: ${power.toFixed(3)} W`,
      });
    }
  };

  const calculateCapacitiveReactance = () => {
    const capacitance = parseFloat(capacitorInputs.capacitance) * 1e-6; // Convert µF to F
    const frequency = parseFloat(capacitorInputs.frequency);
    
    if (capacitance && frequency) {
      const reactance = 1 / (2 * Math.PI * frequency * capacitance);
      toast({
        title: "Capacitive Reactance",
        description: `Xc = ${reactance.toFixed(2)} Ω at ${frequency} Hz`,
      });
    }
  };

  const calculateInductiveReactance = () => {
    const inductance = parseFloat(inductorInputs.inductance) * 1e-3; // Convert mH to H
    const frequency = parseFloat(inductorInputs.frequency);
    
    if (inductance && frequency) {
      const reactance = 2 * Math.PI * frequency * inductance;
      toast({
        title: "Inductive Reactance",
        description: `XL = ${reactance.toFixed(2)} Ω at ${frequency} Hz`,
      });
    }
  };

  const calculateRCTimeConstant = () => {
    const resistance = parseFloat(rcInputs.resistance);
    const capacitance = parseFloat(rcInputs.capacitance) * 1e-6; // Convert µF to F
    
    if (resistance && capacitance) {
      const timeConstant = resistance * capacitance;
      const cutoffFreq = 1 / (2 * Math.PI * timeConstant);
      toast({
        title: "RC Time Constant",
        description: `τ = ${timeConstant.toFixed(6)} s, fc = ${cutoffFreq.toFixed(2)} Hz`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('page.electronics.title')}</h1>
          <p className="text-muted-foreground">
            {t('page.electronics.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Engineering Calculators */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="mr-2 h-5 w-5" />
                  Electronic Calculators
                </CardTitle>
                <CardDescription>
                  Essential electronic circuit calculations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="ohms-law">
                    <AccordionTrigger className="flex items-center">
                      <Zap className="mr-2 h-4 w-4" />
                      Ohm's Law Calculator
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div>
                          <Label htmlFor="voltage">Voltage (V)</Label>
                          <Input
                            id="voltage"
                            type="number"
                            value={ohmInputs.voltage}
                            onChange={(e) => setOhmInputs({...ohmInputs, voltage: e.target.value})}
                            placeholder="Volts"
                          />
                        </div>
                        <div>
                          <Label htmlFor="current">Current (A)</Label>
                          <Input
                            id="current"
                            type="number"
                            value={ohmInputs.current}
                            onChange={(e) => setOhmInputs({...ohmInputs, current: e.target.value})}
                            placeholder="Amperes"
                          />
                        </div>
                        <div>
                          <Label htmlFor="resistance">Resistance (Ω)</Label>
                          <Input
                            id="resistance"
                            type="number"
                            value={ohmInputs.resistance}
                            onChange={(e) => setOhmInputs({...ohmInputs, resistance: e.target.value})}
                            placeholder="Ohms"
                          />
                        </div>
                        <div className="flex items-end">
                          <div className="w-full space-y-2">
                            <Button size="sm" onClick={() => calculateOhmsLaw('voltage')} className="w-full text-xs">
                              Calc V
                            </Button>
                            <Button size="sm" onClick={() => calculateOhmsLaw('current')} className="w-full text-xs">
                              Calc I
                            </Button>
                            <Button size="sm" onClick={() => calculateOhmsLaw('resistance')} className="w-full text-xs">
                              Calc R
                            </Button>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="voltage-divider">
                    <AccordionTrigger>
                      Voltage Divider Calculator
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div>
                          <Label htmlFor="vin">Input Voltage (V)</Label>
                          <Input
                            id="vin"
                            type="number"
                            value={dividerInputs.vin}
                            onChange={(e) => setDividerInputs({...dividerInputs, vin: e.target.value})}
                            placeholder="Vin"
                          />
                        </div>
                        <div>
                          <Label htmlFor="r1">R1 (Ω)</Label>
                          <Input
                            id="r1"
                            type="number"
                            value={dividerInputs.r1}
                            onChange={(e) => setDividerInputs({...dividerInputs, r1: e.target.value})}
                            placeholder="R1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="r2">R2 (Ω)</Label>
                          <Input
                            id="r2"
                            type="number"
                            value={dividerInputs.r2}
                            onChange={(e) => setDividerInputs({...dividerInputs, r2: e.target.value})}
                            placeholder="R2"
                          />
                        </div>
                        <div className="flex items-end">
                          <Button onClick={calculateVoltageDivider} className="w-full">
                            Calculate Vout
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="power">
                    <AccordionTrigger>
                      Power Dissipation Calculator
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <Label htmlFor="power-voltage">Voltage (V)</Label>
                          <Input
                            id="power-voltage"
                            type="number"
                            value={powerInputs.voltage}
                            onChange={(e) => setPowerInputs({...powerInputs, voltage: e.target.value})}
                            placeholder="Voltage"
                          />
                        </div>
                        <div>
                          <Label htmlFor="power-current">Current (A)</Label>
                          <Input
                            id="power-current"
                            type="number"
                            value={powerInputs.current}
                            onChange={(e) => setPowerInputs({...powerInputs, current: e.target.value})}
                            placeholder="Current"
                          />
                        </div>
                        <div className="flex items-end">
                          <Button onClick={calculatePower} className="w-full">
                            Calculate Power
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="capacitor">
                    <AccordionTrigger className="flex items-center">
                      <Activity className="mr-2 h-4 w-4" />
                      Capacitive Reactance Calculator
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <Label htmlFor="capacitance">Capacitance (µF)</Label>
                          <Input
                            id="capacitance"
                            type="number"
                            value={capacitorInputs.capacitance}
                            onChange={(e) => setCapacitorInputs({...capacitorInputs, capacitance: e.target.value})}
                            placeholder="10"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cap-frequency">Frequency (Hz)</Label>
                          <Input
                            id="cap-frequency"
                            type="number"
                            value={capacitorInputs.frequency}
                            onChange={(e) => setCapacitorInputs({...capacitorInputs, frequency: e.target.value})}
                            placeholder="1000"
                          />
                        </div>
                        <div className="flex items-end">
                          <Button onClick={calculateCapacitiveReactance} className="w-full">
                            Calculate Xc
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="inductor">
                    <AccordionTrigger className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Inductive Reactance Calculator
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <Label htmlFor="inductance">Inductance (mH)</Label>
                          <Input
                            id="inductance"
                            type="number"
                            value={inductorInputs.inductance}
                            onChange={(e) => setInductorInputs({...inductorInputs, inductance: e.target.value})}
                            placeholder="100"
                          />
                        </div>
                        <div>
                          <Label htmlFor="ind-frequency">Frequency (Hz)</Label>
                          <Input
                            id="ind-frequency"
                            type="number"
                            value={inductorInputs.frequency}
                            onChange={(e) => setInductorInputs({...inductorInputs, frequency: e.target.value})}
                            placeholder="1000"
                          />
                        </div>
                        <div className="flex items-end">
                          <Button onClick={calculateInductiveReactance} className="w-full">
                            Calculate XL
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="rc-time">
                    <AccordionTrigger>
                      RC Time Constant Calculator
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <Label htmlFor="rc-resistance">Resistance (Ω)</Label>
                          <Input
                            id="rc-resistance"
                            type="number"
                            value={rcInputs.resistance}
                            onChange={(e) => setRcInputs({...rcInputs, resistance: e.target.value})}
                            placeholder="1000"
                          />
                        </div>
                        <div>
                          <Label htmlFor="rc-capacitance">Capacitance (µF)</Label>
                          <Input
                            id="rc-capacitance"
                            type="number"
                            value={rcInputs.capacitance}
                            onChange={(e) => setRcInputs({...rcInputs, capacitance: e.target.value})}
                            placeholder="10"
                          />
                        </div>
                        <div className="flex items-end">
                          <Button onClick={calculateRCTimeConstant} className="w-full">
                            Calculate τ
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Component Suppliers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Cpu className="mr-2 h-5 w-5" />
                  Component Suppliers
                </CardTitle>
                <CardDescription>
                  Global electronic component distributors and catalogs
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
                          {supplier.inventory}
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
                <CardDescription>Live feed from electronic sources</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="space-y-4">
                   {recentArticles.map((article, index) => (
                     <div key={index} className="space-y-2">
                       <div className="flex justify-between items-start gap-2">
                         <h5 className="font-medium text-sm leading-tight flex-1">{article.title}</h5>
                         <Button size="sm" variant="ghost" asChild className="h-6 px-2 shrink-0">
                           <a href={article.url} target="_blank" rel="noopener noreferrer">
                             <ExternalLink className="h-3 w-3" />
                           </a>
                         </Button>
                       </div>
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

export default Electronics;
