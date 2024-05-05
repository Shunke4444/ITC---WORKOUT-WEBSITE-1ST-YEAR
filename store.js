
let subMenu = document.querySelector(".sub-menu-wrapper");

function toggleSubMenu() {
    console.log("Clicked on user profile picture!");
    subMenu.classList.toggle("open-menu");
}

let userPfp = document.querySelector(".user-pfp");
userPfp.addEventListener("click", toggleSubMenu);



document.addEventListener("DOMContentLoaded", function() {
    let subNotif = document.querySelector(".sub-menu-wrapper-notification");

    function toggleNotifMenu() {
        console.log("Clicked on the notification bell!");
        console.log("Current class list:", subNotif.classList);
        subNotif.classList.toggle("open-menu-notif");
        console.log("Updated class list:", subNotif.classList);
    }

    let notifBell = document.querySelector(".fa-regular.fa-bell");
    notifBell.addEventListener("click", toggleNotifMenu);
});


const scrollButton = document.getElementById("learn-more-btn");
const sections = document.querySelectorAll("section");

scrollButton.addEventListener("click", () => {
  const currentSection = document.querySelector(".current-section");
  const nextSection = currentSection.nextElementSibling;

  if (nextSection) {
    nextSection.scrollIntoView({ behavior: "smooth" });
    currentSection.classList.remove("current-section");
    nextSection.classList.add("current-section");
  }
});

const firstSection = sections[0];
firstSection.classList.add("current-section");


// 1ST SECTION
const carousel = document.querySelector('.carousel')
const slider = carousel.querySelector('.carousel_track')
let slides = [...slider.children]

// Initial slides position, so user can go from first to last slide (click to the left first)
slider.prepend(slides[slides.length - 1])

// Creating dot for each slide
const createDots = (carousel, initSlides) => {
  const dotsContainer = document.createElement('div')
  dotsContainer.classList.add('carousel_nav')

  initSlides.forEach((slide, index) => {
    const dot = document.createElement('button')
    dot.type = 'button'
    dot.classList.add('carousel_dot')
    dot.setAttribute('aria-label', `Slide number ${index + 1}`)
    slide.dataset.position = index
    slide.classList.contains('is-selected') && dot.classList.add('is-selected')
    dotsContainer.appendChild(dot)
  })

  carousel.appendChild(dotsContainer)

  return dotsContainer
}

// Updating relevant dot
const updateDot = slide => {
  const currDot = dotNav.querySelector('.is-selected')
  const targetDot = slide.dataset.position

  currDot.classList.remove('is-selected')
  dots[targetDot].classList.add('is-selected')
}

// Handling arrow buttons
const handleArrowClick = arrow => {
  arrow.addEventListener('click', () => {
    slides = [...slider.children]
    const currSlide = slider.querySelector('.is-selected')
    currSlide.classList.remove('is-selected')
    let targetSlide

    if (arrow.classList.contains('jsPrev')) {
      targetSlide = currSlide.previousElementSibling
      slider.prepend(slides[slides.length - 1])
    }

    if (arrow.classList.contains('jsNext')) {
      targetSlide = currSlide.nextElementSibling
      slider.append(slides[0])
    }

    targetSlide.classList.add('is-selected')
    updateDot(targetSlide)
  })
}

const buttons = carousel.querySelectorAll('.carousel_btn')
buttons.forEach(handleArrowClick)

// Handling dot buttons
const handleDotClick = dot => {
  const dotIndex = dots.indexOf(dot)
  const currSlidePos = slider.querySelector('.is-selected').dataset.position
  const targetSlidePos = slider.querySelector(`[data-position='${dotIndex}']`).dataset.position

  if (currSlidePos < targetSlidePos) {
    const count = targetSlidePos - currSlidePos
    for (let i = count; i > 0; i--) nextBtn.click()
  }

  if (currSlidePos > targetSlidePos) {
    const count = currSlidePos - targetSlidePos
    for (let i = count; i > 0; i--) prevBtn.click()
  }
}

const dotNav = createDots(carousel, slides)
const dots = [...dotNav.children]
const prevBtn = buttons[0]
const nextBtn = buttons[1]

dotNav.addEventListener('click', e => {
  const dot = e.target.closest('button')
  if (!dot) return
  handleDotClick(dot)
})

// Auto sliding
const slideTiming = 5000
let interval
const slideInterval = () => interval = setInterval(() => nextBtn.click(), slideTiming)

carousel.addEventListener('mouseover', () => clearInterval(interval))
carousel.addEventListener('mouseleave', slideInterval)
slideInterval()