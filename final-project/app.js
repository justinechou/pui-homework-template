// reveal functionality

let reveal = {
    distance: "100%",
    duration: "1000",
    ease: "ease-out", 
    opacity: "0"
}

ScrollReveal().reveal(".reveal", reveal); 

// swiper js functionality

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    1024: {
        slidesPerView: 4,
        spaceBetween: 40, },
      }
});