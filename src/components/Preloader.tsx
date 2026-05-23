import React, { useEffect, useState } from 'react';
import './Preloader.css';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [percent, setPercent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Simulated organic loading progress
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current < 75) {
        current += Math.floor(Math.random() * 8) + 3;
      } else if (current < 99) {
        current += Math.floor(Math.random() * 2) + 1;
      } else {
        current = 100;
      }
      current = Math.min(current, 100);
      setPercent(current);

      if (current >= 100) {
        clearInterval(interval);
      }
    }, 60);

    return () => clearInterval(interval);
  }, []);

  // Lifecycle of loading screen: Loaded (Welcoming) -> Clicked/Expanded -> Unmount
  useEffect(() => {
    if (percent >= 100) {
      const loadedTimeout = setTimeout(() => {
        setLoaded(true);
        // After showing Welcome, auto-expand the shutter after 1.2s
        const clickedTimeout = setTimeout(() => {
          setClicked(true);
          // Allow shutter expansion animation to complete (900ms) before unmounting
          const completeTimeout = setTimeout(() => {
            onComplete();
          }, 900);
          return () => clearTimeout(completeTimeout);
        }, 1200);
        return () => clearTimeout(clickedTimeout);
      }, 600);
      return () => clearTimeout(loadedTimeout);
    }
  }, [percent, onComplete]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div className="loading-screen">
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          DURVISH SHARMA
        </a>
        <div className={`loaderGame ${clicked ? "loader-out" : ""}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>

      <div className="loading-marquee">
        <div className="custom-marquee-track">
          <span>A Creative Developer</span>
          <span>A Creative Designer</span>
          <span>A Creative Developer</span>
          <span>A Creative Designer</span>
          <span>A Creative Developer</span>
          <span>A Creative Designer</span>
          <span>A Creative Developer</span>
          <span>A Creative Designer</span>
        </div>
      </div>

      <div
        className={`loading-wrap ${clicked ? "loading-clicked" : ""}`}
        onMouseMove={handleMouseMove}
      >
        <div className="loading-hover"></div>
        <div className={`loading-button ${loaded ? "loading-complete" : ""}`}>
          <div className="loading-container">
            <div className="loading-content">
              <div className="loading-content-in">
                Loading <span>{percent}%</span>
              </div>
            </div>
            <div className="loading-box"></div>
          </div>
          <div className="loading-content2">
            <span>Welcome</span>
          </div>
        </div>
      </div>
    </div>
  );
}
