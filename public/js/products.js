const products = [
  { id: "apple-watch-se", brand: "Samsung", title: "Apple Watch SE (GPS) 40mm Space Grey Aluminum Case", price: 32, oldPrice: 45, image: "public/images/products/watch.png", reviews: "3,014" },
  { id: "iphone-11", brand: "SONY", title: "Apple iPhone 11 64GB Smartphone - Black", price: 32, oldPrice: 45, image: "public/images/products/phone.png", reviews: "3,014" },
  { id: "irobot-roomba", brand: "SONY", title: "iRobot Roomba i3+ EVO Wi-Fi Connected Self-Empty Robot", price: 399, oldPrice: 499, image: "public/images/products/iRobot.png", reviews: "3,014" },
  { id: "dyson-v7", brand: "EASTSPORT", title: "Dyson V7 Complete Cordless Stick Vacuum - Iron/Blue", price: 32, oldPrice: 45, image: "public/images/products/dyson.png", reviews: "3,014" },
  { id: "samsung-tv-58", brand: "SAMSUNG", title: 'Samsung 58" 4K UHD HDR LED Tizen Smart TV', price: 32.5, oldPrice: 45, image: "public/images/products/samsung_tv.png", reviews: "3,014" },
  { id: "tcl-tv-40", brand: "TCL", title: 'TCL 3-Series 40" 1080p HD LED Android Smart TV', price: 32.5, oldPrice: 45, image: "public/images/products/tcl.png", reviews: "3,014" },
  { id: "lg-tv-65", brand: "LG", title: 'LG 65" 4K UHD HDR LED webOS Smart TV', price: 32.5, oldPrice: 45, image: "public/images/products/LG-UHD.png", reviews: "3,014" },
  { id: "lg-oled-55", brand: "LG", title: 'LG 55" 4K UHD HDR OLED webOS Smart TV', price: 32.5, oldPrice: 45, image: "public/images/products/LG-OLED.png", reviews: "3,014" },
  { id: "sony-tv-x85j", brand: "SONY", title: 'Sony X85J 65" 4K UHD HDR LED Smart Google TV', price: 32.5, oldPrice: 45, image: "public/images/products/SONY-TV.png", reviews: "3,014" },
  { id: "sony-notebook", brand: "SAMSUNG", title: "Samsung Notebook with 4K HDR Display", price: 32.5, oldPrice: 45, image: "public/images/products/sony_notebook.png", reviews: "3,014" },
  { id: "sony-playstation-5", brand: "SONY", title: "Sony PlayStation 5 Video Game Console", price: 32.5, oldPrice: 45, image: "public/images/products/sony_playstation.png", reviews: "3,014" },
  { id: "apple-watch-series-3", brand: "EASTSPORT", title: "Apple Watch Series 3 GPS Space Gray - 38mm - Black", price: 32.5, oldPrice: 45, image: "public/images/products/apple_watch.png", reviews: "3,014" },
  { id: "canon-rebel-t100", brand: "EASTSPORT", title: "Canon EOS Rebel T100 Digital SLR Camera", price: 32.5, oldPrice: 45, image: "public/images/products/canon_camera.png", reviews: "3,014" },
  {
    id: "macbook-pro-16",
    brand: "Apple",
    title: 'Apple MacBook Pro 16" (2021) - Space Grey (Apple M1 Pro Chip / 1TB SSD / 16GB RAM)',
    price: 3399,
    oldPrice: 1419.92,
    image: "public/images/products/macbook_16.png",
    sku: "MBP16-M1P-1TB-SG",
    reviews: "128",
    specs: [
      ["Brand", "Apple"],
      ["Model Name", "MacBook Pro"],
      ["Screen Size", "16.2 Inches"],
      ["Color", "Space Gray"],
      ["Storage", "1 TB SSD"],
      ["Processor", "Apple M1 Pro"],
      ["Memory", "16 GB"]
    ]
  },
  { id: "asus-vivobook", brand: "ASUS", title: "ASUS VivoBook Laptop", price: 899, oldPrice: 999, image: "public/images/products/asus_laptop.png", reviews: "84" },
  { id: "acer-aspire", brand: "Acer", title: "Acer Aspire Laptop", price: 749, oldPrice: 849, image: "public/images/products/acer_laptop.png", reviews: "62" },
  { id: "acer-silver", brand: "Acer", title: "Acer Laptop - Silver", price: 699, oldPrice: 799, image: "public/images/products/acer_silver.png", reviews: "47" },
  { id: "sony-laptop", brand: "Sony", title: "Sony Laptop", price: 1099, oldPrice: 1199, image: "public/images/products/sony_laptop.png", reviews: "39" },
  { id: "acer-nitro", brand: "Acer", title: "Acer Nitro Gaming Laptop", price: 1199, oldPrice: 1299, image: "public/images/products/nitro_laptop.png", reviews: "91" },
  { id: "rog-laptop", brand: "ASUS ROG", title: "ASUS ROG Gaming Laptop", price: 1499, oldPrice: 1699, image: "public/images/products/rolex_laptop.png", reviews: "73" }
];

window.ZENMART_PRODUCTS = products.map((product) => ({
  ...product,
  images: product.images || [product.image],
  specs: product.specs || [
    ["Brand", product.brand],
    ["Model Name", product.title],
    ["Price", `$${product.price.toLocaleString("en-US", { maximumFractionDigits: 2 })}`]
  ]
}));
