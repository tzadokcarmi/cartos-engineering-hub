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
    
    // Recent Articles
    'articles.recent.title': 'Recent Articles',
    'articles.recent.subtitle': 'Latest insights and developments in engineering',
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
    
    // Recent Articles
    'articles.recent.title': 'מאמרים אחרונים',
    'articles.recent.subtitle': 'תובנות והתפתחויות אחרונות בהנדסה',
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