import gsap from 'gsap';

export function setupLiquidText() {
  const feTurbulence = document.querySelector('#feTurbulence');
  const feDisplacementMap = document.querySelector('#feDisplacementMap');
  const liquidElement = document.querySelector('.liquid-text');

  if (!feTurbulence || !feDisplacementMap || !liquidElement) return;

  const state = {
    scale: 0,
    freq: 0.01
  };

  let isHovered = false;
  let prevX = 0;
  let prevY = 0;

  liquidElement.addEventListener('mouseenter', (e) => {
    isHovered = true;
    prevX = e.clientX;
    prevY = e.clientY;
    
    gsap.to(state, {
      scale: 25,
      freq: 0.018,
      duration: 0.3,
      ease: 'power2.out',
      onUpdate: applyFilter
    });
  });

  liquidElement.addEventListener('mousemove', (e) => {
    if (!isHovered) return;
    const dx = e.clientX - prevX;
    const dy = e.clientY - prevY;
    const speed = Math.sqrt(dx * dx + dy * dy);
    prevX = e.clientX;
    prevY = e.clientY;

    const dynamicScale = Math.min(20 + speed * 1.4, 60);
    const dynamicFreq = 0.012 + Math.min(speed * 0.0004, 0.025);

    gsap.to(state, {
      scale: dynamicScale,
      freq: dynamicFreq,
      duration: 0.12,
      ease: 'power1.out',
      onUpdate: applyFilter
    });
  });

  liquidElement.addEventListener('mouseleave', () => {
    isHovered = false;
    gsap.to(state, {
      scale: 0,
      freq: 0.01,
      duration: 0.4,
      ease: 'power2.out',
      onUpdate: applyFilter
    });
  });

  function applyFilter() {
    feDisplacementMap.setAttribute('scale', state.scale.toFixed(1));
    feTurbulence.setAttribute('baseFrequency', `${state.freq.toFixed(3)} ${state.freq.toFixed(3)}`);
  }
}
