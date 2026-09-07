window.productCategories = [
  {
    id: "cheese",
    icon: "Ch",
    iconImage: "assets/images/icons/cheese-icon.png",
    image: "assets/images/icons/cheese-icon.png",
    name: { en: "Cheese", de: "Käse", ar: "الجبن" },
    description: {
      en: "A selected cheese range for retail, wholesale, and food-service buyers.",
      de: "Ein ausgewähltes Käsesortiment für Einzelhandel, Großhandel und Food-Service.",
      ar: "تشكيلة مختارة من الجبن للبيع بالتجزئة والجملة ولقطاع خدمات الطعام."
    },
    alt: { en: "Cheese product selection", de: "Auswahl an Käseprodukten", ar: "تشكيلة منتجات الجبن" }
  },
  {
    id: "dairy",
    icon: "Da",
    iconImage: "assets/images/icons/cheese-spread.png",
    image: "assets/images/icons/cheese-spread.png",
    name: { en: "Dairy", de: "Molkereiprodukte", ar: "الألبان" },
    description: {
      en: "Practical dairy products for convenient serving, portioning, and professional kitchens.",
      de: "Praktische Molkereiprodukte für einfache Portionierung, Servieren und professionelle Küchen.",
      ar: "منتجات ألبان عملية سهلة التقديم والتقسيم للمطابخ الاحترافية."
    },
    alt: { en: "Dairy product selection", de: "Auswahl an Molkereiprodukten", ar: "تشكيلة منتجات الألبان" }
  },
  {
    id: "meat",
    icon: "Me",
    iconImage: "assets/images/icons/kebab-icon.png",
    image: "assets/images/icons/kebab-icon.png",
    name: { en: "Meat", de: "Fleisch", ar: "اللحوم" },
    description: {
      en: "Prepared meat items selected for food-service workflows and reliable supply planning.",
      de: "Vorbereitete Fleischprodukte für Food-Service-Abläufe und verlässliche Lieferplanung.",
      ar: "منتجات لحوم محضّرة مختارة لسير عمل خدمات الطعام وتخطيط توريد موثوق."
    },
    alt: { en: "Meat product selection", de: "Auswahl an Fleischprodukten", ar: "تشكيلة منتجات اللحوم" }
  },
  {
    id: "vegetables",
    icon: "Ve",
    iconImage: "assets/images/icons/cabbage-icon.png",
    image: "assets/images/product-okra.svg",
    name: { en: "Vegetables", de: "Gemüse", ar: "الخضروات" },
    description: {
      en: "Vegetable staples and prepared items for wholesalers, distributors, and kitchens.",
      de: "Gemüseklassiker und vorbereitete Produkte für Großhandel, Distributoren und Küchen.",
      ar: "أساسيات الخضروات والمنتجات المحضّرة للموزعين وتجار الجملة والمطابخ."
    },
    alt: { en: "Vegetable product selection", de: "Auswahl an Gemüseprodukten", ar: "تشكيلة منتجات الخضروات" }
  }
];

window.products = [
  // --- CHEESE PRODUCTS ---
  {
    id: "akkawi-cheese",
    category: "cheese",
    image: "assets/images/icons/cheese-icon.png",
    alt: { en: "Akkawi Cheese product image", de: "Produktbild von Akawi Käse", ar: "صورة منتج جبنة عكاوي" },
    name: { en: "Akkawi Cheese", de: "Akawi Käse", ar: "جبنة عكاوي" },
    spec: { en: "10 x 800g | Vacuum Pack in Brine", de: "10 x 800g | Vakuumbeutel in Salzlake", ar: "10 × 800 جم | عبوة مفرغة من الهواء في محلول ملحي" },
    short: { en: "Mild, smooth white brine cheese for pastries, grilling, and breakfast tables.", de: "Milder weißer Salzlakenkäse für Gebäck, Grillen und Frühstück.", ar: "جبنة بيضاء ناعمة ومعتدلة الملوحة في محلول ملحي، مثالية للمعجنات والشوي ووجبات الإفطار." },
    description: {
      en: "Authentic Akkawi cheese crafted with a smooth texture and balanced salinity. Excellent for Middle Eastern pastries, knafeh, baking, and table service.",
      de: "Authentischer Akawi-Käse mit geschmeidiger Textur und ausgewogenem Salzgehalt. Hervorragend geeignet für nahöstliches Gebäck, Knafeh, Backwaren und den Gastronomiebereich.",
      ar: "جبنة عكاوي أصيلة بقوام ناعم ونسبة ملوحة متوازنة. ممتازة للمعجنات الشرقية والكنافة والخبز وتقديم الموائد."
    },
    packaging: { en: "10 x 800g vacuum packs / 10kg bulk tins", de: "10 x 800g Vakuumbeutel / 10kg Gastrodosen", ar: "10 × 800 جم عبوات مفرغة / 10 كجم علب سائبة" },
    storage: { en: "Keep refrigerated at +2°C to +6°C", de: "Gekühlt lagern bei +2°C bis +6°C", ar: "تُحفظ مبردة بين +2°م و +6°م" },
    origin: { en: "Middle East / EU Certified", de: "Naher Osten / EU-zertifiziert", ar: "الشرق الأوسط / معتمد أوروبياً" }
  },
  {
    id: "halloumi-cheese",
    category: "cheese",
    image: "assets/images/icons/cheese-icon.png",
    alt: { en: "Grill Cheese Halloumi Style product image", de: "Produktbild von Grillkäse Halloumi Art", ar: "صورة منتج جبنة شوي على طراز الحلوم" },
    name: { en: "Grill Cheese (Halloumi Style)", de: "Grillkäse (Halloumi Art)", ar: "جبنة شوي (على طراز الحلوم)" },
    spec: { en: "12 x 250g | Retail Vacuum Pack", de: "12 x 250g | Einzelhandels-Vakuumbeutel", ar: "12 × 250 جم | عبوة تجزئة مفرغة من الهواء" },
    short: { en: "Firm semi-hard cheese with high melting point, ideal for frying and grilling.", de: "Fester halbfester Käse mit hohem Schmelzpunkt, ideal zum Braten und Grillen.", ar: "جبنة شبه صلبة متماسكة بدرجة انصهار عالية، مثالية للقلي والشوي." },
    description: {
      en: "Traditional semi-hard grill cheese made from selected milk. Maintains shape and develops a golden crust when pan-fried, grilled, or baked.",
      de: "Traditioneller schnittfester Grillkäse aus ausgewählter Milch. Behält beim Braten und Grillen seine Form und bildet eine appetitliche Kruste.",
      ar: "جبنة شوي تقليدية شبه صلبة مصنوعة من حليب مختار. تحافظ على شكلها وتكوّن قشرة ذهبية عند القلي أو الشوي أو الخَبز."
    },
    packaging: { en: "12 x 250g vacuum packs / 5kg catering blocks", de: "12 x 250g Vakuumverpackung / 5kg Gastroblock", ar: "12 × 250 جم عبوات مفرغة / كتل كيتررينج 5 كجم" },
    storage: { en: "Keep refrigerated at +2°C to +6°C", de: "Gekühlt lagern bei +2°C bis +6°C", ar: "تُحفظ مبردة بين +2°م و +6°م" },
    origin: { en: "Cyprus / Mediterranean", de: "Zypern / Mittelmeerraum", ar: "قبرص / منطقة البحر الأبيض المتوسط" }
  },
  {
    id: "kashkaval-cheese",
    category: "cheese",
    image: "assets/images/icons/cheese-icon.png",
    alt: { en: "Kashkaval Cheese product image", de: "Produktbild von Kaschkawal Käse", ar: "صورة منتج جبنة كشكفال" },
    name: { en: "Kashkaval Cheese", de: "Kaschkawal Käse", ar: "جبنة كشكفال" },
    spec: { en: "8 x 1kg | Vacuum Wheel Block", de: "8 x 1kg | Vakuum-Radblock", ar: "8 × 1 كجم | كتلة عجلة مفرغة من الهواء" },
    short: { en: "Aromatic yellow cheese with smooth melt, versatile for baking and slicing.", de: "Aromatischer Schnittkäse mit zartem Schmelz für Backen und Brotbelag.", ar: "جبنة صفراء عطرية سهلة الذوبان، متعددة الاستخدامات للخبز والتقطيع." },
    description: {
      en: "Traditional yellow Kashkaval cheese aged for full flavor. Perfect for sandwiches, manakish toppings, melting, and charcuterie platters.",
      de: "Traditioneller gelber Kaschkawal-Käse, gereift für volles Aroma. Perfekt für Sandwiches, Manakish-Beläge, Gratinieren und Wurst-/Käseplatten.",
      ar: "جبنة كشكفال صفراء تقليدية معتقة لنكهة كاملة. مثالية للسندويشات وإضافات المناقيش والذوبان وأطباق المقبلات الباردة."
    },
    packaging: { en: "8 x 1kg blocks / 2.5kg wheels", de: "8 x 1kg Blöcke / 2,5kg Räder", ar: "8 × 1 كجم كتل / عجلات 2.5 كجم" },
    storage: { en: "Keep refrigerated at +2°C to +6°C", de: "Gekühlt lagern bei +2°C bis +6°C", ar: "تُحفظ مبردة بين +2°م و +6°م" },
    origin: { en: "Eastern Europe / Middle East", de: "Osteuropa / Naher Osten", ar: "أوروبا الشرقية / الشرق الأوسط" }
  },

  // --- DAIRY PRODUCTS ---
  {
    id: "labneh",
    category: "dairy",
    image: "assets/images/icons/cheese-spread.png",
    alt: { en: "Traditional Labneh product image", de: "Produktbild von Traditionellem Labneh", ar: "صورة منتج لبنة تقليدية" },
    name: { en: "Traditional Labneh", de: "Traditioneller Labneh", ar: "لبنة تقليدية" },
    spec: { en: "6 x 500g | Sealed Fresh Tub", de: "6 x 500g | Versiegelter Frischebecher", ar: "6 × 500 جم | علبة طازجة محكمة الغلق" },
    short: { en: "Creamy strained yogurt spread with pleasant tang for breakfast and mezze.", de: "Cremiger Frischkäse-Joghurt mit feiner Säure für Frühstück und Mezze.", ar: "زبادي مصفّى كريمي بنكهة حامضة لطيفة، مثالي للإفطار والمازة." },
    description: {
      en: "Thick, strained yogurt prepared according to classic Levant traditions. Rich in texture and protein, perfect with olive oil, za'atar, and warm pita.",
      de: "Dickflüssiger, abgetropfter Joghurt nach klassischer levantinischer Tradition. Reichhaltige Textur, ideal verfeinert mit Olivenöl, Za'atar und Fladenbrot.",
      ar: "زبادي سميك مصفّى مُحضَّر وفق التقاليد الشامية الكلاسيكية. قوام غني وغني بالبروتين، ويُقدَّم مثالياً مع زيت الزيتون والزعتر والخبز الدافئ."
    },
    packaging: { en: "6 x 500g tubs / 5kg catering buckets", de: "6 x 500g Becher / 5kg Gastro-Eimer", ar: "6 × 500 جم علب / دلاء كيتررينج 5 كجم" },
    storage: { en: "Keep refrigerated at +2°C to +6°C", de: "Gekühlt lagern bei +2°C bis +6°C", ar: "تُحفظ مبردة بين +2°م و +6°م" },
    origin: { en: "Middle East", de: "Naher Osten", ar: "الشرق الأوسط" }
  },
  {
    id: "cheese-spread",
    category: "dairy",
    image: "assets/images/icons/cheese-spread.png",
    alt: { en: "Cream Cheese Spread product image", de: "Produktbild von Schmelzkäsezubereitung", ar: "صورة منتج جبنة مطبوخة للدهن" },
    name: { en: "Cream Cheese Spread", de: "Schmelzkäse-Zubereitung", ar: "جبنة مطبوخة للدهن" },
    spec: { en: "24 x 240g | Glass Jar Tray", de: "24 x 240g | Gläser-Tray", ar: "24 × 240 جم | صينية علب زجاجية" },
    short: { en: "Smooth and creamy processed cheese spread in convenient glass jars.", de: "Cremig-streichzarter Schmelzkäse im praktischen Schraubglas.", ar: "جبنة مطبوخة ناعمة وكريمية سهلة الدهن في علب زجاجية عملية." },
    description: {
      en: "A pantry staple offering rich taste and smooth spreadability for bakery items, quick breakfasts, and culinary dips.",
      de: "Klassischer Brotaufstrich mit vollmundigem Geschmack und hoher Streichfähigkeit für Backwaren, Frühstück und Dips.",
      ar: "منتج أساسي بمذاق غني وقابلية دهن ناعمة للمخبوزات ووجبات الإفطار السريعة وأطباق الغمس."
    },
    packaging: { en: "24 x 240g / 12 x 500g glass jars", de: "24 x 240g / 12 x 500g Schraubgläser", ar: "24 × 240 جم / 12 × 500 جم علب زجاجية" },
    storage: { en: "Store in cool dry place; refrigerate after opening", de: "Kühl und trocken lagern; nach dem Öffnen kühlen", ar: "تُحفظ في مكان بارد وجاف؛ تُبرَّد بعد الفتح" },
    origin: { en: "Middle East", de: "Naher Osten", ar: "الشرق الأوسط" }
  },
  {
    id: "qashta-cream",
    category: "dairy",
    image: "assets/images/icons/cheese-spread.png",
    alt: { en: "Qashta Clotted Cream product image", de: "Produktbild von Qashta Rahm", ar: "صورة منتج قشطة (كريمة مكثفة)" },
    name: { en: "Qashta (Clotted Cream)", de: "Qashta (Arabischer Rahm)", ar: "قشطة (كريمة مكثفة)" },
    spec: { en: "12 x 170g | Easy-Open Tin", de: "12 x 170g | Dose mit Aufreißlasche", ar: "12 × 170 جم | علبة سهلة الفتح" },
    short: { en: "Rich, velvety clotted cream for traditional desserts and sweets.", de: "Samtiger, reichhaltiger Rahm für orientalische Desserts und Süßspeisen.", ar: "قشطة غنية ومخملية للحلويات الشرقية التقليدية." },
    description: {
      en: "Luxurious thickened cream ideal for filling baklava, atayef, kunafa, fruit salads, or spreading with honey.",
      de: "Feinster eingedickter Rahm, optimal für die Füllung von Baklava, Qatayef, Knafeh, Obstsalaten oder mit Honig.",
      ar: "قشطة فاخرة مكثفة، مثالية لحشو البقلاوة والقطايف والكنافة أو مع سلطات الفاكهة أو العسل."
    },
    packaging: { en: "12 x 170g easy-open tins per tray", de: "12 x 170g Dosen pro Tray", ar: "12 × 170 جم علب سهلة الفتح لكل صينية" },
    storage: { en: "Ambient dry storage; refrigerate after opening", de: "Trocken lagern; nach dem Öffnen gekühlt aufbewahren", ar: "تُخزَّن في درجة حرارة الغرفة الجافة؛ تُبرَّد بعد الفتح" },
    origin: { en: "Middle East", de: "Naher Osten", ar: "الشرق الأوسط" }
  },

  // --- MEAT PRODUCTS ---
  {
    id: "beef-shawarma",
    category: "meat",
    image: "assets/images/icons/kebab-icon.png",
    alt: { en: "Marinated Beef Shawarma product image", de: "Produktbild von Mariniertem Rindfleisch-Schawarma", ar: "صورة منتج شاورما لحم بقري متبلة" },
    name: { en: "Beef Shawarma (Halal)", de: "Rindfleisch-Schawarma (Halal)", ar: "شاورما لحم بقري (حلال)" },
    spec: { en: "4 x 2.5kg | Frozen Gastro Pack", de: "4 x 2,5kg | Gastro-Tiefkühlpack", ar: "4 × 2.5 كجم | عبوة مجمدة للمطاعم" },
    short: { en: "Pre-marinated premium beef slices seasoned with authentic Oriental spices.", de: "Vormariniertes Rindfleisch, gewürzt mit orientalischen Gewürzen.", ar: "شرائح لحم بقري فاخر متبلة مسبقاً بتوابل شرقية أصيلة." },
    description: {
      en: "Carefully sliced Halal beef marinated in classic spices, ready for spit roasting or rapid high-heat pan frying in commercial kitchens.",
      de: "Sorgfältig geschnittenes Halal-Rindfleisch in klassischer Gewürzmarinade, servierfertig für Drehspieße oder schnelles Braten in Profiküchen.",
      ar: "لحم بقري حلال مقطّع بعناية ومتبل بتوابل كلاسيكية، جاهز للشواء على السيخ أو القلي السريع على حرارة عالية في المطابخ التجارية."
    },
    packaging: { en: "4 x 2.5kg vacuum bags / 10kg-20kg frozen cones", de: "4 x 2,5kg Vakuumbeutel / 10kg-20kg Tiefkühlspieße", ar: "4 × 2.5 كجم أكياس مفرغة / مخاريط مجمدة 10-20 كجم" },
    storage: { en: "Keep frozen at -18°C", de: "Tiefgekühlt lagern bei -18°C", ar: "تُحفظ مجمدة عند -18°م" },
    origin: { en: "Halal Certified EU Production", de: "Halal-zertifizierte EU-Produktion", ar: "إنتاج حلال معتمد في الاتحاد الأوروبي" }
  },
  {
    id: "lamb-kebab",
    category: "meat",
    image: "assets/images/icons/kebab-icon.png",
    alt: { en: "Prepared Lamb & Beef Kebab product image", de: "Produktbild von Lamm & Rind Kebab", ar: "صورة منتج كباب لحم ضأن وبقري محضّر" },
    name: { en: "Lamb & Beef Kebab Skewers", de: "Lamm- & Rinderhack-Kebab", ar: "أسياخ كباب لحم ضأن وبقري" },
    spec: { en: "10 x 800g | IQF Tray Pack", de: "10 x 800g | IQF Schalenpackung", ar: "10 × 800 جم | عبوة صينية IQF" },
    short: { en: "Seasoned ground lamb and beef skewers prepared for rapid grilling.", de: "Gewürzte Lamm- und Rinderhackspieße, fertig für Grill und Pfanne.", ar: "أسياخ لحم ضأن وبقري مفروم ومتبل، جاهزة للشواء السريع." },
    description: {
      en: "Formed Halal minced meat skewers blended with parsley, onion, and oriental spices. Quick to cook from frozen for catering and restaurant workflows.",
      de: "Geformte Halal-Hackfleischspieße mit Petersilie, Zwiebeln und orientalischen Gewürzen. Schnell aus dem Tiefkühlzustand zubereitbar.",
      ar: "أسياخ لحم مفروم حلال مشكّلة، ممزوجة بالبقدونس والبصل والتوابل الشرقية. سريعة الطهي من حالة التجميد لسير عمل الكيترينج والمطاعم."
    },
    packaging: { en: "10 x 800g trays / 8kg bulk boxes", de: "10 x 800g Schalen / 8kg Großkarton", ar: "10 × 800 جم صواني / كراتين سائبة 8 كجم" },
    storage: { en: "Keep frozen at -18°C", de: "Tiefgekühlt lagern bei -18°C", ar: "تُحفظ مجمدة عند -18°م" },
    origin: { en: "Halal Certified Production", de: "Halal-zertifizierte Produktion", ar: "إنتاج حلال معتمد" }
  },
  {
    id: "halal-beef-sausage",
    category: "meat",
    image: "assets/images/icons/kebab-icon.png",
    alt: { en: "Sujuk Halal Beef Sausage product image", de: "Produktbild von Sucuk Halal Rinderwurst", ar: "صورة منتج سجق نقانق لحم بقري حلال" },
    name: { en: "Sujuk / Halal Beef Sausage", de: "Sucuk / Halal Rinderwurst", ar: "سجق / نقانق لحم بقري حلال" },
    spec: { en: "15 x 400g | Vacuum Twin Pack", de: "15 x 400g | Doppel-Vakuumpack", ar: "15 × 400 جم | عبوة مزدوجة مفرغة من الهواء" },
    short: { en: "Dry-fermented spiced Halal beef sausage with rich garlic and cumin notes.", de: "Würzige luftgetrocknete Rinder-Rohwurst mit Knoblauch- und Kreuzkümmelnote.", ar: "نقانق لحم بقري حلال متبلة ومجففة بالهواء بنكهة ثوم وكمون غنية." },
    description: {
      en: "Traditional spiced beef sausage prepared under strict Halal standards. Slices easily and crisps perfectly when pan-fried with eggs or baked in flatbreads.",
      de: "Traditionell gewürzte Halal-Rindfleischwurst. Lässt sich leicht schneiden und schmeckt hervorragend gebraten mit Eiern oder gebacken im Fladenbrot.",
      ar: "نقانق لحم بقري متبلة تقليدياً ومُحضَّرة وفق معايير حلال صارمة. تُقطَّع بسهولة وتصبح مقرمشة عند القلي مع البيض أو الخَبز داخل الخبز المسطح."
    },
    packaging: { en: "15 x 400g vacuum packs per carton", de: "15 x 400g Vakuumbeutel pro Karton", ar: "15 × 400 جم أكياس مفرغة لكل كرتون" },
    storage: { en: "Keep refrigerated at +2°C to +7°C", de: "Gekühlt lagern bei +2°C bis +7°C", ar: "تُحفظ مبردة بين +2°م و +7°م" },
    origin: { en: "Halal Certified Production", de: "Halal-zertifizierte Produktion", ar: "إنتاج حلال معتمد" }
  },

  // --- VEGETABLE PRODUCTS ---
  {
    id: "ardh-shawki",
    category: "vegetables",
    image: "assets/images/products/bags/Ardh Shawki (Artichoke Bottoms).png",
    alt: { en: "Ardh Shawki artichoke product image", de: "Produktbild von Ardh Shawki Artischocken", ar: "صورة منتج أرض شوكي (خرشوف)" },
    name: { en: "Ardh Shawki (Artichoke Bottoms)", de: "Artischockenböden", ar: "أرض شوكي (قيعان الخرشوف)" },
    spec: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton", ar: "20 × 400 جم أكياس لكل كرتون" },
    short: { en: "Cleaned and trimmed artichoke bottoms, individually quick-frozen at source.", de: "Gereinigte und zugeschnittene Artischockenböden, einzeln schockgefrostet.", ar: "قيعان خرشوف منظفة ومقصوصة، مجمدة سريعاً عند المصدر." },
    description: {
      en: "Premium selected artichoke bottoms picked at peak tenderness. Ideal for stuffing with meat and rice, stewing, or fine catering preparations.",
      de: "Erstklassige Artischockenböden, erntefrisch verarbeitet und schockgefrostet. Perfekt zum Füllen, Schmoren und für gehobene Gastronomiemenüs.",
      ar: "قيعان خرشوف فاخرة مختارة تُقطف في ذروة نضارتها. مثالية للحشو باللحم والأرز أو الطهي البطيء أو تحضيرات الكيترينج الفاخرة."
    },
    packaging: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton", ar: "20 × 400 جم أكياس لكل كرتون" },
    storage: { en: "Keep frozen at -18°C", de: "Tiefgekühlt lagern bei -18°C", ar: "تُحفظ مجمدة عند -18°م" },
    origin: { en: "Egypt / Selected Farms", de: "Ägypten / Ausgewählte Betriebe", ar: "مصر / مزارع مختارة" }
  },
  {
    id: "coriander",
    category: "vegetables",
    image: "assets/images/products/bags/Chopped Coriander.png",
    alt: { en: "Frozen Coriander product image", de: "Produktbild von Tiefkühl-Koriander", ar: "صورة منتج كزبرة مجمدة" },
    name: { en: "Chopped Coriander", de: "Koriander fein gehackt", ar: "كزبرة مفرومة" },
    spec: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton", ar: "20 × 400 جم أكياس لكل كرتون" },
    short: { en: "Aromatic chopped green coriander for seasonings, garnishes, and soups.", de: "Aromatischer gehackter Koriander zum Würzen, Garnieren und für Suppen.", ar: "كزبرة خضراء مفرومة عطرية للتتبيل والتزيين والشوربات." },
    description: {
      en: "Fresh green coriander washed, finely chopped, and individually frozen to preserve aroma and vibrant color. Essential for curries, molokhia, and marinades.",
      de: "Frischer grüner Koriander, gewaschen, fein gehackt und schockgefrostet zur Bewahrung des vollen Aromas und der grünen Farbe.",
      ar: "كزبرة خضراء طازجة مغسولة ومفرومة ناعماً ومجمدة فردياً للحفاظ على العطر واللون النابض. أساسية للكاري والملوخية والتتبيلات."
    },
    packaging: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton", ar: "20 × 400 جم أكياس لكل كرتون" },
    storage: { en: "Keep frozen at -18°C", de: "Tiefgekühlt lagern bei -18°C", ar: "تُحفظ مجمدة عند -18°م" },
    origin: { en: "Egypt / Middle East", de: "Ägypten / Naher Osten", ar: "مصر / الشرق الأوسط" }
  },
  {
    id: "eggplant",
    category: "vegetables",
    image: "assets/images/products/bags/grilled-eggplant.png",
    alt: { en: "Roasted Eggplant product image", de: "Produktbild von Gegrillter Aubergine", ar: "صورة منتج باذنجان مشوي" },
    name: { en: "Roasted Eggplant Pulp", de: "Geröstete Auberginenpaste", ar: "لب باذنجان مشوي" },
    spec: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton", ar: "20 × 400 جم أكياس لكل كرتون" },
    short: { en: "Flame-roasted eggplant pulp with natural smoky flavor for Baba Ghanoush.", de: "Über offener Flamme gegrillte Aubergine für authentisches Baba Ghanoush.", ar: "لب باذنجان مشوي على النار بنكهة دخانية طبيعية لتحضير البابا غنوج." },
    description: {
      en: "Fire-roasted whole eggplants peeled and packed ready to use. Gives authentic smoky depth to dips, mezze spreads, and vegetable sauces.",
      de: "Über Feuer geröstete ganze Auberginen, geschält und verzehrfertig vorbereitet. Verleiht Dips und Mezze ein unverwechselbares Raucharoma.",
      ar: "باذنجان كامل مشوي على النار مقشّر ومعبأ جاهزاً للاستخدام. يمنح عمقاً دخانياً أصيلاً للمقبلات ومزيج المازة وصلصات الخضار."
    },
    packaging: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton", ar: "20 × 400 جم أكياس لكل كرتون" },
    storage: { en: "Keep frozen at -18°C", de: "Tiefgekühlt lagern bei -18°C", ar: "تُحفظ مجمدة عند -18°م" },
    origin: { en: "Egypt / Levant", de: "Ägypten / Levante", ar: "مصر / بلاد الشام" }
  },
  {
    id: "falafel",
    category: "vegetables",
    image: "assets/images/products/bags/falafel.png",
    alt: { en: "Prepared Falafel product image", de: "Produktbild von Zubereiteter Falafel", ar: "صورة منتج فلافل محضّرة" },
    name: { en: "Pre-formed Falafel Patties", de: "Falafel", ar: "أقراص فلافل جاهزة التشكيل" },
    spec: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton", ar: "20 × 400 جم أكياس لكل كرتون" },
    short: { en: "Crispy chickpea and herb falafel, pre-fried and quick-frozen for fast serving.", de: "Knusprige Kichererbsen-Falafel, vorgebacken und schockgefrostet.", ar: "فلافل مقرمشة من الحمص والأعشاب، مقلية مسبقاً ومجمدة سريعاً للتقديم السريع." },
    description: {
      en: "Traditional recipe combining ground chickpeas, fresh parsley, coriander, and spices. Ready in minutes in fryer or oven for wraps and salad bowls.",
      de: "Traditionelle Rezeptur aus Kichererbsen, frischen Kräutern und Gewürzen. In wenigen Minuten in Fritteuse oder Ofen servierfertig zubereitet.",
      ar: "وصفة تقليدية تجمع بين الحمص المطحون والبقدونس الطازج والكزبرة والتوابل. جاهزة خلال دقائق في المقلاية أو الفرن للف والسلطات."
    },
    packaging: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton", ar: "20 × 400 جم أكياس لكل كرتون" },
    storage: { en: "Keep frozen at -18°C", de: "Tiefgekühlt lagern bei -18°C", ar: "تُحفظ مجمدة عند -18°م" },
    origin: { en: "Middle East", de: "Naher Osten", ar: "الشرق الأوسط" }
  },
  {
    id: "foul",
    category: "vegetables",
    image: "assets/images/products/bags/green-ful.png",
    alt: { en: "Foul Fava Beans product image", de: "Produktbild von Foul Ackerbohnen", ar: "صورة منتج فول مدمس" },
    name: { en: "Foul Mudammas (Fava Beans)", de: "Dicke Bohnen", ar: "فول مدمس" },
    spec: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton", ar: "20 × 400 جم أكياس لكل كرتون" },
    short: { en: "Tender cooked fava beans prepared for traditional breakfast dishes.", de: "Zart gekochte Saubohnen für das traditionelle nahöstliche Frühstück.", ar: "فول مطبوخ طري مُحضَّر لأطباق الإفطار التقليدية." },
    description: {
      en: "Selected premium fava beans cooked to creamy perfection. A cornerstone of Middle Eastern hospitality, served with cumin, lemon juice, and olive oil.",
      de: "Ausgewählte Ackerbohnen, cremig und zart vorgekocht. Grundbaustein für klassische Frühstücksgerichte mit Kreuzkümmel, Zitrone und Olivenöl.",
      ar: "فول فاخر مختار مطبوخ حتى القوام الكريمي المثالي. ركيزة أساسية للضيافة الشرقية، يُقدَّم مع الكمون وعصير الليمون وزيت الزيتون."
    },
    packaging: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton", ar: "20 × 400 جم أكياس لكل كرتون" },
    storage: { en: "Ambient dry storage / refrigerate after opening", de: "Trocken lagern / nach dem Öffnen kühlen", ar: "يُخزَّن جافاً في درجة حرارة الغرفة / يُبرَّد بعد الفتح" },
    origin: { en: "Egypt / Middle East", de: "Ägypten / Naher Osten", ar: "مصر / الشرق الأوسط" }
  },
  {
    id: "green-bean",
    category: "vegetables",
    image: "assets/images/products/bags/green-bean.png",
    alt: { en: "Cut Green Beans product image", de: "Produktbild von Schnittbohnen", ar: "صورة منتج فاصوليا خضراء مقطعة" },
    name: { en: "Cut Green Beans (IQF)", de: "Junge Brechbohnen", ar: "فاصوليا خضراء مقطعة (IQF)" },
    spec: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton", ar: "20 × 400 جم أكياس لكل كرتون" },
    short: { en: "Tender young green beans trimmed, uniformly cut, and quickly frozen.", de: "Zarte grüne Bohnen, gleichmäßig geschnitten und schockgefrostet.", ar: "فاصوليا خضراء يافعة طرية، مقصوصة ومقطعة بانتظام ومجمدة سريعاً." },
    description: {
      en: "Sweet, stringless green beans harvested young to maintain crispness and bright green coloration. Excellent for stews, side dishes, and steam cooking.",
      de: "Schnittfeste grüne Bohnen ohne Fäden, jung geerntet für knackigen Biss und leuchtende Farbe. Ideal für Eintöpfe und Gemüsebeilagen.",
      ar: "فاصوليا خضراء حلوة خالية من الألياف، تُحصد يافعة للحفاظ على القرمشة واللون الأخضر النضر. ممتازة لليخنات والأطباق الجانبية والطهي بالبخار."
    },
    packaging: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton", ar: "20 × 400 جم أكياس لكل كرتون" },
    storage: { en: "Keep frozen at -18°C", de: "Tiefgekühlt lagern bei -18°C", ar: "تُحفظ مجمدة عند -18°م" },
    origin: { en: "Egypt / Selected Farms", de: "Ägypten / Ausgewählte Betriebe", ar: "مصر / مزارع مختارة" }
  },
  {
    id: "mango",
    category: "vegetables",
    image: "assets/images/products/bags/mango.png",
    alt: { en: "Frozen Mango Pulp & Chunks product image", de: "Produktbild von Mango-Fruchtfleisch & Würfel", ar: "صورة منتج لب وقطع مانجو مجمدة" },
    name: { en: "Egyptian Mango Chunks / Pulp", de: "Mango in Streifen", ar: "شرائح / لب مانجو مصري" },
    spec: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton", ar: "20 × 400 جم أكياس لكل كرتون" },
    short: { en: "Naturally sweet Egyptian mango chunks with rich aroma and golden color.", de: "Sonnengereifte Mangostücke mit unvergleichlicher Süße und Aroma.", ar: "قطع مانجو مصرية حلوة طبيعياً بعطر غني ولون ذهبي." },
    description: {
      en: "Famous Egyptian mango varieties processed at peak ripeness. 100% natural fruit without additives, ideal for smoothies, juices, desserts, and bakery.",
      de: "Berühmte ägyptische Mangosorten, bei voller Reife geerntet und verarbeitet. Ideal für Säfte, Smoothies, Desserts und Eiscremezubereitung.",
      ar: "أصناف مانجو مصرية شهيرة تُعالَج في ذروة النضج. فاكهة طبيعية 100% بدون إضافات، مثالية للعصائر والسموذي والحلويات والمخبوزات."
    },
    packaging: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton", ar: "20 × 400 جم أكياس لكل كرتون" },
    storage: { en: "Keep frozen at -18°C", de: "Tiefgekühlt lagern bei -18°C", ar: "تُحفظ مجمدة عند -18°م" },
    origin: { en: "Ismailia, Egypt", de: "Ismailia, Ägypten", ar: "الإسماعيلية، مصر" }
  },
  {
    id: "mlokhya-leafs",
    category: "vegetables",
    image: "assets/images/products/bags/mlokhya-leavs.png",
    alt: { en: "Whole Molokhia Leaves product image", de: "Produktbild von Ganzen Molokhia-Blättern", ar: "صورة منتج أوراق ملوخية كاملة" },
    name: { en: "Molokhia Whole Leaves", de: "Molokhia (Blätter)", ar: "ملوخية بالورق الكامل" },
    spec: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton", ar: "20 × 400 جم أكياس لكل كرتون" },
    short: { en: "Carefully hand-picked whole Molokhia leaves frozen fresh.", de: "Sorgfältig handgepflückte ganze Molokhia-Blätter, schockgefrostet.", ar: "أوراق ملوخية كاملة مقطوفة يدوياً بعناية ومجمدة طازجة." },
    description: {
      en: "Cleaned and destemmed jute mallow leaves preserved whole. Preferred by chefs for authentic Levantine stews requiring intact leafy texture.",
      de: "Gewaschene und entstielte ganze Molokhia-Blätter. Von Köchen geschätzt für traditionelle Schmorgerichte mit Blattstruktur.",
      ar: "أوراق ملوخية منظفة ومنزوعة السيقان ومحفوظة كاملة. يفضّلها الطهاة لليخنات الشامية الأصيلة التي تتطلب قوام الورق السليم."
    },
    packaging: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton", ar: "20 × 400 جم أكياس لكل كرتون" },
    storage: { en: "Keep frozen at -18°C", de: "Tiefgekühlt lagern bei -18°C", ar: "تُحفظ مجمدة عند -18°م" },
    origin: { en: "Egypt / Nile Delta", de: "Ägypten / Nildelta", ar: "مصر / دلتا النيل" }
  },
  {
    id: "mlokhya",
    category: "vegetables",
    image: "assets/images/products/bags/mlokhya.png",
    alt: { en: "Minced Molokhia product image", de: "Produktbild von Fein Gehackter Molokhia", ar: "صورة منتج ملوخية مفرومة ناعماً" },
    name: { en: "Molokhia Minced (Classic)", de: "Molokhia (gehackt)", ar: "ملوخية مفرومة (كلاسيك)" },
    spec: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton", ar: "20 × 400 جم أكياس لكل كرتون" },
    short: { en: "Finely minced Molokhia greens, the classic staple for Egyptian national soup.", de: "Fein gehackte Molokhia-Blätter, der Klassiker für die Nationalküche.", ar: "ملوخية خضراء مفرومة ناعماً، الطبق الكلاسيكي الأساسي للمطبخ المصري." },
    description: {
      en: "Finely chopped jute mallow leaves ready for garlic-coriander tasha tempering. Delivers authentic silky consistency and deep green vibrancy.",
      de: "Feinst gehackte Molokhia-Blätter für die klassische Zubereitung mit Knoblauch-Koriander-Tasha. Sichert seidenweiche Konsistenz und satte Farbe.",
      ar: "أوراق ملوخية مفرومة ناعماً جاهزة للتحمير بالثوم والكزبرة (الطشة). تمنح قواماً حريرياً أصيلاً ولوناً أخضر داكناً نابضاً."
    },
    packaging: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton", ar: "20 × 400 جم أكياس لكل كرتون" },
    storage: { en: "Keep frozen at -18°C", de: "Tiefgekühlt lagern bei -18°C", ar: "تُحفظ مجمدة عند -18°م" },
    origin: { en: "Egypt / Nile Delta", de: "Ägypten / Nildelta", ar: "مصر / دلتا النيل" }
  },
  {
    id: "peas-carrots",
    category: "vegetables",
    image: "assets/images/products/bags/carrot-peas.png",
    alt: { en: "Peas and Carrots product image", de: "Produktbild von Erbsen und Karotten", ar: "صورة منتج بازلاء وجزر" },
    name: { en: "Green Peas & Diced Carrots", de: "Erbsen & Karottenwürfel", ar: "بازلاء خضراء مع جزر مقطع" },
    spec: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton", ar: "20 × 400 جم أكياس لكل كرتون" },
    short: { en: "Sweet green peas blended with uniformly diced tender carrots.", de: "Süße grüne Erbsen gemischt mit zarten Karottenwürfeln.", ar: "بازلاء خضراء حلوة ممزوجة بمكعبات جزر طرية متجانسة." },
    description: {
      en: "A balanced 50/50 mix of sweet green peas and orange carrot cubes. Retains texture and sweetness for rice dishes, side vegetables, and stews.",
      de: "Ausgewogene Mischung aus feinen Erbsen und Karottenwürfeln. Behält Biss und Frische bei, ideal für Reisgerichte und Eintöpfe.",
      ar: "مزيج متوازن 50/50 من البازلاء الخضراء الحلوة ومكعبات الجزر البرتقالي. يحافظ على القوام والحلاوة لأطباق الأرز والخضار الجانبية واليخنات."
    },
    packaging: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton", ar: "20 × 400 جم أكياس لكل كرتون" },
    storage: { en: "Keep frozen at -18°C", de: "Tiefgekühlt lagern bei -18°C", ar: "تُحفظ مجمدة عند -18°م" },
    origin: { en: "Egypt / Selected Farms", de: "Ägypten / Ausgewählte Betriebe", ar: "مصر / مزارع مختارة" }
  },
  {
    id: "peas",
    category: "vegetables",
    image: "assets/images/products/bags/peas.png",
    alt: { en: "Extra Fine Green Peas product image", de: "Produktbild von Extra Feinen Erbsen", ar: "صورة منتج بازلاء خضراء فائقة النعومة" },
    name: { en: "Extra Fine Green Peas", de: "Grüne Erbsen", ar: "بازلاء خضراء فائقة النعومة" },
    spec: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton", ar: "20 × 400 جم أكياس لكل كرتون" },
    short: { en: "Tender, naturally sweet green peas sorted for size and softness.", de: "Zarte, süße grüne Erbsen, schonend sortiert und schockgefrostet.", ar: "بازلاء خضراء طرية وحلوة طبيعياً، مصنّفة حسب الحجم والنعومة." },
    description: {
      en: "Selected extra-fine green peas flash frozen within hours of harvesting to seal in delicate sweetness and vital nutrients.",
      de: "Sorgfältig verlesene feine Erbsen, wenige Stunden nach der Ernte schockgefrostet für maximalen Geschmack und Vitamingehalt.",
      ar: "بازلاء خضراء فائقة النعومة مختارة، تُجمَّد سريعاً خلال ساعات من الحصاد للحفاظ على الحلاوة الرقيقة والعناصر الغذائية الحيوية."
    },
    packaging: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton", ar: "20 × 400 جم أكياس لكل كرتون" },
    storage: { en: "Keep frozen at -18°C", de: "Tiefgekühlt lagern bei -18°C", ar: "تُحفظ مجمدة عند -18°م" },
    origin: { en: "Egypt / Selected Farms", de: "Ägypten / Ausgewählte Betriebe", ar: "مصر / مزارع مختارة" }
  },
  {
    id: "peeled-foul",
    category: "vegetables",
    image: "assets/images/products/bags/peeled-ful.png",
    alt: { en: "Peeled Fava Beans product image", de: "Produktbild von Geschälten Ackerbohnen", ar: "صورة منتج فول مقشر" },
    name: { en: "Peeled Fava Beans (Foul Madchouch)", de: "Saubohnen (geschält)", ar: "فول مقشر (فول مدشوش)" },
    spec: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton", ar: "20 × 400 جم أكياس لكل كرتون" },
    short: { en: "De-skinned fava beans, essential base for traditional falafel and dips.", de: "Geschälte Saubohnen, unverzichtbare Basis für hausgemachte Falafel.", ar: "فول منزوع القشرة، أساس ضروري للفلافل التقليدية والمقبلات." },
    description: {
      en: "High-grade fava beans with outer skin removed, quick-frozen. The essential ingredient for crafting authentic Egyptian Ta'ameya / Falafel and creamy bean purees.",
      de: "Hochwertige Saubohnen ohne Schale, schockgefrostet. Die unverzichtbare Hauptzutat für traditionelle ägyptische Ta'ameya (Falafel) und cremige Pürees.",
      ar: "فول عالي الجودة منزوع القشرة الخارجية ومجمد سريعاً. المكوّن الأساسي الضروري لصنع الطعمية / الفلافل المصرية الأصيلة والمهروسات الكريمية."
    },
    packaging: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton", ar: "20 × 400 جم أكياس لكل كرتون" },
    storage: { en: "Keep frozen at -18°C", de: "Tiefgekühlt lagern bei -18°C", ar: "تُحفظ مجمدة عند -18°م" },
    origin: { en: "Egypt / Middle East", de: "Ägypten / Naher Osten", ar: "مصر / الشرق الأوسط" }
  },
  {
    id: "okra-zero",
    category: "vegetables",
    image: "assets/images/products/bags/okra-zero.png",
    alt: { en: "Okra Zero product image", de: "Produktbild von Okra Zero", ar: "صورة منتج بامية زيرو" },
    name: { en: "Okra Zero", de: "Okraschoten (Zero)", ar: "بامية زيرو" },
    spec: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton", ar: "20 × 400 جم أكياس لكل كرتون" },
    short: { en: "Small tender okra pods, quick-frozen for traditional stews and side dishes.", de: "Kleine zarte Okraschoten, schockgefrostet für traditionelle Eintöpfe und Beilagen.", ar: "قرون بامية صغيرة وطرية، مجمدة سريعاً لليخنات والأطباق الجانبية التقليدية." },
    description: {
      en: "Selected fine okra pods cleaned, trimmed, and quick-frozen to preserve natural texture and color. Ideal for Middle Eastern okra stews and professional kitchen preparation.",
      de: "Ausgewählte feine Okraschoten, gereinigt, zugeschnitten und schockgefrostet zur Bewahrung von Textur und Farbe. Ideal für nahöstliche Okra-Eintöpfe und Profiküchen.",
      ar: "قرون بامية فاخرة مختارة، منظفة ومقصوصة ومجمدة سريعاً للحفاظ على القوام واللون الطبيعيين. مثالية ليخنات البامية الشرقية والتحضير في المطابخ الاحترافية."
    },
    packaging: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton", ar: "20 × 400 جم أكياس لكل كرتون" },
    storage: { en: "Keep frozen at -18°C", de: "Tiefgekühlt lagern bei -18°C", ar: "تُحفظ مجمدة عند -18°م" },
    origin: { en: "Egypt / Selected Farms", de: "Ägypten / Ausgewählte Betriebe", ar: "مصر / مزارع مختارة" }
  },
  {
    id: "okra-f1",
    category: "vegetables",
    image: "assets/images/products/bags/okra-f1.png",
    alt: { en: "Okra F1 product image", de: "Produktbild von Okra F1", ar: "صورة منتج بامية F1" },
    name: { en: "Okra F1", de: "Okraschoten F1", ar: "بامية F1" },
    spec: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton", ar: "20 × 400 جم أكياس لكل كرتون" },
    short: { en: "Uniform frozen okra selected for consistent size, color, and cooking quality.", de: "Gleichmäßige Tiefkühl-Okra, ausgewählt für konstante Größe, Farbe und Kochqualität.", ar: "بامية مجمدة متجانسة مختارة لثبات الحجم واللون وجودة الطهي." },
    description: {
      en: "Carefully graded okra with consistent pod size for reliable retail and food-service use. Frozen quickly after harvest to support dependable quality in every carton.",
      de: "Sorgfältig sortierte Okra mit gleichmäßiger Schotengröße für zuverlässige Retail- und Food-Service-Anwendungen. Direkt nach der Ernte schockgefrostet.",
      ar: "بامية مصنّفة بعناية بحجم قرون متجانس لاستخدام موثوق في التجزئة وخدمات الطعام. تُجمَّد سريعاً بعد الحصاد لضمان جودة موثوقة في كل كرتون."
    },
    packaging: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton", ar: "20 × 400 جم أكياس لكل كرتون" },
    storage: { en: "Keep frozen at -18°C", de: "Tiefgekühlt lagern bei -18°C", ar: "تُحفظ مجمدة عند -18°م" },
    origin: { en: "Egypt / Selected Farms", de: "Ägypten / Ausgewählte Betriebe", ar: "مصر / مزارع مختارة" }
  },
  {
    id: "okra-extra",
    category: "vegetables",
    image: "assets/images/products/bags/okra-extra.png",
    alt: { en: "Okra Extra product image", de: "Produktbild von Okra Extra", ar: "صورة منتج بامية إكسترا" },
    name: { en: "Okra Extra", de: "Okra Extra (Fein)", ar: "بامية إكسترا" },
    spec: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton", ar: "20 × 400 جم أكياس لكل كرتون" },
    short: { en: "Premium okra pods prepared for authentic stews, catering, and retail assortments.", de: "Premium-Okraschoten für authentische Eintöpfe, Catering und Retail-Sortimente.", ar: "قرون بامية فاخرة مُحضَّرة لليخنات الأصيلة والكيترينج وتشكيلات التجزئة." },
    description: {
      en: "Premium grade frozen okra selected for clean appearance, tender bite, and dependable cooking performance across wholesale and food-service programs.",
      de: "Premium-Tiefkühlokra, ausgewählt für saubere Optik, zarten Biss und verlässliche Zubereitung in Großhandel und Food-Service.",
      ar: "بامية مجمدة من الدرجة الممتازة، مختارة لمظهرها النظيف وقوامها الطري وأدائها الموثوق في الطهي عبر برامج الجملة وخدمات الطعام."
    },
    packaging: { en: "20 x 400g bags per carton", de: "20 x 400g Beutel pro Karton", ar: "20 × 400 جم أكياس لكل كرتون" },
    storage: { en: "Keep frozen at -18°C", de: "Tiefgekühlt lagern bei -18°C", ar: "تُحفظ مجمدة عند -18°م" },
    origin: { en: "Egypt / Selected Farms", de: "Ägypten / Ausgewählte Betriebe", ar: "مصر / مزارع مختارة" }
  }
];
