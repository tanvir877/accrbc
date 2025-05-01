// Main JavaScript File

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
      duration: 800,
      easing: "ease",
      once: true,
      offset: 100,
    })
  
    // Set current year in footer
    document.getElementById("current-year").textContent = new Date().getFullYear()
  
    // Navbar scroll effect
    const navbar = document.querySelector(".navbar")
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    })
  
    // Mobile menu toggle
    const hamburger = document.querySelector(".hamburger")
    const mobileMenu = document.querySelector(".mobile-menu")
    const mobileMenuClose = document.querySelector(".mobile-menu-close")
    const body = document.body
  
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.add("active")
      hamburger.classList.add("active")
      body.style.overflow = "hidden"
    })
  
    mobileMenuClose.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      hamburger.classList.remove("active")
      body.style.overflow = ""
    })
  
    // Cart popup toggle
    const cartIcon = document.querySelector(".cart-icon")
    const cartPopup = document.querySelector(".cart-popup")
    const cartClose = document.querySelector(".cart-close")
    const cartOverlay = document.querySelector(".cart-overlay")
  
    cartIcon.addEventListener("click", () => {
      cartPopup.classList.add("active")
      cartOverlay.classList.add("active")
      body.style.overflow = "hidden"
    })
  
    cartClose.addEventListener("click", closeCart)
    cartOverlay.addEventListener("click", closeCart)
  
    function closeCart() {
      cartPopup.classList.remove("active")
      cartOverlay.classList.remove("active")
      body.style.overflow = ""
    }
  
    // Newsletter form submission
    const newsletterForm = document.getElementById("newsletter-form")
    const formMessage = document.getElementById("form-message")
  
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const email = document.getElementById("email").value
  
        if (!email || !email.includes("@")) {
          formMessage.className = "form-message error"
          formMessage.innerHTML = '<i class="fas fa-times-circle"></i> Please enter a valid email address.'
          return
        }
  
        // Simulate API call
        setTimeout(() => {
          formMessage.className = "form-message success"
          formMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for subscribing to our newsletter!'
          newsletterForm.reset()
  
          // Reset after 3 seconds
          setTimeout(() => {
            formMessage.innerHTML = ""
            formMessage.className = "form-message"
          }, 3000)
        }, 1000)
      })
    }
  
    // Initialize stats counter when in viewport
    const statsSection = document.querySelector(".stats")
    const statValues = document.querySelectorAll(".stat-value")
  
    if (statsSection && statValues.length) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startCounting()
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.3 },
      )
  
      observer.observe(statsSection)
    }
  
    function startCounting() {
      statValues.forEach((statValue) => {
        const target = Number.parseInt(statValue.getAttribute("data-target"))
        const duration = 2000 // 2 seconds
        const steps = 30
        const increment = Math.ceil(target / steps)
        let count = 0
  
        statValue.classList.add("counting")
  
        const interval = setInterval(() => {
          count = Math.min(count + increment, target)
          statValue.textContent = count.toLocaleString() + (count === 99 ? "%" : "+")
  
          if (count >= target) {
            clearInterval(interval)
            statValue.classList.remove("counting")
          }
        }, duration / steps)
      })
    }
  
    // Initialize VanillaTilt for product cards
    const productCards = document.querySelectorAll(".product-card")
    if (productCards.length) {
      try {
        VanillaTilt.init(productCards, {
          max: 10,
          speed: 400,
          glare: true,
          "max-glare": 0.3,
          scale: 1.05,
        })
      } catch (error) {
        console.error("VanillaTilt is not defined. Make sure to include the library.")
      }
    }
  })
  