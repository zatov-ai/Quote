export type Language = 'en' | 'fr' | 'es';

export interface Translations {
  // Header
  signIn: string;
  signOut: string;
  profileSettings: string;
  accountSettings: string;
  helpSupport: string;
  
  // Hero Section
  aiPoweredFreight: string;
  futureOfFreight: string;
  futureOfFreightSubtitle: string;
  heroDescription: string;
  getStartedFree: string;
  watchDemo: string;
  noSetupFees: string;
  freeTrial: string;
  cancelAnytime: string;
  
  // Dashboard
  welcomeBack: string;
  dashboardSubtitle: string;
  getQuote: string;
  getQuoteDesc: string;
  aiQuoteExtraction: string;
  aiQuoteExtractionDesc: string;
  trackShipments: string;
  trackShipmentsDesc: string;
  manageSavedQuotes: string;
  manageSavedQuotesDesc: string;
  viewAnalytics: string;
  viewAnalyticsDesc: string;
  
  // Sidebar
  dashboard: string;
  quotes: string;
  shipments: string;
  analytics: string;
  aiQuotes: string;
  settings: string;
  support: string;
  logOut: string;
  
  // Quote Form
  aiPoweredQuoteRequest: string;
  getInstantRates: string;
  origin: string;
  destination: string;
  freightDetails: string;
  freightType: string;
  weight: string;
  pieces: string;
  equipment: string;
  length: string;
  width: string;
  height: string;
  pickupDate: string;
  serviceLevel: string;
  freightDescription: string;
  freightValue: string;
  hazardousMaterials: string;
  getAiOptimizedQuotes: string;
  
  // Common
  country: string;
  streetAddress: string;
  city: string;
  state: string;
  province: string;
  zipCode: string;
  postalCode: string;
  cancel: string;
  save: string;
  edit: string;
  delete: string;
  loading: string;
  error: string;
  success: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Header
    signIn: 'Sign In',
    signOut: 'Sign Out',
    profileSettings: 'Profile Settings',
    accountSettings: 'Account Settings',
    helpSupport: 'Help & Support',
    
    // Hero Section
    aiPoweredFreight: 'AI-Powered Freight Platform',
    futureOfFreight: 'The Future of',
    futureOfFreightSubtitle: 'Freight is Intelligent',
    heroDescription: 'Revolutionary AI technology meets decades of logistics expertise to transform how you ship freight. Get instant quotes, optimize routes, and book with confidence.',
    getStartedFree: 'Get Started Free',
    watchDemo: 'Watch Demo',
    noSetupFees: 'No setup fees',
    freeTrial: 'Free trial',
    cancelAnytime: 'Cancel anytime',
    
    // Dashboard
    welcomeBack: 'Welcome back',
    dashboardSubtitle: 'Get started with your dashboard and let\'s set you up for success',
    getQuote: 'Get a Quote',
    getQuoteDesc: 'Start by getting instant quotes from verified carriers',
    aiQuoteExtraction: 'AI Quote Extraction',
    aiQuoteExtractionDesc: 'Paste freight requests and let AI extract the details',
    trackShipments: 'Track Shipments',
    trackShipmentsDesc: 'Monitor your shipments and delivery status',
    manageSavedQuotes: 'Manage Saved Quotes',
    manageSavedQuotesDesc: 'Review and manage your saved freight quotes',
    viewAnalytics: 'View Analytics',
    viewAnalyticsDesc: 'Analyze your shipping performance and costs',
    
    // Sidebar
    dashboard: 'Dashboard',
    quotes: 'Quotes',
    shipments: 'Shipments',
    analytics: 'Analytics',
    aiQuotes: 'AI Quotes',
    settings: 'Settings',
    support: 'Support',
    logOut: 'Log Out',
    
    // Quote Form
    aiPoweredQuoteRequest: 'AI-Powered Quote Request',
    getInstantRates: 'Get instant rates from top carriers with AI optimization',
    origin: 'Origin',
    destination: 'Destination',
    freightDetails: 'Freight Details',
    freightType: 'Freight Type',
    weight: 'Weight (lbs)',
    pieces: 'Pieces',
    equipment: 'Equipment',
    length: 'Length (ft)',
    width: 'Width (ft)',
    height: 'Height (ft)',
    pickupDate: 'Pickup Date',
    serviceLevel: 'Service Level',
    freightDescription: 'Freight Description',
    freightValue: 'Freight Value (Optional)',
    hazardousMaterials: 'Hazardous Materials',
    getAiOptimizedQuotes: 'Get AI-Optimized Quotes',
    
    // Common
    country: 'Country',
    streetAddress: 'Street Address',
    city: 'City',
    state: 'State',
    province: 'Province',
    zipCode: 'ZIP Code',
    postalCode: 'Postal Code',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    loading: 'Loading',
    error: 'Error',
    success: 'Success'
  },
  
  fr: {
    // Header
    signIn: 'Se connecter',
    signOut: 'Se déconnecter',
    profileSettings: 'Paramètres du profil',
    accountSettings: 'Paramètres du compte',
    helpSupport: 'Aide et support',
    
    // Hero Section
    aiPoweredFreight: 'Plateforme de fret alimentée par IA',
    futureOfFreight: 'L\'avenir du',
    futureOfFreightSubtitle: 'Fret est intelligent',
    heroDescription: 'La technologie IA révolutionnaire rencontre des décennies d\'expertise logistique pour transformer votre façon d\'expédier le fret. Obtenez des devis instantanés, optimisez les itinéraires et réservez en toute confiance.',
    getStartedFree: 'Commencer gratuitement',
    watchDemo: 'Voir la démo',
    noSetupFees: 'Pas de frais d\'installation',
    freeTrial: 'Essai gratuit',
    cancelAnytime: 'Annuler à tout moment',
    
    // Dashboard
    welcomeBack: 'Bon retour',
    dashboardSubtitle: 'Commencez avec votre tableau de bord et préparons votre succès',
    getQuote: 'Obtenir un devis',
    getQuoteDesc: 'Commencez par obtenir des devis instantanés de transporteurs vérifiés',
    aiQuoteExtraction: 'Extraction de devis IA',
    aiQuoteExtractionDesc: 'Collez les demandes de fret et laissez l\'IA extraire les détails',
    trackShipments: 'Suivre les expéditions',
    trackShipmentsDesc: 'Surveillez vos expéditions et le statut de livraison',
    manageSavedQuotes: 'Gérer les devis sauvegardés',
    manageSavedQuotesDesc: 'Examinez et gérez vos devis de fret sauvegardés',
    viewAnalytics: 'Voir les analyses',
    viewAnalyticsDesc: 'Analysez vos performances d\'expédition et vos coûts',
    
    // Sidebar
    dashboard: 'Tableau de bord',
    quotes: 'Devis',
    shipments: 'Expéditions',
    analytics: 'Analyses',
    aiQuotes: 'Devis IA',
    settings: 'Paramètres',
    support: 'Support',
    logOut: 'Se déconnecter',
    
    // Quote Form
    aiPoweredQuoteRequest: 'Demande de devis alimentée par IA',
    getInstantRates: 'Obtenez des tarifs instantanés des meilleurs transporteurs avec optimisation IA',
    origin: 'Origine',
    destination: 'Destination',
    freightDetails: 'Détails du fret',
    freightType: 'Type de fret',
    weight: 'Poids (lbs)',
    pieces: 'Pièces',
    equipment: 'Équipement',
    length: 'Longueur (pi)',
    width: 'Largeur (pi)',
    height: 'Hauteur (pi)',
    pickupDate: 'Date de collecte',
    serviceLevel: 'Niveau de service',
    freightDescription: 'Description du fret',
    freightValue: 'Valeur du fret (Optionnel)',
    hazardousMaterials: 'Matières dangereuses',
    getAiOptimizedQuotes: 'Obtenir des devis optimisés par IA',
    
    // Common
    country: 'Pays',
    streetAddress: 'Adresse',
    city: 'Ville',
    state: 'État',
    province: 'Province',
    zipCode: 'Code postal',
    postalCode: 'Code postal',
    cancel: 'Annuler',
    save: 'Sauvegarder',
    edit: 'Modifier',
    delete: 'Supprimer',
    loading: 'Chargement',
    error: 'Erreur',
    success: 'Succès'
  },
  
  es: {
    // Header
    signIn: 'Iniciar sesión',
    signOut: 'Cerrar sesión',
    profileSettings: 'Configuración del perfil',
    accountSettings: 'Configuración de cuenta',
    helpSupport: 'Ayuda y soporte',
    
    // Hero Section
    aiPoweredFreight: 'Plataforma de carga impulsada por IA',
    futureOfFreight: 'El futuro del',
    futureOfFreightSubtitle: 'Flete es inteligente',
    heroDescription: 'La tecnología IA revolucionaria se encuentra con décadas de experiencia logística para transformar cómo envías carga. Obtén cotizaciones instantáneas, optimiza rutas y reserva con confianza.',
    getStartedFree: 'Comenzar gratis',
    watchDemo: 'Ver demo',
    noSetupFees: 'Sin tarifas de configuración',
    freeTrial: 'Prueba gratuita',
    cancelAnytime: 'Cancelar en cualquier momento',
    
    // Dashboard
    welcomeBack: 'Bienvenido de vuelta',
    dashboardSubtitle: 'Comienza con tu panel de control y preparémonos para el éxito',
    getQuote: 'Obtener cotización',
    getQuoteDesc: 'Comienza obteniendo cotizaciones instantáneas de transportistas verificados',
    aiQuoteExtraction: 'Extracción de cotización IA',
    aiQuoteExtractionDesc: 'Pega solicitudes de carga y deja que la IA extraiga los detalles',
    trackShipments: 'Rastrear envíos',
    trackShipmentsDesc: 'Monitorea tus envíos y estado de entrega',
    manageSavedQuotes: 'Gestionar cotizaciones guardadas',
    manageSavedQuotesDesc: 'Revisa y gestiona tus cotizaciones de carga guardadas',
    viewAnalytics: 'Ver análisis',
    viewAnalyticsDesc: 'Analiza tu rendimiento de envío y costos',
    
    // Sidebar
    dashboard: 'Panel de control',
    quotes: 'Cotizaciones',
    shipments: 'Envíos',
    analytics: 'Análisis',
    aiQuotes: 'Cotizaciones IA',
    settings: 'Configuración',
    support: 'Soporte',
    logOut: 'Cerrar sesión',
    
    // Quote Form
    aiPoweredQuoteRequest: 'Solicitud de cotización impulsada por IA',
    getInstantRates: 'Obtén tarifas instantáneas de los mejores transportistas con optimización IA',
    origin: 'Origen',
    destination: 'Destino',
    freightDetails: 'Detalles del flete',
    freightType: 'Tipo de flete',
    weight: 'Peso (lbs)',
    pieces: 'Piezas',
    equipment: 'Equipo',
    length: 'Longitud (pies)',
    width: 'Ancho (pies)',
    height: 'Altura (pies)',
    pickupDate: 'Fecha de recogida',
    serviceLevel: 'Nivel de servicio',
    freightDescription: 'Descripción del flete',
    freightValue: 'Valor del flete (Opcional)',
    hazardousMaterials: 'Materiales peligrosos',
    getAiOptimizedQuotes: 'Obtener cotizaciones optimizadas por IA',
    
    // Common
    country: 'País',
    streetAddress: 'Dirección',
    city: 'Ciudad',
    state: 'Estado',
    province: 'Provincia',
    zipCode: 'Código postal',
    postalCode: 'Código postal',
    cancel: 'Cancelar',
    save: 'Guardar',
    edit: 'Editar',
    delete: 'Eliminar',
    loading: 'Cargando',
    error: 'Error',
    success: 'Éxito'
  }
};

export function getTranslation(language: Language, key: keyof Translations): string {
  return translations[language][key] || translations.en[key];
}