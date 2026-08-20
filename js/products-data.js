window.productCategories = [
  {
    id: "cheese",
    icon: "Ch",
    iconImage: "assets/images/icons/cheese-icon.png",
    image: "assets/images/icons/cheese-icon.png",
    name: { en: "Cheese", de: "Käse" },
    description: {
      en: "A selected cheese range for retail, wholesale, and food-service buyers.",
      de: "Ein ausgewähltes Käsesortiment für Einzelhandel, Großhandel und Food-Service."
    },
    alt: { en: "Cheese product selection", de: "Auswahl an Käseprodukten" }
  },
  {
    id: "dairy",
    icon: "Da",
    iconImage: "assets/images/icons/cheese-spread.png",
    image: "assets/images/icons/cheese-spread.png",
    name: { en: "Dairy", de: "Molkereiprodukte" },
    description: {
      en: "Practical dairy products for convenient serving, portioning, and professional kitchens.",
      de: "Praktische Molkereiprodukte für einfache Portionierung, Servieren und professionelle Küchen."
    },
    alt: { en: "Dairy product selection", de: "Auswahl an Molkereiprodukten" }
  },
  {
    id: "meat",
    icon: "Me",
    iconImage: "assets/images/icons/kebab-icon.png",
    image: "assets/images/icons/kebab-icon.png",
    name: { en: "Meat", de: "Fleisch" },
    description: {
      en: "Prepared meat items selected for food-service workflows and reliable supply planning.",
      de: "Vorbereitete Fleischprodukte für Food-Service-Abläufe und verlässliche Lieferplanung."
    },
    alt: { en: "Meat product selection", de: "Auswahl an Fleischprodukten" }
  },
  {
    id: "vegetables",
    icon: "Ve",
    iconImage: "assets/images/icons/cabbage-icon.png",
    image: "assets/images/product-okra.svg",
    name: { en: "Vegetables", de: "Gemüse" },
    description: {
      en: "Vegetable staples and prepared items for wholesalers, distributors, and kitchens.",
      de: "Gemüseklassiker und vorbereitete Produkte für Großhandel, Distributoren und Küchen."
    },
    alt: { en: "Vegetable product selection", de: "Auswahl an Gemüseprodukten" }
  }
];

window.products = [
  // --- CHEESE PRODUCTS ---
  {
    id: "akkawi-cheese",
    category: "cheese",
    image: "assets/images/icons/cheese-icon.png",
    alt: { en: "Akkawi Cheese product image", de: "Produktbild von Akawi Käse" },
    name: { en: "Akkawi Cheese", de: "Akawi Käse" },
    spec: { en: "10 x 800g | Vacuum Pack in Brine", de: "10 x 800g | Vakuumbeutel in Salzlake" },
    short: { en: "Mild, smooth white brine cheese for pastries, grilling, and breakfast tables.", de: "Milder weißer Salzlakenkäse für Gebäck, Grillen und Frühstück." },
    description: {
      en: "Authentic Akkawi cheese crafted with a smooth texture and balanced salinity. Excellent for Middle Eastern pastries, knafeh, baking, and table service.",
      de: "Authentischer Akawi-Käse mit geschmeidiger Textur und ausgewogenem Salzgehalt. Hervorragend geeignet für nahöstliches Gebäck, Knafeh, Backwaren und den Gastronomiebereich."
    },
    packaging: { en: "10 x 800g vacuum packs / 10kg bulk tins", de: "10 x 800g Vakuumbeutel / 10kg Gastrodosen" },
    storage: { en: "Keep refrigerated at +2°C to +6°C", de: "Gekühlt lagern bei +2°C bis +6°C" },
    origin: { en: "Middle East / EU Certified", de: "Naher Osten / EU-zertifiziert" }
  },
  {
    id: "halloumi-cheese",
    category: "cheese",
    image: "assets/images/icons/cheese-icon.png",
    alt: { en: "Grill Cheese Halloumi Style product image", de: "Produktbild von Grillkäse Halloumi Art" },
    name: { en: "Grill Cheese (Halloumi Style)", de: "Grillkäse (Halloumi Art)" },
    spec: { en: "12 x 250g | Retail Vacuum Pack", de: "12 x 250g | Einzelhandels-Vakuumbeutel" },
    short: { en: "Firm semi-hard cheese with high melting point, ideal for frying and grilling.", de: "Fester halbfester Käse mit hohem Schmelzpunkt, ideal zum Braten und Grillen." },
    description: {
      en: "Traditional semi-hard grill cheese made from selected milk. Maintains shape and develops a golden crust when pan-fried, grilled, or baked.",
      de: "Traditioneller schnittfester Grillkäse aus ausgewählter Milch. Behält beim Braten und Grillen seine Form und bildet eine appetitliche Kruste."
    },
    packaging: { en: "12 x 250g vacuum packs / 5kg catering blocks", de: "12 x 250g Vakuumverpackung / 5kg Gastroblock" },
    storage: { en: "Keep refrigerated at +2°C to +6°C", de: "Gekühlt lagern bei +2°C bis +6°C" },
    origin: { en: "Cyprus / Mediterranean", de: "Zypern / Mittelmeerraum" }
  },
  {
    id: "kashkaval-cheese",
    category: "cheese",
    image: "assets/images/icons/cheese-icon.png",
    alt: { en: "Kashkaval Cheese product image", de: "Produktbild von Kaschkawal Käse" },
    name: { en: "Kashkaval Cheese", de: "Kaschkawal Käse" },
    spec: { en: "8 x 1kg | Vacuum Wheel Block", de: "8 x 1kg | Vakuum-Radblock" },
    short: { en: "Aromatic yellow cheese with smooth melt, versatile for baking and slicing.", de: "Aromatischer Schnittkäse mit zartem Schmelz für Backen und Brotbelag." },
    description: {
      en: "Traditional yellow Kashkaval cheese aged for full flavor. Perfect for sandwiches, manakish toppings, melting, and charcuterie platters.",
      de: "Traditioneller gelber Kaschkawal-Käse, gereift für volles Aroma. Perfekt für Sandwiches, Manakish-Beläge, Gratinieren und Wurst-/Käseplatten."
    },
    packaging: { en: "8 x 1kg blocks / 2.5kg wheels", de: "8 x 1kg Blöcke / 2,5kg Räder" },
    storage: { en: "Keep refrigerated at +2°C to +6°C", de: "Gekühlt lagern bei +2°C bis +6°C" },
    origin: { en: "Eastern Europe / Middle East", de: "Osteuropa / Naher Osten" }
  },

  // --- DAIRY PRODUCTS ---
  {
    id: "labneh",
    category: "dairy",
    image: "assets/images/icons/cheese-spread.png",
    alt: { en: "Traditional Labneh product image", de: "Produktbild von Traditionellem Labneh" },
    name: { en: "Traditional Labneh", de: "Traditioneller Labneh" },
    spec: { en: "6 x 500g | Sealed Fresh Tub", de: "6 x 500g | Versiegelter Frischebecher" },
    short: { en: "Creamy strained yogurt spread with pleasant tang for breakfast and mezze.", de: "Cremiger Frischkäse-Joghurt mit feiner Säure für Frühstück und Mezze." },
    description: {
      en: "Thick, strained yogurt prepared according to classic Levant traditions. Rich in texture and protein, perfect with olive oil, za'atar, and warm pita.",
      de: "Dickflüssiger, abgetropfter Joghurt nach klassischer levantinischer Tradition. Reichhaltige Textur, ideal verfeinert mit Olivenöl, Za'atar und Fladenbrot."
    },
    packaging: { en: "6 x 500g tubs / 5kg catering buckets", de: "6 x 500g Becher / 5kg Gastro-Eimer" },
    storage: { en: "Keep refrigerated at +2°C to +6°C", de: "Gekühlt lagern bei +2°C bis +6°C" },
    origin: { en: "Middle East", de: "Naher Osten" }
  },
  {
    id: "cheese-spread",
    category: "dairy",
    image: "assets/images/icons/cheese-spread.png",
    alt: { en: "Cream Cheese Spread product image", de: "Produktbild von Schmelzkäsezubereitung" },
    name: { en: "Cream Cheese Spread", de: "Schmelzkäse-Zubereitung" },
    spec: { en: "24 x 240g | Glass Jar Tray", de: "24 x 240g | Gläser-Tray" },
    short: { en: "Smooth and creamy processed cheese spread in convenient glass jars.", de: "Cremig-streichzarter Schmelzkäse im praktischen Schraubglas." },
    description: {
      en: "A pantry staple offering rich taste and smooth spreadability for bakery items, quick breakfasts, and culinary dips.",
      de: "Klassischer Brotaufstrich mit vollmundigem Geschmack und hoher Streichfähigkeit für Backwaren, Frühstück und Dips."
    },
    packaging: { en: "24 x 240g / 12 x 500g glass jars", de: "24 x 240g / 12 x 500g Schraubgläser" },
    storage: { en: "Store in cool dry place; refrigerate after opening", de: "Kühl und trocken lagern; nach dem Öffnen kühlen" },
    origin: { en: "Middle East", de: "Naher Osten" }
  },
  {
    id: "qashta-cream",
    category: "dairy",
    image: "assets/images/icons/cheese-spread.png",
    alt: { en: "Qashta Clotted Cream product image", de: "Produktbild von Qashta Rahm" },
    name: { en: "Qashta (Clotted Cream)", de: "Qashta (Arabischer Rahm)" },
    spec: { en: "12 x 170g | Easy-Open Tin", de: "12 x 170g | Dose mit Aufreißlasche" },
    short: { en: "Rich, velvety clotted cream for traditional desserts and sweets.", de: "Samtiger, reichhaltiger Rahm für orientalische Desserts und Süßspeisen." },
    description: {
      en: "Luxurious thickened cream ideal for filling baklava, atayef, kunafa, fruit salads, or spreading with honey.",
      de: "Feinster eingedickter Rahm, optimal für die Füllung von Baklava, Qatayef, Knafeh, Obstsalaten oder mit Honig."
    },
    packaging: { en: "12 x 170g easy-open tins per tray", de: "12 x 170g Dosen pro Tray" },
    storage: { en: "Ambient dry storage; refrigerate after opening", de: "Trocken lagern; nach dem Öffnen gekühlt aufbewahren" },
    origin: { en: "Middle East", de: "Naher Osten" }
  },

  // --- MEAT PRODUCTS ---
  {
    id: "beef-shawarma",
    category: "meat",
    image: "assets/images/icons/kebab-icon.png",
    alt: { en: "Marinated Beef Shawarma product image", de: "Produktbild von Mariniertem Rindfleisch-Schawarma" },
    name: { en: "Beef Shawarma (Halal)", de: "Rindfleisch-Schawarma (Halal)" },
    spec: { en: "4 x 2.5kg | Frozen Gastro Pack", de: "4 x 2,5kg | Gastro-Tiefkühlpack" },
    short: { en: "Pre-marinated premium beef slices seasoned with authentic Oriental spices.", de: "Vormariniertes Rindfleisch, gewürzt mit orientalischen Gewürzen." },
    description: {
      en: "Carefully sliced Halal beef marinated in classic spices, ready for spit roasting or rapid high-heat pan frying in commercial kitchens.",
      de: "Sorgfältig geschnittenes Halal-Rindfleisch in klassischer Gewürzmarinade, servierfertig für Drehspieße oder schnelles Braten in Profiküchen."
    },
    packaging: { en: "4 x 2.5kg vacuum bags / 10kg-20kg frozen cones", de: "4 x 2,5kg Vakuumbeutel / 10kg-20kg Tiefkühlspieße" },
    storage: { en: "Keep frozen at -18°C", de: "Tiefgekühlt lagern bei -18°C" },
    origin: { en: "Halal Certified EU Production", de: "Halal-zertifizierte EU-Produktion" }
  },
  {
    id: "lamb-kebab",
    category: "meat",
    image: "assets/images/icons/kebab-icon.png",
    alt: { en: "Prepared Lamb & Beef Kebab product image", de: "Produktbild von Lamm & Rind Kebab" },
    name: { en: "Lamb & Beef Kebab Skewers", de: "Lamm- & Rinderhack-Kebab" },
    spec: { en: "10 x 800g | IQF Tray Pack", de: "10 x 800g | IQF Schalenpackung" },
    short: { en: "Seasoned ground lamb and beef skewers prepared for rapid grilling.", de: "Gewürzte Lamm- und Rinderhackspieße, fertig für Grill und Pfanne." },
    description: {
      en: "Formed Halal minced meat skewers blended with parsley, onion, and oriental spices. Quick to cook from frozen for catering and restaurant workflows.",
      de: "Geformte Halal-Hackfleischspieße mit Petersilie, Zwiebeln und orientalischen Gewürzen. Schnell aus dem Tiefkühlzustand zubereitbar."
    },
    packaging: { en: "10 x 800g trays / 8kg bulk boxes", de: "10 x 800g Schalen / 8kg Großkarton" },
    storage: { en: "Keep frozen at -18°C", de: "Tiefgekühlt lagern bei -18°C" },
    origin: { en: "Halal Certified Production", de: "Halal-zertifizierte Produktion" }
  },
  {
    id: "halal-beef-sausage",
    category: "meat",
    image: "assets/images/icons/kebab-icon.png",
    alt: { en: "Sujuk Halal Beef Sausage product image", de: "Produktbild von Sucuk Halal Rinderwurst" },
    name: { en: "Sujuk / Halal Beef Sausage", de: "Sucuk / Halal Rinderwurst" },
    spec: { en: "15 x 400g | Vacuum Twin Pack", de: "15 x 400g | Doppel-Vakuumpack" },
    short: { en: "Dry-fermented spiced Halal beef sausage with rich garlic and cumin notes.", de: "Würzige luftgetrocknete Rinder-Rohwurst mit Knoblauch- und Kreuzkümmelnote." },
    description: {
      en: "Traditional spiced beef sausage prepared under strict Halal standards. Slices easily and crisps perfectly when pan-fried with eggs or baked in flatbreads.",
      de: "Traditionell gewürzte Halal-Rindfleischwurst. Lässt sich leicht schneiden und schmeckt hervorragend gebraten mit Eiern oder gebacken im Fladenbrot."
    },
    packaging: { en: "15 x 400g vacuum packs per carton", de: "15 x 400g Vakuumbeutel pro Karton" },
    storage: { en: "Keep refrigerated at +2°C to +7°C", de: "Gekühlt lagern bei +2°C bis +7°C" },
    origin: { en: "Halal Certified Production", de: "Halal-zertifizierte Produktion" }
  },

  // --- VEGETABLE PRODUCTS ---
  {
    id: "ardh-shawki",
    category: "vegetables",
    image: "assets/images/products/ardh-shawki.png",
    alt: { en: "Ardh Shawki artichoke product image", de: "Produktbild von Ardh Shawki Artischocken" },
    name: { en: "Ardh Shawki (Artichoke Bottoms)", de: "Ardh Shawki (Artischockenböden)" },
    spec: { en: "10 x 400g | IQF Master Box", de: "10 x 400g | IQF Karton" },
    short: { en: "Cleaned and trimmed artichoke bottoms, individually quick-frozen at source.", de: "Gereinigte und zugeschnittene Artischockenböden, einzeln schockgefrostet." },
    description: {
      en: "Premium selected artichoke bottoms picked at peak tenderness. Ideal for stuffing with meat and rice, stewing, or fine catering preparations.",
      de: "Erstklassige Artischockenböden, erntefrisch verarbeitet und schockgefrostet. Perfekt zum Füllen, Schmoren und für gehobene Gastronomiemenüs."
    },
    packaging: { en: "10 x 400g retail bags / 10kg catering boxes", de: "10 x 400g Beutel / 10kg Gastrokartons" },
    storage: { en: "Keep frozen at -18°C", de: "Tiefgekühlt lagern bei -18°C" },
    origin: { en: "Egypt / Selected Farms", de: "Ägypten / Ausgewählte Betriebe" }
  },
  {
    id: "coriander",
    category: "vegetables",
    image: "assets/images/products/coriander.png",
    alt: { en: "Frozen Coriander product image", de: "Produktbild von Tiefkühl-Koriander" },
    name: { en: "Chopped Coriander", de: "Gehackter Koriander" },
    spec: { en: "20 x 400g | IQF Herb Bag", de: "20 x 400g | IQF Kräuterbeutel" },
    short: { en: "Aromatic chopped green coriander for seasonings, garnishes, and soups.", de: "Aromatischer gehackter Koriander zum Würzen, Garnieren und für Suppen." },
    description: {
      en: "Fresh green coriander washed, finely chopped, and individually frozen to preserve aroma and vibrant color. Essential for curries, molokhia, and marinades.",
      de: "Frischer grüner Koriander, gewaschen, fein gehackt und schockgefrostet zur Bewahrung des vollen Aromas und der grünen Farbe."
    },
    packaging: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton" },
    storage: { en: "Keep frozen at -18°C", de: "Tiefgekühlt lagern bei -18°C" },
    origin: { en: "Egypt / Middle East", de: "Ägypten / Naher Osten" }
  },
  {
    id: "eggplant",
    category: "vegetables",
    image: "assets/images/products/eggplant.png",
    alt: { en: "Roasted Eggplant product image", de: "Produktbild von Gegrillter Aubergine" },
    name: { en: "Roasted Eggplant Pulp", de: "Gegrilltes Auberginenfruchtfleisch" },
    spec: { en: "12 x 400g | Flame-Roasted Pack", de: "12 x 400g | Rauchig Gegrillt" },
    short: { en: "Flame-roasted eggplant pulp with natural smoky flavor for Baba Ghanoush.", de: "Über offener Flamme gegrillte Aubergine für authentisches Baba Ghanoush." },
    description: {
      en: "Fire-roasted whole eggplants peeled and packed ready to use. Gives authentic smoky depth to dips, mezze spreads, and vegetable sauces.",
      de: "Über Feuer geröstete ganze Auberginen, geschält und verzehrfertig vorbereitet. Verleiht Dips und Mezze ein unverwechselbares Raucharoma."
    },
    packaging: { en: "12 x 400g packs / 5kg catering tubs", de: "12 x 400g Packungen / 5kg Gastrobehälter" },
    storage: { en: "Keep frozen at -18°C", de: "Tiefgekühlt lagern bei -18°C" },
    origin: { en: "Egypt / Levant", de: "Ägypten / Levante" }
  },
  {
    id: "falafel",
    category: "vegetables",
    image: "assets/images/products/falafel.png",
    alt: { en: "Prepared Falafel product image", de: "Produktbild von Zubereiteter Falafel" },
    name: { en: "Pre-formed Falafel Patties", de: "Vorgeformte Falafel-Bällchen" },
    spec: { en: "10 x 500g | Pre-fried IQF", de: "10 x 500g | Vorgebacken IQF" },
    short: { en: "Crispy chickpea and herb falafel, pre-fried and quick-frozen for fast serving.", de: "Knusprige Kichererbsen-Falafel, vorgebacken und schockgefrostet." },
    description: {
      en: "Traditional recipe combining ground chickpeas, fresh parsley, coriander, and spices. Ready in minutes in fryer or oven for wraps and salad bowls.",
      de: "Traditionelle Rezeptur aus Kichererbsen, frischen Kräutern und Gewürzen. In wenigen Minuten in Fritteuse oder Ofen servierfertig zubereitet."
    },
    packaging: { en: "10 x 500g retail packs / 10kg bulk boxes", de: "10 x 500g Packungen / 10kg Großkartons" },
    storage: { en: "Keep frozen at -18°C", de: "Tiefgekühlt lagern bei -18°C" },
    origin: { en: "Middle East", de: "Naher Osten" }
  },
  {
    id: "foul",
    category: "vegetables",
    image: "assets/images/products/foul.png",
    alt: { en: "Foul Fava Beans product image", de: "Produktbild von Foul Ackerbohnen" },
    name: { en: "Foul Mudammas (Fava Beans)", de: "Foul Mudammas (Ackerbohnen)" },
    spec: { en: "24 x 400g | Premium Can Tray", de: "24 x 400g | Dosen-Tray" },
    short: { en: "Tender cooked fava beans prepared for traditional breakfast dishes.", de: "Zart gekochte Saubohnen für das traditionelle nahöstliche Frühstück." },
    description: {
      en: "Selected premium fava beans cooked to creamy perfection. A cornerstone of Middle Eastern hospitality, served with cumin, lemon juice, and olive oil.",
      de: "Ausgewählte Ackerbohnen, cremig und zart vorgekocht. Grundbaustein für klassische Frühstücksgerichte mit Kreuzkümmel, Zitrone und Olivenöl."
    },
    packaging: { en: "24 x 400g easy-open cans / 3kg catering tins", de: "24 x 400g Dosen / 3kg Gastrodosen" },
    storage: { en: "Ambient dry storage / refrigerate after opening", de: "Trocken lagern / nach dem Öffnen kühlen" },
    origin: { en: "Egypt / Middle East", de: "Ägypten / Naher Osten" }
  },
  {
    id: "green-bean",
    category: "vegetables",
    image: "assets/images/products/green-bean.png",
    alt: { en: "Cut Green Beans product image", de: "Produktbild von Schnittbohnen" },
    name: { en: "Cut Green Beans (IQF)", de: "Schnittbohnen (IQF)" },
    spec: { en: "10 x 400g | IQF Green Pack", de: "10 x 400g | IQF Beutel" },
    short: { en: "Tender young green beans trimmed, uniformly cut, and quickly frozen.", de: "Zarte grüne Bohnen, gleichmäßig geschnitten und schockgefrostet." },
    description: {
      en: "Sweet, stringless green beans harvested young to maintain crispness and bright green coloration. Excellent for stews, side dishes, and steam cooking.",
      de: "Schnittfeste grüne Bohnen ohne Fäden, jung geerntet für knackigen Biss und leuchtende Farbe. Ideal für Eintöpfe und Gemüsebeilagen."
    },
    packaging: { en: "10 x 400g bags / 10kg master box", de: "10 x 400g Beutel / 10kg Sammelkarton" },
    storage: { en: "Keep frozen at -18°C", de: "Tiefgekühlt lagern bei -18°C" },
    origin: { en: "Egypt / Selected Farms", de: "Ägypten / Ausgewählte Betriebe" }
  },
  {
    id: "mango",
    category: "vegetables",
    image: "assets/images/products/mango.png",
    alt: { en: "Frozen Mango Pulp & Chunks product image", de: "Produktbild von Mango-Fruchtfleisch & Würfel" },
    name: { en: "Egyptian Mango Chunks / Pulp", de: "Ägyptische Mango (Würfel / Fruchtfleisch)" },
    spec: { en: "10 x 1kg | Sweet IQF Pack", de: "10 x 1kg | IQF Fruchtbeutel" },
    short: { en: "Naturally sweet Egyptian mango chunks with rich aroma and golden color.", de: "Sonnengereifte Mangostücke mit unvergleichlicher Süße und Aroma." },
    description: {
      en: "Famous Egyptian mango varieties processed at peak ripeness. 100% natural fruit without additives, ideal for smoothies, juices, desserts, and bakery.",
      de: "Berühmte ägyptische Mangosorten, bei voller Reife geerntet und verarbeitet. Ideal für Säfte, Smoothies, Desserts und Eiscremezubereitung."
    },
    packaging: { en: "10 x 1kg bags / 18kg bulk drums", de: "10 x 1kg Beutel / 18kg Großgebinde" },
    storage: { en: "Keep frozen at -18°C", de: "Tiefgekühlt lagern bei -18°C" },
    origin: { en: "Ismailia, Egypt", de: "Ismailia, Ägypten" }
  },
  {
    id: "mlokhya-leafs",
    category: "vegetables",
    image: "assets/images/products/mlokhya-leaf.png",
    alt: { en: "Whole Molokhia Leaves product image", de: "Produktbild von Ganzen Molokhia-Blättern" },
    name: { en: "Molokhia Whole Leaves", de: "Molokhia Ganze Blätter" },
    spec: { en: "10 x 400g | Whole Leaf IQF", de: "10 x 400g | Blattware IQF" },
    short: { en: "Carefully hand-picked whole Molokhia leaves frozen fresh.", de: "Sorgfältig handgepflückte ganze Molokhia-Blätter, schockgefrostet." },
    description: {
      en: "Cleaned and destemmed jute mallow leaves preserved whole. Preferred by chefs for authentic Levantine stews requiring intact leafy texture.",
      de: "Gewaschene und entstielte ganze Molokhia-Blätter. Von Köchen geschätzt für traditionelle Schmorgerichte mit Blattstruktur."
    },
    packaging: { en: "10 x 400g bags / 10kg catering carton", de: "10 x 400g Beutel / 10kg Gastrokarton" },
    storage: { en: "Keep frozen at -18°C", de: "Tiefgekühlt lagern bei -18°C" },
    origin: { en: "Egypt / Nile Delta", de: "Ägypten / Nildelta" }
  },
  {
    id: "mlokhya",
    category: "vegetables",
    image: "assets/images/products/mlokhya.png",
    alt: { en: "Minced Molokhia product image", de: "Produktbild von Fein Gehackter Molokhia" },
    name: { en: "Molokhia Minced (Classic)", de: "Molokhia Fein Gehackt (Klassik)" },
    spec: { en: "20 x 400g | Traditional Block", de: "20 x 400g | Klassischer Block" },
    short: { en: "Finely minced Molokhia greens, the classic staple for Egyptian national soup.", de: "Fein gehackte Molokhia-Blätter, der Klassiker für die Nationalküche." },
    description: {
      en: "Finely chopped jute mallow leaves ready for garlic-coriander tasha tempering. Delivers authentic silky consistency and deep green vibrancy.",
      de: "Feinst gehackte Molokhia-Blätter für die klassische Zubereitung mit Knoblauch-Koriander-Tasha. Sichert seidenweiche Konsistenz und satte Farbe."
    },
    packaging: { en: "20 x 400g blocks per carton", de: "20 x 400g Blöcke pro Karton" },
    storage: { en: "Keep frozen at -18°C", de: "Tiefgekühlt lagern bei -18°C" },
    origin: { en: "Egypt / Nile Delta", de: "Ägypten / Nildelta" }
  },
  {
    id: "peas-carrots",
    category: "vegetables",
    image: "assets/images/products/peas-carrot-bag.png",
    alt: { en: "Peas and Carrots product image", de: "Produktbild von Erbsen und Karotten" },
    name: { en: "Green Peas & Diced Carrots", de: "Erbsen & Karottenwürfel" },
    spec: { en: "10 x 400g | Balanced Mix IQF", de: "10 x 400g | Ausgewogene Mischung" },
    short: { en: "Sweet green peas blended with uniformly diced tender carrots.", de: "Süße grüne Erbsen gemischt mit zarten Karottenwürfeln." },
    description: {
      en: "A balanced 50/50 mix of sweet green peas and orange carrot cubes. Retains texture and sweetness for rice dishes, side vegetables, and stews.",
      de: "Ausgewogene Mischung aus feinen Erbsen und Karottenwürfeln. Behält Biss und Frische bei, ideal für Reisgerichte und Eintöpfe."
    },
    packaging: { en: "10 x 400g bags / 10kg master carton", de: "10 x 400g Beutel / 10kg Großkarton" },
    storage: { en: "Keep frozen at -18°C", de: "Tiefgekühlt lagern bei -18°C" },
    origin: { en: "Egypt / Selected Farms", de: "Ägypten / Ausgewählte Betriebe" }
  },
  {
    id: "peas",
    category: "vegetables",
    image: "assets/images/products/peas.png",
    alt: { en: "Extra Fine Green Peas product image", de: "Produktbild von Extra Feinen Erbsen" },
    name: { en: "Extra Fine Green Peas", de: "Extra Feine Grüne Erbsen" },
    spec: { en: "10 x 400g | Extra Fine IQF", de: "10 x 400g | Extra Feine Auslese" },
    short: { en: "Tender, naturally sweet green peas sorted for size and softness.", de: "Zarte, süße grüne Erbsen, schonend sortiert und schockgefrostet." },
    description: {
      en: "Selected extra-fine green peas flash frozen within hours of harvesting to seal in delicate sweetness and vital nutrients.",
      de: "Sorgfältig verlesene feine Erbsen, wenige Stunden nach der Ernte schockgefrostet für maximalen Geschmack und Vitamingehalt."
    },
    packaging: { en: "10 x 400g bags / 10kg master carton", de: "10 x 400g Beutel / 10kg Großkarton" },
    storage: { en: "Keep frozen at -18°C", de: "Tiefgekühlt lagern bei -18°C" },
    origin: { en: "Egypt / Selected Farms", de: "Ägypten / Ausgewählte Betriebe" }
  },
  {
    id: "peeled-foul",
    category: "vegetables",
    image: "assets/images/products/peeled-foul.png",
    alt: { en: "Peeled Fava Beans product image", de: "Produktbild von Geschälten Ackerbohnen" },
    name: { en: "Peeled Fava Beans (Foul Madchouch)", de: "Geschälte Ackerbohnen (Foul Madchouch)" },
    spec: { en: "10 x 400g | Split Peeled IQF", de: "10 x 400g | Geschält & Halbiert IQF" },
    short: { en: "De-skinned fava beans, essential base for traditional falafel and dips.", de: "Geschälte Saubohnen, unverzichtbare Basis für hausgemachte Falafel." },
    description: {
      en: "High-grade fava beans with outer skin removed, quick-frozen. The essential ingredient for crafting authentic Egyptian Ta'ameya / Falafel and creamy bean purees.",
      de: "Hochwertige Saubohnen ohne Schale, schockgefrostet. Die unverzichtbare Hauptzutat für traditionelle ägyptische Ta'ameya (Falafel) und cremige Pürees."
    },
    packaging: { en: "10 x 400g bags / 10kg master carton", de: "10 x 400g Beutel / 10kg Großkarton" },
    storage: { en: "Keep frozen at -18°C", de: "Tiefgekühlt lagern bei -18°C" },
    origin: { en: "Egypt / Middle East", de: "Ägypten / Naher Osten" }
  }
];
