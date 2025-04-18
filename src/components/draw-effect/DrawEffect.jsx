import React, { useEffect, useState, useRef, useCallback } from "react";
import "./DrawEffect.scss";
import gsap from "gsap";

/**
 * DrawEffect Component - Displays an energetic particle animation when a game ends in a draw
 *
 * @param {Object} props
 * @param {boolean} props.active
 * @param {Function} props.onComplete
 * @param {Function} props.onReset
 * @param {number} props.duration
 */
const DrawEffect = ({ active, onComplete, onReset, duration = 5000 }) => {
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef(null);

  const animateDrawEffect = useCallback(() => {
    const tl = gsap.timeline();
    animationRef.current = tl;

    // Initial board effect
    tl.to(".board-overlay", {
      backgroundColor: "rgba(15, 23, 42, 0.85)",
      backdropFilter: "blur(10px)",
      duration: 0.5,
      ease: "power2.out",
    });

    tl.to(
      ".energy-orb",
      {
        scale: 1,
        opacity: 0.9,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
      },
      "-=0.3"
    );

    tl.to(
      ".energy-orb",
      {
        boxShadow: "0 0 50px 20px rgba(139, 92, 246, 0.6)",
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          if (!particlesRef.current) {
            particlesRef.current = document.createElement("div");
            particlesRef.current.className = "particles-container";
            document
              .querySelector(".energy-effect-container")
              .appendChild(particlesRef.current);
          }

          particlesRef.current.innerHTML = "";

          const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981"];
          const orbElement = document.querySelector(".energy-orb");
          const rect = orbElement.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          for (let i = 0; i < 60; i++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            const particle = createParticle(centerX, centerY, color);
            particlesRef.current.appendChild(particle);

            gsap.to(particle, {
              x: (Math.random() - 0.5) * 400,
              y: (Math.random() - 0.5) * 400,
              scale: Math.random() * 2 + 0.5,
              opacity: 0,
              duration: Math.random() * 2 + 1,
              ease: "power2.out",
              onComplete: () => {
                if (particle.parentNode) {
                  particle.parentNode.removeChild(particle);
                }
              },
            });
          }
        },
      },
      "+=0.2"
    );

    tl.to(
      ".pulse-ring",
      {
        scale: 1.5,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.out",
        repeat: 2,
        repeatDelay: 0.5,
      },
      "-=0.5"
    );

    tl.to(
      ".draw-reset-button, .draw-label",
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
      "-=2"
    );
  }, []);

  useEffect(() => {
    if (active && !animating) {
      setAnimating(true);
      animateDrawEffect();

      timeoutRef.current = setTimeout(() => {
        setAnimating(false);
        if (onComplete) onComplete();
      }, duration);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [active, onComplete, animating, duration, animateDrawEffect]);

  const handleDismiss = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (onComplete) onComplete();

    setAnimating(false);

    if (animationRef.current) {
      animationRef.current.kill();
    }
  };

  const handleReset = (e) => {
    if (e) {
      e.stopPropagation();
    }

    handleDismiss();

    if (onReset) {
      onReset();
    }
  };

  const createParticle = (x, y, color) => {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.backgroundColor = color;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    return particle;
  };

  if (!active && !animating) return null;

  return (
    <div className="board-overlay">
      <div className="energy-effect-container">
        <div className="energy-orb"></div>
        <div className="pulse-ring ring1"></div>
        <div className="pulse-ring ring2"></div>
        <div className="pulse-ring ring3"></div>
        <div className="draw-label">Draw</div>
        <button className="draw-reset-button" onClick={handleReset}>
          New Game
        </button>
      </div>
    </div>
  );
};

export default DrawEffect;
