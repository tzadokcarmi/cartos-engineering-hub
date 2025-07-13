
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
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
  const { t } = useLanguage();
  
  const sectors = [
    {
      title: t('sector.mechanics.title'),
      description: t('sector.mechanics.description'),
      icon: Cpu,
      href: "/mechanics",
      features: ["CAD Downloads", "Stress Calculators", "Material Database", "Thermal Analysis"],
      color: "bg-blue-500"
    },
    {
      title: t('sector.electronics.title'),
      description: t('sector.electronics.description'),
      icon: Cpu,
      href: "/electronics", 
      features: ["Ohm's Law Calc", "Power Analysis", "Component DB", "Standards Library"],
      color: "bg-green-500"
    },
    {
      title: t('sector.rf.title'),
      description: t('sector.rf.description'),
      icon: Radio,
      href: "/rf",
      features: ["S-Parameters", "VSWR Analysis", "Impedance Match", "Freq/Wavelength"],
      color: "bg-purple-500"
    }
  ];

  const keyFeatures = [
    {
      icon: FileText,
      title: t('feature.bomAnalyzer.title'),
      description: t('feature.bomAnalyzer.description'),
      href: "/bom-analyzer"
    },
    {
      icon: Calculator,
      title: "Engineering Calculators",
      description: "Sector-specific calculators for stress, power, RF parameters, and more"
    },
    {
      icon: Database,
      title: t('feature.supplierCatalogs.title'),
      description: t('feature.supplierCatalogs.description'),
      sources: [
        { name: "Digi-Key", url: "https://www.digikey.com/" },
        { name: "Mouser Electronics", url: "https://www.mouser.com/" },
        { name: "Arrow Electronics", url: "https://www.arrow.com/" },
        { name: "McMaster-Carr", url: "https://www.mcmaster.com/" }
      ]
    },
    {
      icon: TrendingUp,
      title: t('feature.liveFeeds.title'),
      description: t('feature.liveFeeds.description'),
      sources: [
        { name: "IEEE Xplore", url: "https://ieeexplore.ieee.org/" },
        { name: "EDN Network", url: "https://www.edn.com/" },
        { name: "Microwave Journal", url: "https://www.microwavejournal.com/" },
        { name: "RF GlobalNet", url: "https://www.rfglobalnet.com/" }
      ]
    },
    {
      icon: Shield,
      title: t('feature.standardsLibrary.title'),
      description: t('feature.standardsLibrary.description'),
      sources: [
        { name: "ISO Standards", url: "https://www.iso.org/standards.html" },
        { name: "IPC Standards", url: "https://www.ipc.org/standards" },
        { name: "JEDEC", url: "https://www.jedec.org/" },
        { name: "NASA Standards", url: "https://standards.nasa.gov/" }
      ]
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
            {t('company.name')}
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
            {t('home.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('home.subtitle')}
          </p>
        </div>

        {/* Engineering Sectors */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">{t('home.sectors.title')}</h3>
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
                        {t('button.explore')} {sector.title}
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
          <h3 className="text-2xl font-bold mb-6 text-center">{t('home.features.title')}</h3>
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
                     {feature.sources && (
                       <div className="mt-4 space-y-2">
                         <p className="text-sm font-medium text-muted-foreground">External Sources:</p>
                         <div className="grid grid-cols-1 gap-2">
                           {feature.sources.map((source) => (
                             <Button
                               key={source.name}
                               variant="outline"
                               size="sm"
                               asChild
                               className="justify-start h-8"
                             >
                               <a href={source.url} target="_blank" rel="noopener noreferrer">
                                 <ExternalLink className="mr-2 h-3 w-3" />
                                 {source.name}
                               </a>
                             </Button>
                           ))}
                         </div>
                       </div>
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
              <CardTitle className="text-xl">{t('home.quickAccess.title')}</CardTitle>
              <CardDescription>
                {t('home.quickAccess.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild variant="outline">
                  <Link to="/bom-analyzer">
                    <FileText className="mr-2 h-4 w-4" />
                    {t('quickAccess.bomAnalyzer.title')}
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/mechanics">
                    <Calculator className="mr-2 h-4 w-4" />
                    {t('quickAccess.calculators.title')}
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
