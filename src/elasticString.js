import gsap from 'gsap';

export function initElasticStrings() {
  const containers = document.querySelectorAll('.interactive-string-container');

  containers.forEach(container => {
    const path = container.querySelector('.string-path');
    if (!path) return;

    const width = 500;
    const height = 40;
    const defaultY = 20;

    function setPath(controlX, controlY) {
      path.setAttribute('d', `M 0 ${defaultY} Q ${controlX.toFixed(1)} ${controlY.toFixed(1)} ${width} ${defaultY}`);
    }

    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const normX = Math.max(10, Math.min(width - 10, (mouseX / rect.width) * width));
      const normY = Math.max(-10, Math.min(50, (mouseY / rect.height) * height));

      gsap.to(path, {
        overwrite: 'all',
        duration: 0.1,
        onUpdate: () => {
          setPath(normX, normY);
        }
      });
    });

    container.addEventListener('mouseleave', () => {
      const currentD = path.getAttribute('d');
      let currentX = 250;
      let currentY = defaultY;

      if (currentD) {
        const parts = currentD.split(' ');
        if (parts.length >= 6) {
          currentX = parseFloat(parts[4]) || 250;
          currentY = parseFloat(parts[5]) || defaultY;
        }
      }

      const obj = { controlX: currentX, controlY: currentY };

      gsap.to(obj, {
        controlX: 250,
        controlY: defaultY,
        duration: 1.4,
        ease: 'elastic.out(1.2, 0.2)',
        onUpdate: () => {
          setPath(obj.controlX, obj.controlY);
        }
      });
    });
  });
}
