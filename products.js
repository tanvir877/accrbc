// Products JavaScript File

// Sample product data
const productData = [
    {
      id: 1,
      name: "Arduino Mega 2560",
      category: "Arduino",
      price: 39.99,
      image: "https://via.placeholder.com/300x200/22d3ee/000000?text=Arduino+Mega",
      description: "Powerful microcontroller board with 54 digital I/O pins and 16 analog inputs.",
      details: [
        "ATmega2560 microcontroller",
        "54 digital I/O pins",
        "16 analog inputs",
        "256KB flash memory",
        "USB connectivity",
      ],
    },
    {
      id: 2,
      name: "Ultrasonic Distance Sensor",
      category: "Sensors",
      price: 4.99,
      image: "https://via.placeholder.com/300x200/22d3ee/000000?text=Ultrasonic+Sensor",
      description: "HC-SR04 ultrasonic sensor for distance measurement with 4m range.",
      details: [
        "Range: 2cm - 400cm",
        "Accuracy: 3mm",
        "Operating voltage: 5V",
        "Measuring angle: 15 degrees",
        "Trigger input signal: 10μs TTL pulse",
      ],
    },
    {
      id: 3,
      name: "Servo Motor MG996R",
      category: "Actuators",
      price: 12.99,
      image: "https://via.placeholder.com/300x200/22d3ee/000000?text=Servo+Motor",
      description: "High torque metal gear servo motor with 10kg/cm torque at 4.8V.",
      details: [
        "Torque: 10kg/cm (4.8V)",
        "Speed: 0.17sec/60° (4.8V)",
        "Weight: 55g",
        "Dimensions: 40.7×19.7×42.9mm",
        "Metal gears for durability",
      ],
    },
    {
      id: 4,
      name: "Raspberry Pi 4 Model B",
      category: "Arduino",
      price: 59.99,
      image: "https://via.placeholder.com/300x200/22d3ee/000000?text=Raspberry+Pi+4",
      description: "Quad-core ARM Cortex-A72 processor with 4GB RAM and wireless connectivity.",
      details: [
        "Broadcom BCM2711 SoC",
        "Quad-core Cortex-A72 @ 1.5GHz",
        "4GB LPDDR4 RAM",
        "Dual 4K display support",
        "Gigabit Ethernet, WiFi, Bluetooth",
      ],
    },
    {
      id: 5,
      name: "Temperature & Humidity Sensor",
      category: "Sensors",
      price: 3.99,
      image: "https://via.placeholder.com/300x200/22d3ee/000000?text=DHT22+Sensor",
      description: "DHT22 digital sensor for accurate temperature and humidity readings.",
      details: [
        "Temperature range: -40°C to 80°C",
        "Humidity range: 0-100% RH",
        "Accuracy: ±0.5°C, ±2% RH",
        "Resolution: 0.1°C, 0.1% RH",
        "Operating voltage: 3.3V-5V",
      ],
    },
    {
      id: 6,
      name: "DC Geared Motor",
      category: "Actuators",
      price: 8.99,
      image: "https://via.placeholder.com/300x200/22d3ee/000000?text=DC+Motor",
      description: "12V DC motor with metal gearbox, 200RPM output speed.",
      details: [
        "Voltage: 12V DC",
        "No-load speed: 200RPM",
        "Stall torque: 1.2kg/cm",
        "Gear ratio: 1:48",
        "Shaft diameter: 6mm D-shaped",
      ],
    },
  ]
  
  // Cart data
  const cartItems = []
  let cartCount = 0
  
  document.addEventListener("DOMContentLoaded", () => {
    // Initialize product grid
    const productGrid = document.getElementById("product-grid")
    if (productGrid) {
      renderProducts(productData)
    }
  
    // Filter functionality
    const categoryFilter = document.getElementById("category-filter")
    const priceFilter = document.getElementById("price-filter")
  
    if (categoryFilter && priceFilter) {
      categoryFilter.addEventListener("change", applyFilters)
      priceFilter.addEventListener("change", applyFilters)
    }
  
    // Update cart count display
    updateCartCount()
  })
  
  // Render products to the grid
  function renderProducts(products) {
    const productGrid = document.getElementById("product-grid")
    productGrid.innerHTML = ""
  
    if (products.length === 0) {
      productGrid.innerHTML = '<p class="no-products">No products match your filters.</p>'
      document.getElementById("product-count").textContent = "0"
      return
    }
  
    document.getElementById("product-count").textContent = products.length
  
    products.forEach((product) => {
      const productCard = document.createElement("div")
      productCard.className = "product-card"
      productCard.setAttribute("data-aos", "fade-up")
  
      productCard.innerHTML = `
              <div class="product-card-inner">
                  <div class="product-card-front">
                      <div class="product-image-container">
                          <img src="${product.image}" alt="${product.name}" class="product-image">
                          <span class="product-category">${product.category}</span>
                      </div>
                      <div class="product-content">
                          <h3 class="product-title">${product.name}</h3>
                          <p class="product-description">${product.description}</p>
                          <div class="product-footer">
                              <span class="product-price">$${product.price.toFixed(2)}</span>
                              <button class="add-to-cart" data-id="${product.id}">
                                  <i class="fas fa-shopping-cart"></i> Add to Cart
                              </button>
                          </div>
                      </div>
                  </div>
                  <div class="product-card-back">
                      <h3 class="product-title">${product.name}</h3>
                      <div class="product-details">
                          <h4>Specifications:</h4>
                          <ul>
                              ${product.details.map((detail) => `<li>${detail}</li>`).join("")}
                          </ul>
                      </div>
                      <div class="product-footer">
                          <span class="product-price">$${product.price.toFixed(2)}</span>
                          <button class="add-to-cart" data-id="${product.id}">
                              <i class="fas fa-shopping-cart"></i> Add to Cart
                          </button>
                      </div>
                  </div>
              </div>
          `
  
      productGrid.appendChild(productCard)
    })
  
    // Add event listeners to "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll(".add-to-cart")
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        const productId = Number.parseInt(this.getAttribute("data-id"))
        addToCart(productId, this)
      })
    })
  
    // Re-initialize VanillaTilt
    VanillaTilt.init(document.querySelectorAll(".product-card"), {
      max: 10,
      speed: 400,
      glare: true,
      "max-glare": 0.3,
      scale: 1.05,
    })
  }
  
  // Apply filters to products
  function applyFilters() {
    const categoryValue = document.getElementById("category-filter").value
    const priceValue = document.getElementById("price-filter").value
  
    let filteredProducts = [...productData]
  
    // Apply category filter
    if (categoryValue !== "all") {
      filteredProducts = filteredProducts.filter((product) => product.category === categoryValue)
    }
  
    // Apply price filter
    if (priceValue !== "all") {
      switch (priceValue) {
        case "under10":
          filteredProducts = filteredProducts.filter((product) => product.price < 10)
          break
        case "10to50":
          filteredProducts = filteredProducts.filter((product) => product.price >= 10 && product.price <= 50)
          break
        case "over50":
          filteredProducts = filteredProducts.filter((product) => product.price > 50)
          break
      }
    }
  
    renderProducts(filteredProducts)
  }
  
  // Add product to cart
  function addToCart(productId, buttonElement) {
    const product = productData.find((p) => p.id === productId)
    if (!product) return
  
    // Add animation to button
    buttonElement.classList.add("animate")
    setTimeout(() => {
      buttonElement.classList.remove("animate")
    }, 300)
  
    // Get button position for animation start
    const buttonRect = buttonElement.getBoundingClientRect()
    const buttonX = buttonRect.left + buttonRect.width / 2
    const buttonY = buttonRect.top + buttonRect.height / 2
  
    // Get cart icon position for animation end
    const cartIcon = document.querySelector(".cart-icon")
    const cartRect = cartIcon.getBoundingClientRect()
    const cartX = cartRect.left + cartRect.width / 2
    const cartY = cartRect.top + cartRect.height / 2
  
    // Create and animate flying element
    createFlyingElement(buttonX, buttonY, cartX, cartY)
  
    // Add item to cart
    const existingItem = cartItems.find((item) => item.id === productId)
  
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cartItems.push({
        ...product,
        quantity: 1,
      })
    }
  
    // Update cart count and display
    cartCount++
    updateCartCount()
    updateCartDisplay()
  
    // Shake cart icon
    cartIcon.classList.add("shake")
    setTimeout(() => {
      cartIcon.classList.remove("shake")
    }, 500)
  }
  
  // Update cart count display
  function updateCartCount() {
    const cartCountElement = document.querySelector(".cart-count")
    if (cartCountElement) {
      cartCountElement.textContent = cartCount
    }
  }
  
  // Update cart display
  function updateCartDisplay() {
    const cartItemsContainer = document.querySelector(".cart-items")
    const totalPriceElement = document.querySelector(".total-price")
  
    if (!cartItemsContainer) return
  
    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>'
      totalPriceElement.textContent = "$0.00"
      return
    }
  
    let totalPrice = 0
    cartItemsContainer.innerHTML = ""
  
    cartItems.forEach((item) => {
      const itemTotal = item.price * item.quantity
      totalPrice += itemTotal
  
      const cartItemElement = document.createElement("div")
      cartItemElement.className = "cart-item"
      cartItemElement.innerHTML = `
              <div class="cart-item-image">
                  <img src="${item.image}" alt="${item.name}">
              </div>
              <div class="cart-item-content">
                  <h4 class="cart-item-title">${item.name}</h4>
                  <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                  <div class="cart-item-actions">
                      <div class="cart-item-quantity">
                          <button class="quantity-btn minus" data-id="${item.id}">-</button>
                          <span class="quantity-value">${item.quantity}</span>
                          <button class="quantity-btn plus" data-id="${item.id}">+</button>
                      </div>
                      <button class="remove-item" data-id="${item.id}">Remove</button>
                  </div>
              </div>
          `
  
      cartItemsContainer.appendChild(cartItemElement)
    })
  
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`
  
    // Add event listeners to cart item buttons
    const minusButtons = document.querySelectorAll(".quantity-btn.minus")
    const plusButtons = document.querySelectorAll(".quantity-btn.plus")
    const removeButtons = document.querySelectorAll(".remove-item")
  
    minusButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const id = Number.parseInt(this.getAttribute("data-id"))
        updateItemQuantity(id, -1)
      })
    })
  
    plusButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const id = Number.parseInt(this.getAttribute("data-id"))
        updateItemQuantity(id, 1)
      })
    })
  
    removeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const id = Number.parseInt(this.getAttribute("data-id"))
        removeCartItem(id)
      })
    })
  }
  
  // Update item quantity in cart
  function updateItemQuantity(id, change) {
    const item = cartItems.find((item) => item.id === id)
    if (!item) return
  
    item.quantity += change
  
    if (item.quantity <= 0) {
      removeCartItem(id)
      return
    }
  
    cartCount += change
    updateCartCount()
    updateCartDisplay()
  }
  
  // Remove item from cart
  function removeCartItem(id) {
    const itemIndex = cartItems.findIndex((item) => item.id === id)
    if (itemIndex === -1) return
  
    const removedItem = cartItems[itemIndex]
    cartCount -= removedItem.quantity
  
    cartItems.splice(itemIndex, 1)
    updateCartCount()
    updateCartDisplay()
  }

