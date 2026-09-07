export function setupFloatingBadges() {
  const container = document.querySelector('#floating-badges-container');
  if (!container) return;

  const techBadges = [
    {
      name: ".NET Core",
      icon: `<span style="font-family: sans-serif; font-weight: 900; font-size: 13px; color: #fff; background: #512bd4; padding: 2px 6px; border-radius: 4px;">.NET</span>`,
      color: "#512bd4",
      bg: "rgba(35, 18, 90, 0.9)",
      border: "rgba(81, 43, 212, 0.6)",
      rotate: -10,
      baseX: 200,
      baseY: 10
    },
    {
      name: "React",
      icon: `<svg width="20" height="20" viewBox="0 0 100 100" fill="none"><ellipse cx="50" cy="50" rx="40" ry="15" stroke="#61dafb" stroke-width="6" transform="rotate(30 50 50)"/><ellipse cx="50" cy="50" rx="40" ry="15" stroke="#61dafb" stroke-width="6" transform="rotate(90 50 50)"/><ellipse cx="50" cy="50" rx="40" ry="15" stroke="#61dafb" stroke-width="6" transform="rotate(150 50 50)"/><circle cx="50" cy="50" r="8" fill="#61dafb"/></svg>`,
      color: "#61dafb",
      bg: "rgba(8, 24, 38, 0.9)",
      border: "rgba(97, 218, 251, 0.6)",
      rotate: 8,
      baseX: 20,
      baseY: 130
    },
    {
      name: "JS / C#",
      icon: `<span style="font-family: sans-serif; font-weight: 900; font-size: 13px; color: #000; background: #f7df1e; padding: 2px 6px; border-radius: 4px;">JS</span>`,
      color: "#f7df1e",
      bg: "rgba(247, 223, 30, 0.95)",
      border: "rgba(247, 223, 30, 0.8)",
      textColor: "#000000",
      rotate: -6,
      baseX: 240,
      baseY: 150
    },
    {
      name: "Mendix",
      icon: `<span style="font-family: sans-serif; font-weight: 900; font-size: 12px; color: #fff; background: #0595ff; padding: 2px 5px; border-radius: 4px;">Mx</span>`,
      color: "#0595ff",
      bg: "rgba(5, 45, 80, 0.9)",
      border: "rgba(5, 149, 255, 0.6)",
      rotate: 12,
      baseX: 30,
      baseY: 270
    },
    {
      name: "SQL Server",
      icon: `<span style="font-size: 14px;">🗄️</span>`,
      color: "#cc292b",
      bg: "rgba(45, 10, 10, 0.9)",
      border: "rgba(204, 41, 43, 0.6)",
      rotate: -12,
      baseX: 220,
      baseY: 290
    }
  ];

  container.innerHTML = '';

  const badgeElements = techBadges.map((badge, idx) => {
    const el = document.createElement('div');
    el.className = 'tech-sticker-badge';
    el.style.backgroundColor = badge.bg;
    el.style.borderColor = badge.border;
    el.style.color = badge.textColor || "#ffffff";
    el.style.position = 'absolute';
    el.style.left = '0px';
    el.style.top = '0px';
    el.style.transform = `rotate(${badge.rotate}deg)`;

    el.innerHTML = `
      <span class="sticker-icon">${badge.icon}</span>
      <span class="sticker-name">${badge.name}</span>
    `;

    container.appendChild(el);

    return {
      el,
      x: badge.baseX,
      y: badge.baseY,
      targetX: badge.baseX,
      targetY: badge.baseY,
      baseX: badge.baseX,
      baseY: badge.baseY,
      rotate: badge.rotate,
      phase: idx * 1.5
    };
  });

  let mouseX = -1000;
  let mouseY = -1000;
  let isVisible = false;

  const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
  }, { threshold: 0.05 });

  observer.observe(container);

  const leftCol = document.querySelector('.expertise-left-col');
  if (leftCol) {
    leftCol.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });
  }

  function animate() {
    if (isVisible) {
      const time = Date.now() * 0.0015;

      badgeElements.forEach((b) => {
        const floatX = Math.sin(time + b.phase) * 10;
        const floatY = Math.cos(time * 0.85 + b.phase) * 10;

        const dx = mouseX - (b.x + 40);
        const dy = mouseY - (b.y + 20);
        const dist = Math.sqrt(dx * dx + dy * dy);

        let pushX = 0;
        let pushY = 0;

        if (dist < 120) {
          const force = (120 - dist) / 120;
          pushX = -(dx / dist) * force * 40;
          pushY = -(dy / dist) * force * 40;
        }

        b.targetX = b.baseX + floatX + pushX;
        b.targetY = b.baseY + floatY + pushY;

        b.x += (b.targetX - b.x) * 0.1;
        b.y += (b.targetY - b.y) * 0.1;

        b.el.style.transform = `translate3d(${b.x.toFixed(1)}px, ${b.y.toFixed(1)}px, 0px) rotate(${b.rotate}deg)`;
      });
    }

    requestAnimationFrame(animate);
  }

  animate();
}
