import {
  Calculator, Code, Type, Image as ImageIcon, Database, HeartPulse, Clock,
  Search, Calculator as MathIcon, Gamepad2, FileJson, Lock, Link,
  FileText, Scissors, Droplets, Calendar, BarChart2, SplitSquareHorizontal,
  Wallet, Sparkles, Hash, QrCode, Key, Percent, FileDigit
} from 'lucide-react';

export const categories = [
  "All Tools", "Finance", "Developer", "Text", "Images/Design", "Data",
  "Health", "Time", "SEO", "Math & Science", "Entertainment"
];

export const toolsData = [
  // Finance
  { id: 1, name: "Compound Interest Calculator", category: "Finance", desc: "Calculate compound interest over time", icon: Calculator },
  { id: 2, name: "Auto Loan", category: "Finance", desc: "Calculate your auto loan payments", icon: Calculator },
  { id: 3, name: "Mortgage", category: "Finance", desc: "Calculate mortgage payments and interest", icon: Calculator },
  { id: 4, name: "Net Salary", category: "Finance", desc: "Calculate take-home pay after taxes", icon: Wallet },
  { id: 5, name: "Currency Converter", category: "Finance", desc: "Convert between various currencies", icon: Calculator },
  { id: 6, name: "VAT Calc", category: "Finance", desc: "Calculate Value Added Tax easily", icon: Calculator },
  { id: 7, name: "Inflation Calc", category: "Finance", desc: "Calculate inflation over time", icon: BarChart2 },
  { id: 8, name: "ROI Calc", category: "Finance", desc: "Calculate Return on Investment", icon: BarChart2 },
  { id: 9, name: "Bill Splitter", category: "Finance", desc: "Split bills among friends", icon: SplitSquareHorizontal },
  { id: 10, name: "FIRE Calculator", category: "Finance", desc: "Financial Independence, Retire Early calc", icon: Wallet },

  // Developer
  { id: 11, name: "JSON Formatter", category: "Developer", desc: "Format and beautify JSON code", icon: FileJson },
  { id: 12, name: "CSS Minifier", category: "Developer", desc: "Minify your CSS code", icon: Scissors },
  { id: 13, name: "JS Minifier", category: "Developer", desc: "Minify your JavaScript code", icon: Scissors },
  { id: 14, name: "Password Gen", category: "Developer", desc: "Generate strong passwords", icon: Key },
  { id: 15, name: "Password Strength", category: "Developer", desc: "Check password strength", icon: Lock },
  { id: 16, name: "HEX/RGB Converter", category: "Developer", desc: "Convert between HEX and RGB colors", icon: Droplets },
  { id: 17, name: "QR Code Gen", category: "Developer", desc: "Generate QR codes from text/URL", icon: QrCode },
  { id: 18, name: "Base64 Encode/Decode", category: "Developer", desc: "Encode or decode Base64 strings", icon: Code },
  { id: 19, name: "URL Encode/Decode", category: "Developer", desc: "Encode or decode URLs", icon: Link },
  { id: 20, name: "UUID Gen", category: "Developer", desc: "Generate random UUIDs", icon: Hash },

  // Text
  { id: 21, name: "Word/Char Counter", category: "Text", desc: "Count words and characters", icon: Type },
  { id: 22, name: "Case Converter", category: "Text", desc: "Convert text case", icon: Type },
  { id: 23, name: "Remove Extra Spaces", category: "Text", desc: "Clean up spacing in text", icon: Type },
  { id: 24, name: "Text Reverser", category: "Text", desc: "Reverse strings of text", icon: Type },
  { id: 25, name: "Lorem Ipsum", category: "Text", desc: "Generate dummy text", icon: FileText },
  { id: 26, name: "URL Extractor", category: "Text", desc: "Extract URLs from text", icon: Link },
  { id: 27, name: "Email Extractor", category: "Text", desc: "Extract emails from text", icon: Search },
  { id: 28, name: "Find & Replace", category: "Text", desc: "Find and replace text", icon: Search },
  { id: 29, name: "Text to Binary", category: "Text", desc: "Convert text to binary", icon: FileDigit },
  { id: 30, name: "List Deduplicator", category: "Text", desc: "Remove duplicates from lists", icon: Scissors },

  // Images/Design
  { id: 31, name: "Image Compressor", category: "Images/Design", desc: "Compress image sizes", icon: ImageIcon },
  { id: 32, name: "PNG to JPG", category: "Images/Design", desc: "Convert PNG to JPG", icon: ImageIcon },
  { id: 33, name: "WebP Converter", category: "Images/Design", desc: "Convert to WebP format", icon: ImageIcon },
  { id: 34, name: "Image Cropper", category: "Images/Design", desc: "Crop and resize images", icon: Scissors },
  { id: 35, name: "Color Picker", category: "Images/Design", desc: "Pick colors from a palette", icon: Droplets },
  { id: 36, name: "Favicon Gen", category: "Images/Design", desc: "Generate website favicons", icon: ImageIcon },
  { id: 37, name: "CSS Gradient Gen", category: "Images/Design", desc: "Create CSS gradients", icon: Droplets },
  { id: 38, name: "CSS Box Shadow Gen", category: "Images/Design", desc: "Generate box shadows", icon: Code },
  { id: 39, name: "Image Blur", category: "Images/Design", desc: "Apply blur to images", icon: ImageIcon },
  { id: 40, name: "Watermark Maker", category: "Images/Design", desc: "Add watermarks to images", icon: ImageIcon },

  // Data
  { id: 41, name: "CSV to JSON", category: "Data", desc: "Convert CSV to JSON", icon: Database },
  { id: 42, name: "JSON to XML", category: "Data", desc: "Convert JSON to XML", icon: Database },
  { id: 43, name: "XML to CSV", category: "Data", desc: "Convert XML to CSV", icon: Database },
  { id: 44, name: "Excel to HTML Table", category: "Data", desc: "Excel to HTML", icon: Code },
  { id: 45, name: "EXIF Reader", category: "Data", desc: "Read image EXIF data", icon: Search },
  { id: 46, name: "Text Analyzer", category: "Data", desc: "Analyze text data", icon: BarChart2 },
  { id: 47, name: "Markdown Gen", category: "Data", desc: "Generate Markdown", icon: Code },
  { id: 48, name: "MD to HTML", category: "Data", desc: "Markdown to HTML", icon: Code },
  { id: 49, name: "HTML to Text", category: "Data", desc: "HTML to plain text", icon: Code },
  { id: 50, name: "CSV Viewer", category: "Data", desc: "View CSV files online", icon: Database },

  // Health
  { id: 51, name: "BMI Calc", category: "Health", desc: "Calculate Body Mass Index", icon: HeartPulse },
  { id: 52, name: "BMR/TDEE", category: "Health", desc: "Calculate BMR and TDEE", icon: HeartPulse },
  { id: 53, name: "Body Fat Calc", category: "Health", desc: "Calculate body fat percentage", icon: Percent },
  { id: 54, name: "Water Intake", category: "Health", desc: "Calculate daily water needs", icon: Droplets },
  { id: 55, name: "Due Date Calc", category: "Health", desc: "Pregnancy due date calculator", icon: Calendar },
  { id: 56, name: "Ovulation Calc", category: "Health", desc: "Ovulation calculator", icon: Calendar },
  { id: 57, name: "Macros Calc", category: "Health", desc: "Calculate macronutrients", icon: HeartPulse },
  { id: 58, name: "Weight Converter", category: "Health", desc: "Convert weights", icon: Calculator },
  { id: 59, name: "Height Converter", category: "Health", desc: "Convert heights", icon: Calculator },
  { id: 60, name: "Pace Calc", category: "Health", desc: "Running pace calculator", icon: Clock },

  // Time
  { id: 61, name: "Pomodoro Timer", category: "Time", desc: "Focus timer technique", icon: Clock },
  { id: 62, name: "Stopwatch", category: "Time", desc: "Simple online stopwatch", icon: Clock },
  { id: 63, name: "Timezone Converter", category: "Time", desc: "Convert between timezones", icon: Clock },
  { id: 64, name: "Exact Age Calc", category: "Time", desc: "Calculate your exact age", icon: Calendar },
  { id: 65, name: "Working Days Calc", category: "Time", desc: "Calculate working days", icon: Calendar },
  { id: 66, name: "Countdown Timer", category: "Time", desc: "Create a countdown", icon: Clock },
  { id: 67, name: "Date Converter", category: "Time", desc: "Convert dates", icon: Calendar },
  { id: 68, name: "Time Duration Calc", category: "Time", desc: "Calculate time differences", icon: Clock },
  { id: 69, name: "Weekly Schedule Gen", category: "Time", desc: "Generate weekly schedules", icon: Calendar },
  { id: 70, name: "Todo List", category: "Time", desc: "Simple todo list app", icon: FileText },

  // SEO
  { id: 71, name: "Meta Tags Gen", category: "SEO", desc: "Generate HTML meta tags", icon: Search },
  { id: 72, name: "SERP Preview", category: "SEO", desc: "Google SERP preview tool", icon: Search },
  { id: 73, name: "Robots.txt Maker", category: "SEO", desc: "Generate robots.txt", icon: Code },
  { id: 74, name: "XML Sitemap Gen", category: "SEO", desc: "Generate XML sitemaps", icon: Code },
  { id: 75, name: "Keyword Duplicate Checker", category: "SEO", desc: "Find duplicate keywords", icon: Search },
  { id: 76, name: "WhatsApp Link Gen", category: "SEO", desc: "Generate WhatsApp chat links", icon: Link },
  { id: 77, name: "Mailto Gen", category: "SEO", desc: "Generate mailto links", icon: Link },
  { id: 78, name: "UTM Builder", category: "SEO", desc: "Build UTM tracking URLs", icon: Link },
  { id: 79, name: "UTM Cleaner", category: "SEO", desc: "Remove UTM parameters", icon: Scissors },
  { id: 80, name: "Keyword Extractor", category: "SEO", desc: "Extract keywords from text", icon: Search },

  // Math & Science
  { id: 81, name: "Scientific Calc", category: "Math & Science", desc: "Scientific calculator", icon: MathIcon },
  { id: 82, name: "Percentage Calc", category: "Math & Science", desc: "Calculate percentages easily", icon: Percent },
  { id: 83, name: "Unit Converter", category: "Math & Science", desc: "Convert standard units", icon: MathIcon },
  { id: 84, name: "Area Calc", category: "Math & Science", desc: "Calculate shapes area", icon: MathIcon },
  { id: 85, name: "Volume Calc", category: "Math & Science", desc: "Calculate volumes", icon: MathIcon },
  { id: 86, name: "Fraction Simplifier", category: "Math & Science", desc: "Simplify math fractions", icon: MathIcon },
  { id: 87, name: "Quadratic Equation", category: "Math & Science", desc: "Solve quadratic equations", icon: MathIcon },
  { id: 88, name: "Times Table Gen", category: "Math & Science", desc: "Generate multiplication tables", icon: MathIcon },
  { id: 89, name: "Speed Converter", category: "Math & Science", desc: "Convert speed units", icon: MathIcon },
  { id: 90, name: "Fuel Calc", category: "Math & Science", desc: "Calculate fuel consumption", icon: MathIcon },

  // Entertainment
  { id: 91, name: "Spin the Wheel", category: "Entertainment", desc: "Random decision wheel", icon: Gamepad2 },
  { id: 92, name: "Dice Roller", category: "Entertainment", desc: "Roll virtual dice", icon: Gamepad2 },
  { id: 93, name: "Coin Flipper", category: "Entertainment", desc: "Flip a virtual coin", icon: Gamepad2 },
  { id: 94, name: "Love Calc", category: "Entertainment", desc: "Fun love percentage calc", icon: HeartPulse },
  { id: 95, name: "Random Name Gen", category: "Entertainment", desc: "Generate random names", icon: Sparkles },
  { id: 96, name: "Fancy Text Gen", category: "Entertainment", desc: "Generate fancy styled text", icon: Type },
  { id: 97, name: "Meme Maker", category: "Entertainment", desc: "Create simple memes", icon: ImageIcon },
  { id: 98, name: "Random Quote Gen", category: "Entertainment", desc: "Get random quotes", icon: FileText },
  { id: 99, name: "Text to Emoji", category: "Entertainment", desc: "Convert words to emojis", icon: Type },
  { id: 100, name: "Text to Speech", category: "Entertainment", desc: "Speak typed text aloud", icon: Gamepad2 },
];
