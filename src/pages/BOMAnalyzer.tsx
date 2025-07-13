
import Header from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Upload, 
  FileText, 
  Search, 
  Download,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCcw
} from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface BOMItem {
  id: string;
  mpn: string;
  manufacturer: string;
  description: string;
  quantity: number;
  unitPrice: number;
  status: 'active' | 'eol' | 'nrnd' | 'unknown';
  alternatives?: Alternative[];
}

interface Alternative {
  mpn: string;
  manufacturer: string;
  description: string;
  unitPrice: number;
  availability: string;
  footprint: string;
  specs: string;
}

const BOMAnalyzer = () => {
  const { t } = useLanguage();
  const [bomData, setBomData] = useState<BOMItem[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock BOM data for demonstration
  const mockBomData: BOMItem[] = [
    {
      id: "1",
      mpn: "STM32F407VGT6",
      manufacturer: "STMicroelectronics",
      description: "32-bit ARM Cortex-M4 MCU, 1MB Flash",
      quantity: 10,
      unitPrice: 8.50,
      status: 'active',
      alternatives: [
        {
          mpn: "STM32F407VET6",
          manufacturer: "STMicroelectronics", 
          description: "32-bit ARM Cortex-M4 MCU, 512KB Flash",
          unitPrice: 7.20,
          availability: "In Stock",
          footprint: "LQFP-100",
          specs: "168MHz, 512KB Flash, 192KB RAM"
        },
        {
          mpn: "STM32F405RGT6",
          manufacturer: "STMicroelectronics",
          description: "32-bit ARM Cortex-M4 MCU, 1MB Flash",
          unitPrice: 7.80,
          availability: "Limited Stock",
          footprint: "LQFP-64",
          specs: "168MHz, 1MB Flash, 192KB RAM"
        }
      ]
    },
    {
      id: "2", 
      mpn: "LM2596S-3.3",
      manufacturer: "Texas Instruments",
      description: "Step-down voltage regulator, 3.3V output",
      quantity: 5,
      unitPrice: 2.45,
      status: 'eol',
      alternatives: [
        {
          mpn: "LM2596S-ADJ",
          manufacturer: "Texas Instruments",
          description: "Adjustable step-down voltage regulator",
          unitPrice: 2.60,
          availability: "In Stock",
          footprint: "TO-263",
          specs: "1.25V-37V adjustable, 3A"
        }
      ]
    },
    {
      id: "3",
      mpn: "MAX232CPE",
      manufacturer: "Maxim Integrated",
      description: "RS-232 level converter",
      quantity: 8,
      unitPrice: 3.20,
      status: 'nrnd',
      alternatives: [
        {
          mpn: "SP3232EEN",
          manufacturer: "Sipex",
          description: "RS-232 transceiver, low power",
          unitPrice: 2.95,
          availability: "In Stock", 
          footprint: "SOIC-16",
          specs: "3.0V-5.5V, 250kbps, ESD protection"
        }
      ]
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast({
        title: "File Selected",
        description: `${file.name} ready for analysis`,
      });
    }
  };

  const analyzeBOM = async () => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a BOM file first",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate BOM analysis process
    setTimeout(() => {
      setBomData(mockBomData);
      setIsAnalyzing(false);
      toast({
        title: "BOM Analysis Complete",
        description: `Analyzed ${mockBomData.length} components with ${mockBomData.filter(item => item.status !== 'active').length} requiring attention`,
      });
    }, 3000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
      case 'eol':
        return <Badge className="bg-red-500"><XCircle className="w-3 h-3 mr-1" />EOL</Badge>;
      case 'nrnd':
        return <Badge className="bg-yellow-500"><AlertTriangle className="w-3 h-3 mr-1" />NRND</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const exportResults = () => {
    // Create CSV content
    const csvContent = [
      ['MPN', 'Manufacturer', 'Description', 'Quantity', 'Unit Price', 'Status', 'Total Cost'].join(','),
      ...bomData.map(item => [
        item.mpn,
        item.manufacturer,
        `"${item.description}"`,
        item.quantity,
        item.unitPrice,
        item.status,
        (item.quantity * item.unitPrice).toFixed(2)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bom_analysis_results.csv';
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "BOM analysis results exported to CSV",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('bom.title')}</h1>
          <p className="text-muted-foreground">
            {t('bom.subtitle')}
          </p>
        </div>

        {/* File Upload Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="mr-2 h-5 w-5" />
              Upload BOM File
            </CardTitle>
            <CardDescription>
              Supported formats: CSV, Excel (.xlsx, .xls), or TXT files
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <div className="space-y-2">
                <p className="text-lg font-medium">Drop your BOM file here or click to browse</p>
                <p className="text-sm text-muted-foreground">CSV, Excel, or TXT formats accepted</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button 
                className="mt-4" 
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
              >
                <FileText className="mr-2 h-4 w-4" />
                Select File
              </Button>
            </div>

            {selectedFile && (
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <Button onClick={analyzeBOM} disabled={isAnalyzing}>
                  {isAnalyzing ? (
                    <>
                      <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Analyze BOM
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {bomData.length > 0 && (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">{bomData.length}</div>
                  <p className="text-sm text-muted-foreground">Total Components</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-green-600">
                    {bomData.filter(item => item.status === 'active').length}
                  </div>
                  <p className="text-sm text-muted-foreground">Active Parts</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-red-600">
                    {bomData.filter(item => item.status === 'eol').length}
                  </div>
                  <p className="text-sm text-muted-foreground">EOL Parts</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-yellow-600">
                    {bomData.filter(item => item.status === 'nrnd').length}
                  </div>
                  <p className="text-sm text-muted-foreground">NRND Parts</p>
                </CardContent>
              </Card>
            </div>

            {/* Results Table */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Analysis Results</CardTitle>
                    <CardDescription>
                      Component analysis with manufacturer info and replacement suggestions
                    </CardDescription>
                  </div>
                  <Button onClick={exportResults} variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export Results
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bomData.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 space-y-4">
                      {/* Main Component Info */}
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <h4 className="font-semibold text-lg">{item.mpn}</h4>
                            {getStatusBadge(item.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">{item.manufacturer}</p>
                          <p className="text-sm">{item.description}</p>
                          <div className="flex space-x-4 text-sm">
                            <span>Qty: <strong>{item.quantity}</strong></span>
                            <span>Unit: <strong>${item.unitPrice}</strong></span>
                            <span>Total: <strong>${(item.quantity * item.unitPrice).toFixed(2)}</strong></span>
                          </div>
                        </div>
                      </div>

                      {/* Alternatives Section */}
                      {item.alternatives && item.alternatives.length > 0 && (
                        <>
                          <Separator />
                          <div>
                            <h5 className="font-medium mb-3 flex items-center">
                              <RefreshCcw className="mr-2 h-4 w-4" />
                              Recommended Alternatives
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {item.alternatives.map((alt, index) => (
                                <div key={index} className="bg-muted/50 rounded-lg p-3 space-y-2">
                                  <div className="flex justify-between items-start">
                                    <h6 className="font-medium text-sm">{alt.mpn}</h6>
                                    <Badge variant="outline" className="text-xs">
                                      {alt.availability}
                                    </Badge>
                                  </div>
                                  <p className="text-xs text-muted-foreground">{alt.manufacturer}</p>
                                  <p className="text-xs">{alt.description}</p>
                                  <div className="flex justify-between text-xs">
                                    <span>Price: <strong>${alt.unitPrice}</strong></span>
                                    <span>{alt.footprint}</span>
                                  </div>
                                  <p className="text-xs text-muted-foreground">{alt.specs}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Help Section */}
        <Card>
          <CardHeader>
            <CardTitle>How to Use BOM Analyzer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">File Format Requirements</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• CSV files with headers: MPN, Manufacturer, Description, Quantity</li>
                  <li>• Excel files (.xlsx, .xls) with data in first sheet</li>
                  <li>• TXT files with tab or comma-separated values</li>
                  <li>• Maximum file size: 10MB</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Analysis Features</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Automatic EOL/NRND status detection</li>
                  <li>• Alternative part suggestions</li>
                  <li>• Price comparison and availability</li>
                  <li>• Exportable results in CSV format</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default BOMAnalyzer;
