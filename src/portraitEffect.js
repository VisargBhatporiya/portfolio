import gsap from 'gsap';

export function initPortraitEffect() {
  const card = document.querySelector('.about-portrait-card');
  const img = document.querySelector('.about-portrait-card .portrait-img');
  if (!card || !img) return;

  // Set perspective container
  card.style.perspective = '1000px';
  card.style.transformStyle = 'preserve-3d';

  let isHovered = false;

  card.addEventListener('mouseenter', () => {
    isHovered = true;
    gsap.to(img, {
      scale: 1.06,
      filter: 'grayscale(0%) brightness(1.08)',
      duration: 0.5,
      ease: 'power2.out'
    });
  });

  card.addEventListener('mousemove', (e) => {
    if (!isHovered) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // 0 to width
    const y = e.clientY - rect.top;  // 0 to height

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 10; // max 10 deg tilt
    const rotateY = ((x - centerX) / centerX) * 10;   // max 10 deg tilt

    const moveX = ((x - centerX) / centerX) * 12; // parallax image shift
    const moveY = ((y - centerY) / centerY) * 12;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.25,
      ease: 'power1.out',
      transformPerspective: 1000
    });

    gsap.to(img, {
      x: moveX,
      y: moveY,
      duration: 0.3,
      ease: 'power1.out'
    });
  });

  card.addEventListener('mouseleave', () => {
    isHovered = false;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.4)'
    });

    gsap.to(img, {
      x: 0,
      y: 0,
      scale: 1,
      filter: 'grayscale(100%) brightness(1)',
      duration: 0.6,
      ease: 'power2.out'
    });
  });
}
