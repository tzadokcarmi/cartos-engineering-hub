import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'he';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.mechanics': 'Mechanics',
    'nav.electronics': 'Electronics',
    'nav.rf': 'RF',
    'nav.bomAnalyzer': 'BOM Analyzer',
    
    // Home page
    'home.title': 'Engineering Portal',
    'home.subtitle': 'Comprehensive resources for engineering professionals across all disciplines',
    'home.sectors.title': 'Engineering Sectors',
    'home.sectors.subtitle': 'Explore specialized tools and resources for different engineering fields',
    'home.features.title': 'Key Features',
    'home.features.subtitle': 'Powerful tools to enhance your engineering workflow',
    'home.quickAccess.title': 'Quick Access',
    'home.quickAccess.subtitle': 'Jump straight to your most used tools and resources',
    
    // Company name
    'company.name': 'Cartos General Microwave',
    'company.portal': 'CGM Engineering Portal',
    
    // Sectors
    'sector.mechanics.title': 'Mechanical Engineering',
    'sector.mechanics.description': 'Advanced tools for design, analysis, and manufacturing',
    'sector.electronics.title': 'Electronics Engineering', 
    'sector.electronics.description': 'Circuit design, PCB layout, and component analysis tools',
    'sector.rf.title': 'RF Engineering',
    'sector.rf.description': 'Radio frequency design and analysis tools',
    
    // Features
    'feature.bomAnalyzer.title': 'BOM Analyzer',
    'feature.bomAnalyzer.description': 'Advanced Bill of Materials analysis and optimization',
    'feature.supplierCatalogs.title': 'Supplier Catalogs',
    'feature.supplierCatalogs.description': 'Access to comprehensive component databases',
    'feature.liveFeeds.title': 'Live Article Feeds',
    'feature.liveFeeds.description': 'Stay updated with latest industry news and research',
    'feature.standardsLibrary.title': 'Standards Library',
    'feature.standardsLibrary.description': 'Quick access to engineering standards and specifications',
    
    // Quick Access
    'quickAccess.bomAnalyzer.title': 'BOM Analyzer',
    'quickAccess.bomAnalyzer.description': 'Analyze your bill of materials',
    'quickAccess.calculators.title': 'Engineering Calculators',
    'quickAccess.calculators.description': 'Quick engineering calculations',
    'quickAccess.datasheets.title': 'Component Datasheets',
    'quickAccess.datasheets.description': 'Find component specifications',
    
    // Common
    'button.explore': 'Explore',
    'button.getStarted': 'Get Started',
    'button.learnMore': 'Learn More',
    'button.viewArticle': 'View Article',
    'button.openCatalog': 'Open Catalog',
    'button.accessStandards': 'Access Standards',
    'button.openCalculator': 'Open Calculator',
    'button.searchDatasheets': 'Search Datasheets',
    
    // BOM Analyzer
    'bom.title': 'BOM Analyzer & Part Replacement',
    'bom.subtitle': 'Upload your Bill of Materials for comprehensive analysis and part replacement suggestions',
    'bom.upload.title': 'Upload BOM File',
    'bom.upload.description': 'Supported formats: CSV, Excel (.xlsx, .xls), or TXT files',
    'bom.upload.dropText': 'Drop your BOM file here or click to browse',
    'bom.upload.formats': 'CSV, Excel, or TXT formats accepted',
    'bom.upload.selectFile': 'Select File',
    'bom.analyze': 'Analyze BOM',
    'bom.analyzing': 'Analyzing...',
    'bom.results.title': 'Analysis Results',
    'bom.results.description': 'Component analysis with manufacturer info and replacement suggestions',
    'bom.export': 'Export Results',
    'bom.help.title': 'How to Use BOM Analyzer',
    'bom.stats.total': 'Total Components',
    'bom.stats.active': 'Active Parts',
    'bom.stats.eol': 'EOL Parts',
    'bom.stats.nrnd': 'NRND Parts',
    'bom.alternatives.title': 'Recommended Alternatives',
    
    // Page titles
    'page.mechanics.title': 'Mechanical Engineering',
    'page.mechanics.subtitle': 'Advanced tools for design, analysis, and manufacturing',
    'page.electronics.title': 'Electronics Engineering',
    'page.electronics.subtitle': 'Circuit analysis, component databases, and electronic design resources',
    'page.rf.title': 'RF Engineering',
    'page.rf.subtitle': 'Microwave design, S-parameters, impedance matching, and RF calculations',
    
    // Calculator titles
    'calculator.rf.title': 'RF Calculators',
    'calculator.rf.subtitle': 'Essential RF and microwave engineering calculations',
    'calculator.mechanics.title': 'Engineering Calculators',
    'calculator.mechanics.subtitle': 'Essential mechanical engineering calculations',
    'calculator.electronics.title': 'Electronic Calculators',
    'calculator.electronics.subtitle': 'Essential electronic circuit calculations',
    
    // Calculator sections
    'calculator.impedance.title': 'Impedance Matching Calculator',
    'calculator.vswr.title': 'VSWR & Return Loss Calculator',
    'calculator.frequency.title': 'Frequency ↔ Wavelength Calculator',
    'calculator.snr.title': 'Signal-to-Noise Ratio Calculator',
    'calculator.pathloss.title': 'Free Space Path Loss Calculator',
    'calculator.antenna.title': 'Antenna Length Calculator',
    
    'calculator.fluid.title': 'Advanced Fluid Flow Calculators',
    'calculator.structural.title': 'Structural Stress Calculators',
    'calculator.gear.title': 'Gear & Mechanism Calculators',
    'calculator.thermal.title': 'Thermal Systems Calculators',
    
    'calculator.ohm.title': 'Ohm\'s Law Calculator',
    'calculator.divider.title': 'Voltage Divider Calculator',
    'calculator.power.title': 'Power Dissipation Calculator',
    'calculator.capacitive.title': 'Capacitive Reactance Calculator',
    'calculator.inductive.title': 'Inductive Reactance Calculator',
    'calculator.rc.title': 'RC Time Constant Calculator',
    
    // Features
    'feature.cad.title': 'CAD Downloads',
    'feature.stress.title': 'Stress Calculators',
    'feature.material.title': 'Material Database',
    'feature.thermal.title': 'Thermal Analysis',
    'feature.circuit.title': 'Circuit Design',
    'feature.pcb.title': 'PCB Layout',
    'feature.component.title': 'Component Analysis',
    'feature.sparameters.title': 'S-Parameters',
    'feature.vswr.title': 'VSWR Analysis',
    'feature.impedance.title': 'Impedance Match',
    'feature.frequency.title': 'Freq/Wavelength',
    
    // Recent Articles
    'articles.recent.title': 'Recent Articles',
    'articles.recent.subtitle': 'Latest insights and developments in engineering',
    
    // PLM Access
    'plm.access.title': 'PLM Access',
    'plm.access.description': 'Read-only access to Product Lifecycle Management system',
    'plm.login': 'Login to PLM',
  },
  he: {
    // Navigation
    'nav.home': 'בית',
    'nav.mechanics': 'מכניקה',
    'nav.electronics': 'אלקטרוניקה',
    'nav.rf': 'רדיו תדרים',
    'nav.bomAnalyzer': 'מנתח רכיבים',
    
    // Home page
    'home.title': 'פורטל הנדסי',
    'home.subtitle': 'משאבים מקיפים לאנשי מקצוע הנדסיים בכל התחומים',
    'home.sectors.title': 'תחומי הנדסה',
    'home.sectors.subtitle': 'גלה כלים ומשאבים מתמחים לתחומי הנדסה שונים',
    'home.features.title': 'תכונות מרכזיות',
    'home.features.subtitle': 'כלים עוצמתיים לשיפור זרימת העבודה ההנדסית שלך',
    'home.quickAccess.title': 'גישה מהירה',
    'home.quickAccess.subtitle': 'קפוץ ישירות לכלים והמשאבים הכי בשימוש שלך',
    
    // Company name
    'company.name': 'קרטוס ג\'נרל מיקרוויב',
    'company.portal': 'פורטל הנדסי CGM',
    
    // Sectors
    'sector.mechanics.title': 'הנדסת מכונות',
    'sector.mechanics.description': 'כלים מתקדמים לעיצוב, ניתוח וייצור',
    'sector.electronics.title': 'הנדסת אלקטרוניקה',
    'sector.electronics.description': 'כלי עיצוב מעגלים, פריסת PCB וניתוח רכיבים',
    'sector.rf.title': 'הנדסת רדיו תדרים',
    'sector.rf.description': 'כלי עיצוב וניתוח תדרי רדיו',
    
    // Features
    'feature.bomAnalyzer.title': 'מנתח רכיבים',
    'feature.bomAnalyzer.description': 'ניתוח ואופטימיזציה מתקדמת של רשימת חומרים',
    'feature.supplierCatalogs.title': 'קטלוגי ספקים',
    'feature.supplierCatalogs.description': 'גישה למאגרי רכיבים מקיפים',
    'feature.liveFeeds.title': 'הזנות מאמרים חיות',
    'feature.liveFeeds.description': 'הישאר מעודכן עם החדשות והמחקרים החדשים בתעשייה',
    'feature.standardsLibrary.title': 'ספריית תקנים',
    'feature.standardsLibrary.description': 'גישה מהירה לתקנים ומפרטים הנדסיים',
    
    // Quick Access
    'quickAccess.bomAnalyzer.title': 'מנתח רכיבים',
    'quickAccess.bomAnalyzer.description': 'נתח את רשימת החומרים שלך',
    'quickAccess.calculators.title': 'מחשבונים הנדסיים',
    'quickAccess.calculators.description': 'חישובים הנדסיים מהירים',
    'quickAccess.datasheets.title': 'דפי נתונים של רכיבים',
    'quickAccess.datasheets.description': 'מצא מפרטי רכיבים',
    
    // Common
    'button.explore': 'גלה',
    'button.getStarted': 'התחל',
    'button.learnMore': 'למד עוד',
    'button.viewArticle': 'צפה במאמר',
    'button.openCatalog': 'פתח קטלוג',
    'button.accessStandards': 'גש לתקנים',
    'button.openCalculator': 'פתח מחשבון',
    'button.searchDatasheets': 'חפש דפי נתונים',
    
    // BOM Analyzer
    'bom.title': 'מנתח רכיבים והחלפת חלקים',
    'bom.subtitle': 'העלה את רשימת החומרים שלך לניתוח מקיף והצעות להחלפת חלקים',
    'bom.upload.title': 'העלאת קובץ BOM',
    'bom.upload.description': 'פורמטים נתמכים: CSV, Excel (.xlsx, .xls), או קבצי TXT',
    'bom.upload.dropText': 'גרור את קובץ ה-BOM לכאן או לחץ לגלישה',
    'bom.upload.formats': 'פורמטים CSV, Excel או TXT מתקבלים',
    'bom.upload.selectFile': 'בחר קובץ',
    'bom.analyze': 'נתח BOM',
    'bom.analyzing': 'מנתח...',
    'bom.results.title': 'תוצאות הניתוח',
    'bom.results.description': 'ניתוח רכיבים עם מידע על היצרן והצעות להחלפה',
    'bom.export': 'ייצא תוצאות',
    'bom.help.title': 'איך להשתמש במנתח BOM',
    'bom.stats.total': 'סה"כ רכיבים',
    'bom.stats.active': 'חלקים פעילים',
    'bom.stats.eol': 'חלקי EOL',
    'bom.stats.nrnd': 'חלקי NRND',
    'bom.alternatives.title': 'חלופות מומלצות',
    
    // Page titles
    'page.mechanics.title': 'הנדסת מכונות',
    'page.mechanics.subtitle': 'כלים מתקדמים לעיצוב, ניתוח וייצור',
    'page.electronics.title': 'הנדסת אלקטרוניקה',
    'page.electronics.subtitle': 'ניתוח מעגלים, מאגרי רכיבים ומשאבי עיצוב אלקטרוני',
    'page.rf.title': 'הנדסת רדיו תדרים',
    'page.rf.subtitle': 'עיצוב מיקרוגל, S-parameters, התאמת עכבה וחישובי RF',
    
    // Calculator titles
    'calculator.rf.title': 'מחשבונים רדיו תדרים',
    'calculator.rf.subtitle': 'חישובים הנדסיים מתקדמים של רדיו ומיקרוגל',
    'calculator.mechanics.title': 'מחשבונים הנדסיים',
    'calculator.mechanics.subtitle': 'חישובים הנדסיים מתקדמים של מכניקה',
    'calculator.electronics.title': 'מחשבונים אלקטרוניים',
    'calculator.electronics.subtitle': 'חישובים הנדסיים מתקדמים של אלקטרוניקה',
    
    // Calculator sections
    'calculator.impedance.title': 'מחשבון התאמת עכבה',
    'calculator.vswr.title': 'מחשבון VSWR והפסד החזרה',
    'calculator.frequency.title': 'מחשבון תדר ↔ אורך גל',
    'calculator.snr.title': 'מחשבון יחס סינון לזעיר',
    'calculator.pathloss.title': 'מחשבון הפסד מסלול חופשי במרחב',
    'calculator.antenna.title': 'מחשבון אורך מצלמה',
    
    'calculator.fluid.title': 'מחשבונים זרימת נוזל מתקדמים',
    'calculator.structural.title': 'מחשבונים מתח מבני',
    'calculator.gear.title': 'מחשבונים גליל ומנגנון',
    'calculator.thermal.title': 'מחשבונים מערכות חום',
    
    'calculator.ohm.title': 'חוק אוהם',
    'calculator.divider.title': 'מחשבון חלון מתח',
    'calculator.power.title': 'מחשבון הפסד נצילות',
    'calculator.capacitive.title': 'מחשבון ריחוף קיבולי',
    'calculator.inductive.title': 'מחשבון ריחוף אינדוקטיבי',
    'calculator.rc.title': 'מחשבון קבוע זמן RC',
    
    // Features
    'feature.cad.title': 'הורדות CAD',
    'feature.stress.title': 'מחשבונים מתח',
    'feature.material.title': 'מאגר חומרים',
    'feature.thermal.title': 'ניתוח חום',
    'feature.circuit.title': 'עיצוב מעגל',
    'feature.pcb.title': 'פריסת PCB',
    'feature.component.title': 'ניתוח רכיב',
    'feature.sparameters.title': 'S-Parameters',
    'feature.vswr.title': 'ניתוח VSWR',
    'feature.impedance.title': 'התאמת עכבה',
    'feature.frequency.title': 'תדר/אורך גל',
    
    // Recent Articles
    'articles.recent.title': 'מאמרים אחרונים',
    'articles.recent.subtitle': 'תובנות והתפתחויות אחרונות בהנדסה',
    
    // PLM Access
    'plm.access.title': 'גישה ל-PLM',
    'plm.access.description': 'גישה לקריאה בלבד למערכת ניהול מחזור חיים של מוצר',
    'plm.login': 'התחבר ל-PLM',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', language === 'he' ? 'rtl' : 'ltr');
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const dir = language === 'he' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};