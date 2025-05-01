// Animations JavaScript File

// Initialize particles.js
document.addEventListener("DOMContentLoaded", () => {
    // Check if particlesJS is defined
    if (typeof particlesJS !== "undefined" && document.getElementById("particles-js")) {
      particlesJS("particles-js", {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: ["#22d3ee", "#a855f7", "#ffffff"],
          },
          shape: {
            type: ["circle", "triangle", "polygon"],
            stroke: {
              width: 0,
              color: "#000000",
            },
            polygon: {
              nb_sides: 5,
            },
          },
          opacity: {
            value: 0.5,
            random: true,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#22d3ee",
            opacity: 0.3,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "repulse",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
      })
    }
  
    // Rotating taglines
    const taglines = ["Innovate", "Build", "Research"]
    const rotatingText = document.querySelector(".rotating-text")
    let taglineIndex = 0
  
    if (rotatingText) {
      rotatingText.textContent = taglines[0]
      rotatingText.style.opacity = 1
  
      setInterval(() => {
        // Fade out
        rotatingText.style.opacity = 0
  
        setTimeout(() => {
          // Change text and fade in
          taglineIndex = (taglineIndex + 1) % taglines.length
          rotatingText.textContent = taglines[taglineIndex]
          rotatingText.style.opacity = 1
        }, 500)
      }, 3000)
    }
  
    // Add to cart animation
    function createFlyingElement(startX, startY, endX, endY) {
      const flyingItem = document.createElement("div")
      flyingItem.className = "flying-item"
      flyingItem.innerHTML = '<i class="fas fa-shopping-cart"></i>'
  
      flyingItem.style.left = `${startX}px`
      flyingItem.style.top = `${startY}px`
  
      document.getElementById("cart-animation-container").appendChild(flyingItem)
  
      // Trigger reflow
      flyingItem.offsetWidth
  
      // Animate to cart
      flyingItem.style.left = `${endX}px`
      flyingItem.style.top = `${endY}px`
      flyingItem.style.opacity = "0"
      flyingItem.style.transform = "scale(0.3)"
  
      // Remove after animation completes
      setTimeout(() => {
        flyingItem.remove()
      }, 800)
    }
  
    // Expose the function globally
    window.createFlyingElement = createFlyingElement
  
    // Scroll indicator animation
    const scrollIndicator = document.querySelector(".scroll-indicator")
    if (scrollIndicator) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          scrollIndicator.style.opacity = "0"
        } else {
          scrollIndicator.style.opacity = "1"
        }
      })
    }
  })
  