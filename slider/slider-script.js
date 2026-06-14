document.addEventListener("DOMContentLoaded", function () {

  const swiper = new Swiper('.product-slider', {
    spaceBetween: 30,
    effect: 'fade',
    loop: false,

    navigation: {
      nextEl: '.next',
      prevEl: '.prev'
    },

    on: {
      init: function () {
        updateSlide(this.activeIndex);
      }
    }
  });

  swiper.on('slideChange', function () {
    updateSlide(this.activeIndex);
  });

  function updateSlide(index) {

    const items = document.querySelectorAll('.product-slider__item');
    const images = document.querySelectorAll('.product-img__item');
    const bg = document.querySelector('.bg-shape');

    if (!items.length || !images.length || !bg) return;

    const target = items[index]?.getAttribute('data-target');

    // reset images safely
    images.forEach(img => img.classList.remove('active'));

    const activeImg = document.getElementById(target);
    if (activeImg) activeImg.classList.add('active');

    // cinematic background shift per book
    const colors = [
      "radial-gradient(circle at 20% 20%, #1e5f99, #0b1a2a)",
      "radial-gradient(circle at 30% 30%, #2c3e90, #050b18)",
      "radial-gradient(circle at 40% 20%, #3b5ea8, #0a1020)",
      "radial-gradient(circle at 20% 40%, #1f4c7a, #060d1a)"
    ];

    bg.style.transition = "all 0.8s ease";
    bg.style.background = colors[index % colors.length];
  }

});
