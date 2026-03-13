import React, { useState, useEffect } from 'react';
import { Cloud } from 'lucide-react';

const BackgroundEffects = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 15 + Math.random() * 20,
      delay: Math.random() * 10,
      size: 2 + Math.random() * 4
    }));
    setParticles(newParticles);
  }, []);

  return (
    <>
      {/* Animated Background Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.animationDuration}s`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}

      {/* Animated Gradient Overlay */}
      <div className="background-overlay"></div>

      {/* Floating Cloud Shapes */}
      <div className="floating-cloud cloud-1">
        <Cloud size={120} color="white" />
      </div>
      <div className="floating-cloud cloud-2">
        <Cloud size={100} color="white" />
      </div>
    </>
  );
};

export default BackgroundEffects;