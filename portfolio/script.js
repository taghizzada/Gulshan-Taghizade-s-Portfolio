// --- CUSTOM CURSOR LOGIC ---
const cursor = document.getElementById("custom-cursor");
// Include the new button in the selector
const interactiveElements = document.querySelectorAll(
  ".interactive-element, a, button, .project-card"
);

document.addEventListener("mousemove", (e) => {
  // Move cursor element with mouse
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

interactiveElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("cursor-ring");
  });
  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("cursor-ring");
  });
});

// --- CONTACT FORM SUBMISSION LOGIC ---

const form = document.getElementById("contactForm");
const formStatus = document.getElementById("form-status");
const submitButton = document.getElementById("submit-button");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Stop the default form submission

  const formAction = form.action;
  const data = new FormData(form);

  // Disable button and show loading state
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  formStatus.textContent = "";
  formStatus.classList.add("hidden");

  try {
    // Send data using fetch API
    const response = await fetch(formAction, {
      method: "POST",
      body: data,
      headers: {
        // Crucial for Formspree to handle the non-redirecting submission
        Accept: "application/json",
      },
    });

    if (response.ok) {
      // Success! Show message and clear form.
      formStatus.classList.remove("hidden", "bg-red-800", "text-white");
      formStatus.classList.add("bg-green-700", "text-white");
      formStatus.textContent =
        "Message sent successfully! I will get back to you soon.";
      form.reset(); // This resets the form fields
    } else {
      // Handle server errors or Formspree issues

      let errorText = "Oops! There was an issue submitting the form.";
      try {
        const errorData = await response.json();
        if (errorData.errors && errorData.errors.length > 0) {
          errorText = errorData.errors[0].message || errorText;
        }
      } catch (jsonError) {}

      formStatus.classList.remove("hidden", "bg-green-700", "text-white");
      formStatus.classList.add("bg-red-800", "text-white");
      formStatus.textContent = errorText;
    }
  } catch (error) {
    // Handle network errors (e.g., user offline)
    formStatus.classList.remove("hidden", "bg-green-700", "text-white");
    formStatus.classList.add("bg-red-800", "text-white");
    formStatus.textContent =
      "A network error occurred. Please check your connection.";
  } finally {
    // Re-enable button and reset text
    submitButton.disabled = false;
    submitButton.textContent = "Send Message";

    // Automatically hide success/error message after a few seconds
    setTimeout(() => {
      formStatus.classList.add("hidden");
    }, 7000);
  }
});

// --- PROJECT DATA AND PAGINATION SETUP ---
const projectData = [
  // 6 Main Websites (Priority Sites)
  {
    title: "Rosatte Coffeeshop",
    description: "Modern, dynamic coffeeshop site for a luxury brand.",
    tech: ["HTML5", "CSS3", "TWCSS", "JavaScript", "RWD"],
    role: "Front-End Developer",
    image: "assets/img/rosatte.png",
    link: "https://rosatte.netlify.app/",
  },
  {
    title: "Floressa Shop",
    description:
      "Minimalist flower shop focusing on clean aesthetics and fast load times.",
    tech: ["HTML5", "CSS3", "TWCSS", "JavaScript", "RWD"],
    role: "UI/UX Designer & Developer",
    image: "assets/img/floressa.png",
    link: "https://floressashop.netlify.app/",
  },
  {
    title: "Mosaica Restaurant",
    description: "Elegant, responsive website for a fine-dining establishment.",
    tech: ["HTML5", "CSS3", "TWCSS", "JavaScript", "RWD"],
    role: "Web Developer",
    image: "assets/img/mosaica.png",
    link: "https://mosaicarestaurant.netlify.app/",
  },
  {
    title: "Billie Eilish Concert Page",
    description: "Interactive landing page featuring tour dates and media.",
    tech: ["HTML5", "CSS3", "TWCSS", "JavaScript", "RWD"],
    role: "Creative Lead & Front-End",
    image: "assets/img/billieeilish.png",
    link: "https://billieeilishconcert.netlify.app/",
  },
  {
    title: "DIY Workshop Portal",
    description: "Booking and resource platform for creative workshops.",
    tech: ["HTML5", "CSS3", "TWCSS", "JavaScript", "RWD"],
    role: "Web Developer",
    image: "assets/img/diyworkshop.png",
    link: "https://diyworkshop.netlify.app/",
  },
  {
    title: "University Posts Blog",
    description:
      "Modular blog layout optimized for university news and articles.",
    tech: ["HTML5", "CSS3", "TWCSS", "JavaScript", "RWD"],
    role: "Front-End Developer",
    image: "assets/img/universityblog.png",
    link: "https://universitypostsblog.netlify.app/",
  },

  // 10 African School Websites
  {
    title: "Christ the King Primary",
    description: "Responsive primary school site in Africa.",
    tech: ["HTML5", "CSS3", "TWCSS", "JavaScript", "RWD"],
    role: "Front-End Developer",
    image: "assets/img/christtheking.png",
    link: "https://christthekinganglicanprimary.netlify.app/",
  },
  {
    title: "Church of Christ Primary",
    description: "Community outreach portal for a primary school.",
    tech: ["HTML5", "CSS3", "TWCSS", "JavaScript", "RWD"],
    role: "Front-End Developer",
    image: "assets/img/churchofchrist.png",
    link: "https://churchofchristprimary.netlify.app/",
  },
  {
    title: "Coastland Education Institute",
    description: "Site for an educational institute in a coastal region.",
    tech: ["HTML5", "CSS3", "TWCSS", "JavaScript", "RWD"],
    role: "Solo Front-End Developer",
    image: "assets/img/coastlandeducation.png",
    link: "https://coastlandeducationinstitute.netlify.app/",
  },
  {
    title: "Epworth Methodist Primary",
    description: "Official website for Epworth Methodist Primary School.",
    tech: ["HTML5", "CSS3", "TWCSS", "JavaScript", "RWD"],
    role: "Solo Front-End Developer",
    image: "assets/img/epworthmethodist.png",
    link: "https://epworthmethodistprimary.netlify.app/",
  },
  {
    title: "Fairview Primary",
    description: "Clean and accessible design for Fairview Primary School.",
    tech: ["HTML5", "CSS3", "TWCSS", "JavaScript", "RWD"],
    role: "Solo Front-End Developer",
    image: "assets/img/fairview.png",
    link: "https://fairviewprimary.netlify.app/",
  },
  {
    title: "Gulisi Community Primary",
    description: "Simple, effective site for Gulisi Community Primary.",
    tech: ["HTML5", "CSS3", "TWCSS", "JavaScript", "RWD"],
    role: "Solo Front-End Developer",
    image: "assets/img/gulisicommunity.png",
    link: "https://gulisicommunityprimary.netlify.app/",
  },
  {
    title: "Holy Angels Primary",
    description: "Digital presence for Holy Angels Primary School.",
    tech: ["HTML5", "CSS3", "TWCSS", "JavaScript", "RWD"],
    role: "Solo Front-End Developer",
    image: "assets/img/holyangels.png",
    link: "https://holyangelsprimary.netlify.app/",
  },
  {
    title: "Holy Family Primary",
    description: "Family-focused website design for Holy Family Primary.",
    tech: ["HTML5", "CSS3", "TWCSS", "JavaScript", "RWD"],
    role: "Solo Front-End Developer",
    image: "assets/img/holyfamily.png",
    link: "https://holyfamilyprimary.netlify.app/",
  },
  {
    title: "Holy Ghost Primary",
    description: "Curriculum and contact display for Holy Ghost Primary.",
    tech: ["HTML5", "CSS3", "TWCSS", "JavaScript", "RWD"],
    role: "Solo Front-End Developer",
    image: "assets/img/holyghost.png",
    link: "https://holyghostprimary.netlify.app/",
  },
  {
    title: "Hope Creek Methodist Primary",
    description: "Information site for Hope Creek Methodist Primary.",
    tech: ["HTML5", "CSS3", "TWCSS", "JavaScript", "RWD"],
    role: "Solo Front-End Developer",
    image: "assets/img/hopecreek.png",
    link: "https://hopecreekmethodistprimary.netlify.app/",
  },

  // 5 School Website Templates
  {
    title: "Northwood Academy Template",
    description: "Modular template for a large high school academy.",
    tech: ["HTML5", "CSS3", "TWCSS", "JavaScript", "RWD"],
    role: "Web Developer",
    image: "assets/img/northwood.png",
    link: "https://northwoodacademy.netlify.app/",
  },
  {
    title: "Oakwood Hub Template",
    description: "E-learning platform template with modern filtering.",
    tech: ["HTML5", "CSS3", "TWCSS", "JavaScript", "RWD"],
    role: "Web Developer",
    image: "assets/img/oakwoodhub.png",
    link: "https://oakwoodhub.netlify.app/",
  },
  {
    title: "Academy of Future Template",
    description:
      "Sleek, professional dark-mode template for advanced education.",
    tech: ["HTML5", "CSS3", "TWCSS", "JavaScript", "RWD"],
    role: "Web Developer",
    image: "assets/img/futureacademy.png",
    link: "https://academyoffuture.netlify.app/",
  },
  {
    title: "Vibrant School Template",
    description: "Bright, engaging template for art school.",
    tech: ["HTML5", "CSS3", "TWCSS", "JavaScript", "RWD"],
    role: "Web Developer",
    image: "assets/img/vibrantschool.png",
    link: "https://vibrantschool.netlify.app/",
  },
  {
    title: "Artisan Academy Template",
    description:
      "Clean design focusing on certification programs and workshops for academy.",
    tech: ["HTML5", "CSS3", "TWCSS", "JavaScript", "RWD"],
    role: "Web Developer",
    image: "assets/img/artisanacademy.png",
    link: "https://artisanacademy.netlify.app/",
  },
];

const PROJECTS_PER_PAGE = 9;
let currentPage = 1;

const renderProjects = (page = 1) => {
  const grid = document.getElementById("project-grid");
  const placeholderImageUrl = (text) =>
    `https://placehold.co/600x400/1e293b/e5e7eb?text=${encodeURIComponent(
      text
    )}`;

  // Clear the current grid content
  grid.innerHTML = "";

  // Calculate the start and end indices for the current page
  const startIndex = (page - 1) * PROJECTS_PER_PAGE;
  const endIndex = startIndex + PROJECTS_PER_PAGE;
  const projectsToRender = projectData.slice(startIndex, endIndex);

  projectsToRender.forEach((project) => {
    const card = document.createElement("div");
    card.className =
      "project-card glass-card rounded-xl p-3 interactive-element";

    // Add click listener to the entire card
    card.addEventListener("click", (e) => {
      // Check if the click target is the inner Live Demo button
      if (e.target.closest(".live-demo-button")) {
        // If it's the button, let the button's default action run.
        return;
      }

      // If the click is anywhere else on the card, open the link
      window.open(project.link, "_blank");
    });

    card.innerHTML = `
                    <div class="block h-64"> 
                        <div class="project-card-inner">
                            <img 
                                src="${project.image}" 
                                alt="Screenshot of ${project.title}" 
                                class="project-image"
                                onerror="this.onerror=null; this.src='${placeholderImageUrl(
                                  project.title
                                )}'; this.parentElement.style.backgroundColor='#1e293b';"
                            >
                            
                            <!-- Initial Title Cover  -->
                            <div class="project-title-cover">
                                <h3 class="text-2xl font-bold fancy-header">${
                                  project.title
                                }</h3>
                            </div>

                            <!-- Detailed Overlay (Appears on hover) -->
                            <div class="project-overlay">
                                <h3 class="text-xl font-bold mb-1 text-white fancy-header">${
                                  project.title
                                }</h3>
                                
                                <!-- Role Display -->
                                <p class="text-sm text-purple-300 font-medium mb-2">Role: ${
                                  project.role
                                }</p>

                                <p class="text-xs text-gray-300 mb-3">${
                                  project.description
                                }</p>
                                
                                <div class="flex flex-wrap gap-1 mb-4">
                                    ${project.tech
                                      .map(
                                        (tech) => `
                                        <span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-purple-600 text-white shadow-md">
                                            ${
                                              tech === "RWD"
                                                ? "Responsive Web Design"
                                                : tech
                                            }
                                        </span>
                                    `
                                      )
                                      .join("")}
                                </div>

                                <!-- Live Demo Button -->
                                <div class="flex">
                                    <a href="${
                                      project.link
                                    }" target="_blank" rel="noopener noreferrer" 
                                        class="live-demo-button interactive-element flex-1 px-4 py-2 text-center text-sm bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg transition transform hover:scale-[1.02]">
                                        Live Demo
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
    grid.appendChild(card);
  });

  // Update global state and pagination controls
  currentPage = page;
  document.getElementById("current-page-display").textContent = page;
  setupPagination();
};

const setupPagination = () => {
  const totalPages = Math.ceil(projectData.length / PROJECTS_PER_PAGE);
  const paginationContainer = document.getElementById("pagination-controls");
  paginationContainer.innerHTML = "";

  if (totalPages <= 1) return;

  // Create Page Buttons
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;

    pageButton.className = `interactive-element px-4 py-2 mx-1 rounded-lg font-bold transition duration-300 text-lg fancy-header ${
      i === currentPage
        ? "hire-me-gradient"
        : "border border-gray-500 hover:border-purple-400 text-gray-300 hover:text-purple-400"
    }`;

    // Keep cursor interaction for non-active buttons too
    pageButton.setAttribute("data-page", i);
    pageButton.onclick = () => renderProjects(i);
    paginationContainer.appendChild(pageButton);
  }
};

// Function to initialize the app
const initializeApp = () => {
  renderProjects(1);
};

document.addEventListener("DOMContentLoaded", initializeApp);
