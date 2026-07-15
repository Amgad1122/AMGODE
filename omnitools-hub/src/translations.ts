export interface Translation {
  name: string;
  desc: string;
}

export const uiTranslations = {
  ar: {
    logo: "AMGODE",
    searchPlaceholder: "ابحث عن أكثر من 100 أداة...",
    heroTitle: "100 أداة احترافية مجانية",
    heroTitleSub: "للمبدعين، المطورين، والمالية",
    heroSubtitle: "كل ما تحتاجه في مكان واحد. لا يتطلب التسجيل. سريع، يعمل بالكامل على المتصفح، ومجاني للأبد.",
    continueButton: "اضغط هنا للمتابعة",
    noToolsFound: "لم يتم العثور على أدوات",
    noToolsFoundDesc: "جرب تعديل البحث أو تصفية الفئات.",
    toggleLang: "🌐 English",
    categories: {
      "All Tools": "جميع الأدوات",
      "Finance": "المالية والاستثمار",
      "Developer": "أدوات المطورين",
      "Text": "النصوص والمحتوى",
      "Images/Design": "الصور والتصميم",
      "Data": "البيانات والملفات",
      "Health": "الصحة والرشاقة",
      "Time": "الوقت والتنظيم",
      "SEO": "سيو ومحركات البحث",
      "Math & Science": "الرياضيات والعلوم",
      "Entertainment": "الترفيه والتسلية"
    }
  },
  en: {
    logo: "AMGODE",
    searchPlaceholder: "Search 100+ tools...",
    heroTitle: "100 Free Professional Tools",
    heroTitleSub: "for Creators, Devs & Finance",
    heroSubtitle: "Everything you need in one place. No signup required. Fast, client-side, and free forever.",
    continueButton: "Click here to continue",
    noToolsFound: "No tools found",
    noToolsFoundDesc: "Try adjusting your search or category filter.",
    toggleLang: "🌐 العربية",
    categories: {
      "All Tools": "All Tools",
      "Finance": "Finance",
      "Developer": "Developer",
      "Text": "Text",
      "Images/Design": "Images/Design",
      "Data": "Data",
      "Health": "Health",
      "Time": "Time",
      "SEO": "SEO",
      "Math & Science": "Math & Science",
      "Entertainment": "Entertainment"
    }
  }
};

export const toolTranslations: { [key: number]: { ar: Translation, en: Translation } } = {
  // Finance
  1: {
    ar: { name: "حاسبة الفائدة المركبة", desc: "احسب الفائدة المركبة والنمو المالي بمرور الوقت بسهولة." },
    en: { name: "Compound Interest Calculator", desc: "Calculate compound interest over time and see financial growth." }
  },
  2: {
    ar: { name: "حاسبة قروض السيارات", desc: "احسب دفعات قرض السيارة الخاص بك والفوائد الشهرية المترتبة." },
    en: { name: "Auto Loan Calculator", desc: "Calculate your auto loan payments and interest charges." }
  },
  3: {
    ar: { name: "حاسبة التمويل العقاري", desc: "احسب دفعات التمويل العقاري والفوائد والجدول الزمني للتمويل." },
    en: { name: "Mortgage Calculator", desc: "Calculate mortgage payments, interest, and amortization schedule." }
  },
  4: {
    ar: { name: "حاسبة صافي الراتب", desc: "احسب راتبك الفعلي المتبقي بعد الضرائب والخصومات والامتيازات." },
    en: { name: "Net Salary Calculator", desc: "Calculate take-home pay after taxes, deductions, and benefits." }
  },
  5: {
    ar: { name: "محول العملات", desc: "تحويل فوري بين العملات العالمية المختلفة بأسعار صرف حية." },
    en: { name: "Currency Converter", desc: "Convert between various global currencies with live exchange rates." }
  },
  6: {
    ar: { name: "حاسبة ضريبة القيمة المضافة", desc: "احسب ضريبة القيمة المضافة (VAT) المضافة أو المستبعدة بنقرة واحدة." },
    en: { name: "VAT Calculator", desc: "Calculate Value Added Tax (VAT) added or excluded in one click." }
  },
  7: {
    ar: { name: "حاسبة التضخم", desc: "احسب تأثير التضخم على القيمة الشرائية لأموالك بمرور السنين." },
    en: { name: "Inflation Calculator", desc: "Calculate inflation impact on the purchasing power of your money over years." }
  },
  8: {
    ar: { name: "حاسبة العائد على الاستثمار", desc: "احسب نسبة وأرباح العائد المتوقع على استثماراتك المالية." },
    en: { name: "ROI Calculator", desc: "Calculate expected Return on Investment ratio and profit margin." }
  },
  9: {
    ar: { name: "تقسيم الفواتير", desc: "قسم الفاتورة الإجمالية والمصاريف والمقاهي بين الأصدقاء بالتساوي." },
    en: { name: "Bill Splitter", desc: "Split bills and expenses among friends easily with custom tips." }
  },
  10: {
    ar: { name: "حاسبة التقاعد المبكر (FIRE)", desc: "احسب متطلبات الاستقلال المالي والتقاعد المبكر المناسب لك." },
    en: { name: "FIRE Calculator", desc: "Financial Independence, Retire Early calculator and forecast." }
  },

  // Developer
  11: {
    ar: { name: "منسق لغة JSON", desc: "قم بتنسيق وتحسين قراءة كود JSON والتحقق من صحته." },
    en: { name: "JSON Formatter", desc: "Format, beautify and validate JSON code for readability." }
  },
  12: {
    ar: { name: "مضغط أكواد CSS", desc: "قم بضغط وتقليل حجم ملفات CSS لتسريع موقع الويب الخاص بك." },
    en: { name: "CSS Minifier", desc: "Minify and compress your CSS code to speed up your website." }
  },
  13: {
    ar: { name: "مضغط أكواد JavaScript", desc: "قم بضغط وتقليل حجم ملفات JS للتخلص من المسافات الزائدة." },
    en: { name: "JS Minifier", desc: "Minify and compress your JavaScript code to optimize load times." }
  },
  14: {
    ar: { name: "مولد كلمات المرور", desc: "إنشاء كلمات مرور عشوائية قوية وآمنة للغاية وقابلة للتخصيص." },
    en: { name: "Password Generator", desc: "Generate strong, secure, and customizable random passwords." }
  },
  15: {
    ar: { name: "فاحص قوة كلمة المرور", desc: "افحص قوة كلمة المرور الخاصة بك ومدى مقاومتها للاختراق." },
    en: { name: "Password Strength Checker", desc: "Analyze the strength and security of your password." }
  },
  16: {
    ar: { name: "محول الألوان HEX/RGB", desc: "حول الألوان بسهولة بين صيغ HEX و RGB و HSL." },
    en: { name: "HEX/RGB Converter", desc: "Convert colors easily between HEX, RGB and HSL formats." }
  },
  17: {
    ar: { name: "مولد رموز QR", desc: "إنشاء رمز استجابة سريعة (QR Code) مخصص من النصوص أو الروابط." },
    en: { name: "QR Code Generator", desc: "Generate custom QR codes from any text or website URL." }
  },
  18: {
    ar: { name: "تشفير وفك تشفير Base64", desc: "قم بتشفير النصوص إلى صيغة Base64 أو فك تشفيرها بسهولة." },
    en: { name: "Base64 Encoder/Decoder", desc: "Encode text strings to Base64 format or decode them back." }
  },
  19: {
    ar: { name: "ترميز وفك ترميز URL", desc: "تشفير وفك تشفير معلمات روابط الويب لضمان سلامتها." },
    en: { name: "URL Encoder/Decoder", desc: "Encode or decode URL parameters for safe web transmission." }
  },
  20: {
    ar: { name: "مولد رموز UUID", desc: "توليد معرفات فريدة عالمية (UUID/GUID) عشوائية بنقرة زر." },
    en: { name: "UUID Generator", desc: "Generate random Universally Unique Identifiers (UUID/GUID) instantly." }
  },

  // Text
  21: {
    ar: { name: "عداد الكلمات والحروف", desc: "احسب عدد الكلمات والرموز والفقرات والأحرف في نصوصك." },
    en: { name: "Word/Char Counter", desc: "Count words, characters, sentences, and paragraphs in your text." }
  },
  22: {
    ar: { name: "محول حالة الأحرف", desc: "تحويل حالة الحروف الإنجليزية (كبير، صغير، بداية الكلمة)." },
    en: { name: "Case Converter", desc: "Convert text case (uppercase, lowercase, title case, sentence case)." }
  },
  23: {
    ar: { name: "حذف المسافات الزائدة", desc: "نظف نصوصك وتخلص من الفراغات والمسافات المتكررة وغير المرغوبة." },
    en: { name: "Remove Extra Spaces", desc: "Clean up spacing, remove duplicate spaces, and trim text." }
  },
  24: {
    ar: { name: "عكس النصوص", desc: "قم بعكس ترتيب الحروف أو الكلمات في النصوص بطريقة مسلية أو لأغراض برمجية." },
    en: { name: "Text Reverser", desc: "Reverse strings, characters, or word order in your text." }
  },
  25: {
    ar: { name: "مولد لوريم إيبسوم", desc: "توليد نصوص لوريم إيبسوم عشوائية لاستخدامها كمحتوى مؤقت للتصميم." },
    en: { name: "Lorem Ipsum Generator", desc: "Generate random dummy filler text for layouts and design." }
  },
  26: {
    ar: { name: "مستخرج الروابط", desc: "استخرج كافة الروابط الإلكترونية (URLs) من داخل أي نص أو كود." },
    en: { name: "URL Extractor", desc: "Extract all web links and URLs from any bulk text block." }
  },
  27: {
    ar: { name: "مستخرج البريد الإلكتروني", desc: "ابحث واستخرج جميع عناوين البريد الإلكتروني الموجودة في نصوصك." },
    en: { name: "Email Extractor", desc: "Find and extract all email addresses from raw text." }
  },
  28: {
    ar: { name: "البحث والاستبدال", desc: "ابحث عن كلمات محددة داخل النص واستبدلها بكلمات أخرى فوراً." },
    en: { name: "Find & Replace", desc: "Search for specific keywords and replace them with new text." }
  },
  29: {
    ar: { name: "محول النص إلى نظام ثنائي", desc: "حول الكلمات والنصوص العادية إلى شفرات ثنائية (0 و 1) والعكس." },
    en: { name: "Text to Binary", desc: "Convert plain text to binary code (zeros and ones) and vice-versa." }
  },
  30: {
    ar: { name: "مزيل التكرار من القوائم", desc: "احذف الأسطر والكلمات المكررة من قوائمك لتصفيتها." },
    en: { name: "List Deduplicator", desc: "Remove duplicate lines and keywords from your lists instantly." }
  },

  // Images/Design
  31: {
    ar: { name: "مضغط الصور", desc: "قلل حجم ملفات الصور بشكل ملحوظ مع الحفاظ التام على جودتها." },
    en: { name: "Image Compressor", desc: "Reduce image file sizes significantly while maintaining visual quality." }
  },
  32: {
    ar: { name: "محول PNG إلى JPG", desc: "تحويل صور PNG الشفافة إلى صيغة JPG القياسية بسرعة." },
    en: { name: "PNG to JPG Converter", desc: "Convert PNG transparent images to standard JPG format fast." }
  },
  33: {
    ar: { name: "محول صيغة WebP", desc: "حول صورك إلى صيغة WebP الحديثة والمثالية لمواقع الويب السريعة." },
    en: { name: "WebP Converter", desc: "Convert traditional images to modern, fast-loading WebP format." }
  },
  34: {
    ar: { name: "أداة قص الصور", desc: "قص الصور وتحجيمها وتعديل أبعادها بسهولة واحترافية." },
    en: { name: "Image Cropper", desc: "Crop, rotate, and resize images to fit custom dimensions." }
  },
  35: {
    ar: { name: "ملتقط ومحدد الألوان", desc: "استخرج درجات الألوان ورموزها من الصور أو اصنع لوحتك الخاصة." },
    en: { name: "Color Picker", desc: "Extract colors, find hex codes, or generate color palettes." }
  },
  36: {
    ar: { name: "مولد الأيقونات المفضلة (Favicon)", desc: "حول أي صورة إلى أيقونة مفضلة لموقعك بمختلف الأحجام القياسية." },
    en: { name: "Favicon Generator", desc: "Convert any image into a favicon format for websites with standard sizes." }
  },
  37: {
    ar: { name: "مولد التدرجات اللونية CSS", desc: "صمم تدرجات لونية مذهلة واحصل على كود CSS الخاص بها جاهزاً." },
    en: { name: "CSS Gradient Generator", desc: "Create stunning linear or radial gradients and copy CSS code." }
  },
  38: {
    ar: { name: "مولد ظلال الصناديق CSS", desc: "اصنع ظلالاً ناعمة واحترافية للعناصر وانسخ كود CSS مباشرة." },
    en: { name: "CSS Box Shadow Generator", desc: "Design elegant box shadows for your web elements and copy CSS." }
  },
  39: {
    ar: { name: "تغبيش الصور (Blur)", desc: "أضف تأثيراً ضبابياً أو تغبيشاً ناعماً على أجزاء من صورك." },
    en: { name: "Image Blur Tool", desc: "Apply a soft focus, blur filter, or depth-of-field effect on images." }
  },
  40: {
    ar: { name: "إضافة علامة مائية", desc: "احمِ حقوق صورك بإضافة نصوص أو شعارات كعلامة مائية مخصصة." },
    en: { name: "Watermark Maker", desc: "Protect your images by adding custom text or logo watermarks." }
  },

  // Data
  41: {
    ar: { name: "محول CSV إلى JSON", desc: "حول ملفات وقوائم البيانات من صيغة CSV إلى صيغة JSON المنسقة." },
    en: { name: "CSV to JSON Converter", desc: "Convert structured CSV data or spreadsheet rows to JSON format." }
  },
  42: {
    ar: { name: "محول JSON إلى XML", desc: "حول الكائنات البرمجية من صيغة JSON إلى هيكلية XML بسهولة." },
    en: { name: "JSON to XML Converter", desc: "Convert structured JSON object data into hierarchical XML document." }
  },
  43: {
    ar: { name: "محول XML to CSV", desc: "حول ملفات XML الهيكلية إلى جداول وصيغ CSV متوافقة مع إكسل." },
    en: { name: "XML to CSV Converter", desc: "Convert hierarchical XML elements into flat CSV table rows." }
  },
  44: {
    ar: { name: "إكسل إلى جدول HTML", desc: "حول ملفات وجداول الإكسل إلى أكواد جداول HTML جاهزة لموقعك." },
    en: { name: "Excel to HTML Table", desc: "Convert spreadsheets and Excel tables to clean HTML tables." }
  },
  45: {
    ar: { name: "قارئ بيانات EXIF", desc: "اقرأ واستخرج البيانات الوصفية المخفية في الصور (مثل الكاميرا والموقع)." },
    en: { name: "EXIF Data Reader", desc: "Extract hidden metadata, camera settings, and GPS data from photos." }
  },
  46: {
    ar: { name: "محلل النصوص والبيانات", desc: "قم بتحليل عميق للنص، واستخرج إحصائيات التكرار وأكثر الكلمات شيوعاً." },
    en: { name: "Text Analyzer", desc: "Analyze text deeply, checking word density, character count, and patterns." }
  },
  47: {
    ar: { name: "مولد أكواد Markdown", desc: "أنشئ واكتب ملفات Markdown منسقة باستخدام واجهة مرئية سهلة." },
    en: { name: "Markdown Generator", desc: "Write and generate markdown files instantly with a visual rich editor." }
  },
  48: {
    ar: { name: "محول Markdown إلى HTML", desc: "حول ملفات ونصوص Markdown إلى كود HTML صالح للعرض على الويب." },
    en: { name: "MD to HTML Converter", desc: "Convert standard markdown text into clean web-ready HTML code." }
  },
  49: {
    ar: { name: "محول HTML إلى نص مجرد", desc: "قم بإزالة جميع الأكواد والوسوم البرمجية من HTML واستخرج النص فقط." },
    en: { name: "HTML to Text Converter", desc: "Strip all HTML tags and tags attributes to extract clean plain text." }
  },
  50: {
    ar: { name: "مستعرض ملفات CSV", desc: "افتح، تصفح، ونظّم ملفات CSV الكبيرة مباشرة في متصفحك." },
    en: { name: "CSV Viewer", desc: "Open, read, and preview spreadsheet CSV files directly in your browser." }
  },

  // Health
  51: {
    ar: { name: "حاسبة كتلة الجسم (BMI)", desc: "احسب مؤشر كتلة جسمك وتعرف على حالة وزنك الصحية." },
    en: { name: "BMI Calculator", desc: "Calculate your Body Mass Index (BMI) and evaluate your weight status." }
  },
  52: {
    ar: { name: "حاسبة السعرات BMR/TDEE", desc: "احسب معدل الأيض الأساسي والسعرات اليومية التي يحتاجها جسمك." },
    en: { name: "BMR & TDEE Calculator", desc: "Calculate your Basal Metabolic Rate and Total Daily Energy Expenditure." }
  },
  53: {
    ar: { name: "حاسبة نسبة الدهون", desc: "قدر نسبة الدهون التقريبية في جسمك بناءً على مقاييس علمية مخصصة." },
    en: { name: "Body Fat Calculator", desc: "Estimate your body fat percentage using standard scientific formulas." }
  },
  54: {
    ar: { name: "حاسبة الاحتياج اليومي للماء", desc: "احسب كمية المياه المثالية التي يجب عليك شربها يومياً بناءً على وزنك." },
    en: { name: "Water Intake Calculator", desc: "Calculate the ideal daily amount of water your body needs." }
  },
  55: {
    ar: { name: "حاسبة موعد الولادة المتوقع", desc: "احسبي موعد الولادة المتوقع وتتبع مراحل الحمل بالأسابيع." },
    en: { name: "Pregnancy Due Date Calculator", desc: "Calculate estimated delivery date and track pregnancy stages." }
  },
  56: {
    ar: { name: "حاسبة التبويض", desc: "احسبي أيام التبويض المتوقعة وفترات الخصوبة العالية لديكِ." },
    en: { name: "Ovulation Calculator", desc: "Calculate your most fertile days and estimated ovulation windows." }
  },
  57: {
    ar: { name: "حاسبة المغذيات الكبرى (Macros)", desc: "وزّع السعرات اليومية على البروتينات والنشويات والدهون حسب هدفك." },
    en: { name: "Macros Calculator", desc: "Calculate custom daily macronutrients split based on fitness goals." }
  },
  58: {
    ar: { name: "محول الأوزان والكتل", desc: "حول بسهولة بين الكيلوجرام، الباوند، الأونصة، والجرامات." },
    en: { name: "Weight Converter", desc: "Convert weight units seamlessly between kg, lbs, oz, and grams." }
  },
  59: {
    ar: { name: "محول الأطوال والارتفاعات", desc: "حول قياسات الطول بين السنتيمتر، المتر، القدم، والإنش." },
    en: { name: "Height Converter", desc: "Convert heights and lengths between cm, meters, feet, and inches." }
  },
  60: {
    ar: { name: "حاسبة سرعة الجري (Pace)", desc: "احسب سرعتك المناسبة والوقت اللازم لقطع المسافات الرياضية." },
    en: { name: "Pace Calculator", desc: "Calculate your running pace, time, and distance targets." }
  },

  // Time
  61: {
    ar: { name: "مؤقت بومودورو (الطماطم)", desc: "نظم وقت عملك ودراستك باستخدام تقنية التركيز والراحة الشهيرة." },
    en: { name: "Pomodoro Timer", desc: "Boost your productivity with the standard focus/break interval cycle." }
  },
  62: {
    ar: { name: "ساعة إيقاف (Stopwatch)", desc: "ساعة إيقاف بسيطة ودقيقة لحساب الوقت والإنتاجية وجولات التمرين." },
    en: { name: "Stopwatch", desc: "A simple and accurate stopwatch to record lap times and activities." }
  },
  63: {
    ar: { name: "محول المناطق الزمنية", desc: "قارن وحول الأوقات والتواريخ بين المدن والمناطق الزمنية المختلفة." },
    en: { name: "Timezone Converter", desc: "Compare and convert times across different world time zones." }
  },
  64: {
    ar: { name: "حاسبة العمر الدقيق", desc: "احسب عمرك الفعلي بالسنوات والشهور والأيام والدقائق بدقة تامة." },
    en: { name: "Exact Age Calculator", desc: "Calculate your exact age down to the years, months, and days." }
  },
  65: {
    ar: { name: "حاسبة أيام العمل", desc: "احسب عدد أيام العمل الفعلية المستبعد منها عطلات نهاية الأسبوع." },
    en: { name: "Working Days Calculator", desc: "Calculate the exact number of business days between two dates." }
  },
  66: {
    ar: { name: "مؤقت العد التنازلي", desc: "أنشئ مؤقتاً مخصصاً للعد التنازلي للمناسبات والأحداث الهامة." },
    en: { name: "Countdown Timer", desc: "Create a custom countdown timer for any upcoming event." }
  },
  67: {
    ar: { name: "محول التاريخ (هجري/ميلادي)", desc: "حول التواريخ والسنوات بسهولة ودقة بين التقويم الهجري والميلادي." },
    en: { name: "Date Converter", desc: "Convert dates accurately between Gregorian and Hijri calendars." }
  },
  68: {
    ar: { name: "حاسبة المدة الزمنية", desc: "احسب الفرق الإجمالي بالدقائق والساعات بين وقتين مختلفين." },
    en: { name: "Time Duration Calculator", desc: "Calculate exact time difference, hours, and minutes between times." }
  },
  69: {
    ar: { name: "مولد الجدول الأسبوعي", desc: "صمم جدول مهامك الأسبوعي بشكل منظم وجذاب للتحميل والطباعة." },
    en: { name: "Weekly Schedule Generator", desc: "Generate beautifully structured weekly schedule templates." }
  },
  70: {
    ar: { name: "قائمة المهام اليومية", desc: "أداة تفاعلية وبسيطة لتدوين وإدارة مهامك اليومية وتنظيمها." },
    en: { name: "Todo List", desc: "Keep track of your tasks and stay organized with a simple checklist." }
  },

  // SEO
  71: {
    ar: { name: "مولد وسوم الميتا (Meta Tags)", desc: "أنشئ وسوم الميتا والأرشفة الاحترافية لتهيئة موقعك لمحركات البحث." },
    en: { name: "Meta Tags Generator", desc: "Generate professional SEO meta tags to index your website." }
  },
  72: {
    ar: { name: "معاينة نتائج جوجل (SERP)", desc: "شاهد كيف ستظهر صفحة موقعك في نتائج بحث جوجل على الهواتف والكمبيوتر." },
    en: { name: "SERP Preview Tool", desc: "Preview how your page looks in Google search result listings." }
  },
  73: {
    ar: { name: "منشئ ملف Robots.txt", desc: "أنشئ ملف Robots.txt مخصصاً لتوجيه برمجيات الزحف والأرشفة التابعة لجوجل." },
    en: { name: "Robots.txt Maker", desc: "Generate clean Robots.txt files to manage search engine crawlers." }
  },
  74: {
    ar: { name: "مولد خريطة الموقع XML", desc: "أنشئ خريطة موقع (Sitemap) متكاملة لمساعدة محركات البحث في فهرسة صفحاتك." },
    en: { name: "XML Sitemap Generator", desc: "Generate XML sitemaps to index your page structures efficiently." }
  },
  75: {
    ar: { name: "فاحص الكلمات الدلالية المكررة", desc: "ابحث عن الكلمات المفتاحية المكررة في قوائم السيو لتصفيتها وتنظيفها." },
    en: { name: "Keyword Duplicate Checker", desc: "Find and remove duplicate keywords in your SEO targeting lists." }
  },
  76: {
    ar: { name: "رابط واتساب مباشر", desc: "أنشئ روابط دردشة واتساب مباشرة مخصصة مع رسائل مكتوبة مسبقاً." },
    en: { name: "WhatsApp Link Generator", desc: "Create direct click-to-chat WhatsApp links with custom text." }
  },
  77: {
    ar: { name: "مولد روابط Mailto", desc: "صمم روابط بريد إلكتروني تفاعلية مع تحديد العنوان، الموضوع، والرسالة." },
    en: { name: "Mailto Link Generator", desc: "Create responsive email mailto links with subject and body." }
  },
  78: {
    ar: { name: "منشئ روابط تتبع UTM", desc: "أنشئ روابط تتبع الحملات الإعلانية في جوجل أناليتكس بكل سهولة." },
    en: { name: "UTM URL Builder", desc: "Build Google Analytics campaign URLs with UTM parameters easily." }
  },
  79: {
    ar: { name: "منظف معلمات UTM", desc: "قم بإزالة جميع معلمات تتبع الحملات UTM من الروابط للحصول على رابط نظيف." },
    en: { name: "UTM Parameter Cleaner", desc: "Strip all UTM parameters from shared web links to make them clean." }
  },
  80: {
    ar: { name: "مستخرج الكلمات المفتاحية", desc: "حلل النص واستخرج أهم الكلمات الدلالية والأكثر تكراراً لتحسين السيو." },
    en: { name: "Keyword Extractor", desc: "Extract dominant keywords and SEO-relevant phrases from text blocks." }
  },

  // Math & Science
  81: {
    ar: { name: "الحاسبة العلمية المتطورة", desc: "حاسبة متقدمة تتيح لك إجراء المعادلات الرياضية والعمليات العلمية المعقدة." },
    en: { name: "Scientific Calculator", desc: "Solve complex algebraic equations and standard scientific functions." }
  },
  82: {
    ar: { name: "حاسبة النسب المئوية", desc: "احسب الزيادة، النقصان، والنسب المئوية المختلفة للقيم والأرقام بسهولة." },
    en: { name: "Percentage Calculator", desc: "Calculate discounts, percentage differences, and ratios easily." }
  },
  83: {
    ar: { name: "محول الوحدات الشامل", desc: "حول بسلاسة بين مختلف المقاييس (المساحة، الطول، درجة الحرارة، السرعة)." },
    en: { name: "Unit Converter", desc: "Convert standard units for speed, length, area, mass, and temperature." }
  },
  84: {
    ar: { name: "حاسبة المساحات", desc: "احسب المساحة الدقيقة لمختلف الأشكال الهندسية (المربع، المثلث، الدائرة)." },
    en: { name: "Area Calculator", desc: "Calculate the geometric area of circles, triangles, and rectangles." }
  },
  85: {
    ar: { name: "حاسبة الأحجام", desc: "احسب السعة الحجمية للمكعبات، الاسطوانات، والكرات وغيرها بسهولة." },
    en: { name: "Volume Calculator", desc: "Calculate volume for standard three-dimensional shapes instantly." }
  },
  86: {
    ar: { name: "تبسيط الكسور الرياضية", desc: "قم بتبسيط واختزال الكسور الرياضية المعقدة إلى أبسط صورة ممكنة." },
    en: { name: "Fraction Simplifier", desc: "Simplify proper and improper fractions to their lowest terms." }
  },
  87: {
    ar: { name: "محلل المعادلات التربيعية", desc: "حل المعادلات الرياضية من الدرجة الثانية واحسب قيم جذورها فورياً." },
    en: { name: "Quadratic Equation Solver", desc: "Find roots for any standard quadratic equation instantly." }
  },
  88: {
    ar: { name: "مولد جداول الضرب", desc: "أنشئ واطبع جداول الضرب المخصصة لمساعدة الطلاب في التعليم والتدريب." },
    en: { name: "Times Table Generator", desc: "Generate custom, interactive multiplication tables." }
  },
  89: {
    ar: { name: "محول سرعات الرياح والحركة", desc: "حول مقادير السرعة بين الكيلومتر، الميل، العقدة، والمتر بالثانية." },
    en: { name: "Speed Converter", desc: "Convert speeds between km/h, mph, knots, and m/s easily." }
  },
  90: {
    ar: { name: "حاسبة استهلاك الوقود", desc: "احسب تكلفة الرحلة واستهلاك الوقود الإجمالي لسيارتك بكل دقة." },
    en: { name: "Fuel Calculator", desc: "Estimate total fuel consumption, cost, and efficiency for trips." }
  },

  // Entertainment
  91: {
    ar: { name: "عجلة الحظ الدوارة", desc: "عجلة حظ تفاعلية وقابلة للتخصيص بالكامل لمساعدتك في اتخاذ القرارات العشوائية." },
    en: { name: "Spin the Wheel", desc: "Create a fully customizable interactive spinning wheel for choices." }
  },
  92: {
    ar: { name: "رمي النرد الافتراضي", desc: "ارمِ النرد والعب ألعابك المفضلة افتراضياً بنقرة زر تفاعلية." },
    en: { name: "Dice Roller", desc: "Roll virtual six-sided dice with dynamic random outcomes." }
  },
  93: {
    ar: { name: "رمي العملة المعدنية", desc: "اتخذ قرارك بسرعة عن طريق رمي عملة معدنية افتراضية (طرة أو نقش)." },
    en: { name: "Coin Flipper", desc: "Flip a virtual coin to decide choices (Heads or Tails)." }
  },
  94: {
    ar: { name: "حاسبة نسبة الحب والتوافق", desc: "لعبة ترفيهية مسلية لحساب نسبة التوافق المفترضة بين اسمين." },
    en: { name: "Love Calculator", desc: "A fun and entertaining game to test name compatibility scores." }
  },
  95: {
    ar: { name: "مولد الأسماء العشوائية", desc: "أنشئ أسماء وشخصيات عشوائية مخصصة لمختلف الاستخدامات والألعاب." },
    en: { name: "Random Name Generator", desc: "Generate random names and characters with customized themes." }
  },
  96: {
    ar: { name: "زخرفة وتزيين النصوص", desc: "حول النصوص العادية إلى خطوط مزخرفة وجميلة جاهزة للنسخ والنشر." },
    en: { name: "Fancy Text Generator", desc: "Convert standard text to unique, stylish, and fancy fonts." }
  },
  97: {
    ar: { name: "صانع الميمز (Memes) البسيط", desc: "اصنع صوراً مضحكة وميمز خاصة بك بسهولة عن طريق الكتابة على الصور." },
    en: { name: "Simple Meme Maker", desc: "Create customized funny memes by adding custom text on images." }
  },
  98: {
    ar: { name: "مولد الاقتباسات العشوائي", desc: "احصل على حكم ومقولات مأثورة واقتباسات ملهمة ومتنوعة." },
    en: { name: "Random Quote Generator", desc: "Generate inspiring, funny, or wise quotes instantly." }
  },
  99: {
    ar: { name: "تحويل النص إلى إيموجي", desc: "لعبة مسلية لتحويل الكلمات والعبارات المكتوبة إلى رموز تعبيرية (Emojis)." },
    en: { name: "Text to Emoji Converter", desc: "Translate keywords and terms into funny matching emojis." }
  },
  100: {
    ar: { name: "تحويل النص إلى كلام مسموع", desc: "اكتب النصوص ودع متصفحك يقرأها بصوت مسموع مع تحديد اللغة والسرعة." },
    en: { name: "Text to Speech (TTS)", desc: "Type text and let your browser read it aloud in various voices." }
  }
};
