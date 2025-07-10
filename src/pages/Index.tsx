
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Cpu, 
  Radio, 
  FileText, 
  Calculator, 
  Database, 
  ExternalLink,
  TrendingUp,
  Shield,
  Globe
} from "lucide-react";

const Index = () => {
  const sectors = [
    {
      title: "Mechanics",
      description: "CAD files, stress analysis, material properties, and mechanical design tools",
      icon: Cpu,
      href: "/mechanics",
      features: ["CAD Downloads", "Stress Calculators", "Material Database", "Thermal Analysis"],
      color: "bg-blue-500"
    },
    {
      title: "Electronics",
      description: "Circuit analysis, component databases, and electronic design resources",
      icon: Cpu,
      href: "/electronics", 
      features: ["Ohm's Law Calc", "Power Analysis", "Component DB", "Standards Library"],
      color: "bg-green-500"
    },
    {
      title: "RF Engineering",
      description: "Microwave design, S-parameters, impedance matching, and RF calculations",
      icon: Radio,
      href: "/rf",
      features: ["S-Parameters", "VSWR Analysis", "Impedance Match", "Freq/Wavelength"],
      color: "bg-purple-500"
    }
  ];

  const keyFeatures = [
    {
      icon: FileText,
      title: "BOM Analyzer",
      description: "Upload and analyze Bills of Materials with part replacement suggestions",
      href: "/bom-analyzer"
    },
    {
      icon: Calculator,
      title: "Engineering Calculators",
      description: "Sector-specific calculators for stress, power, RF parameters, and more"
    },
    {
      icon: Database,
      title: "Supplier Catalogs",
      description: "Live links to global suppliers with downloadable specifications"
    },
    {
      icon: TrendingUp,
      title: "Live Article Feeds",
      description: "Real-time updates from IEEE, EDN, Microwave Journal, and more"
    },
    {
      icon: Shield,
      title: "Standards Library",
      description: "Access to IPC, ISO, JEDEC, NASA/ESA, and MIL-STD specifications"
    },
    {
      icon: Globe,
      title: "PLM Integration",
      description: "Read-only access to Product Lifecycle Management systems"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Cartos General Microwave
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
            Engineering Portal
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your comprehensive engineering resource hub for mechanics, electronics, and RF design. 
            Access calculators, supplier catalogs, standards, and advanced BOM analysis tools.
          </p>
        </div>

        {/* Engineering Sectors */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Engineering Sectors</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sectors.map((sector) => {
              const Icon = sector.icon;
              return (
                <Card key={sector.href} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${sector.color} text-white`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">{sector.title}</CardTitle>
                    </div>
                    <CardDescription className="text-sm">
                      {sector.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {sector.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <Button asChild className="w-full">
                      <Link to={sector.href}>
                        Enter {sector.title}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="hover:shadow-md transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Icon className="h-8 w-8 text-primary" />
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                    {feature.href && (
                      <Button asChild className="mt-4 w-full" variant="outline">
                        <Link to={feature.href}>
                          Access Tool
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Quick Access */}
        <section className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl">Quick Access</CardTitle>
              <CardDescription>
                Jump directly to frequently used tools and resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild variant="outline">
                  <Link to="/bom-analyzer">
                    <FileText className="mr-2 h-4 w-4" />
                    BOM Analyzer
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/mechanics">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculators
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/rf">
                    <Radio className="mr-2 h-4 w-4" />
                    RF Tools
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Index;
