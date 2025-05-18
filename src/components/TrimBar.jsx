import { useState, useRef, useEffect } from 'react';
import './TrimBar.css';

export default function TrimBar({ duration, trimStart, trimEnd, onTrimChange }) {
  const [isDragging, setIsDragging] = useState(null);
  const containerRef = useRef(null);

  const clamp = (val, min, max) => Math.max(min, Math.min(val, max));

  const handleMouseDown = (e, type) => {
    e.preventDefault();
    setIsDragging(type);
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current || !isDragging) return;
    const rect = containerRef.current.getBoundingClientRect();
    let percent = (e.clientX - rect.left) / rect.width;
    percent = clamp(percent, 0, 1);
    const time = percent * duration;

    if (isDragging === 'start') {
      const newStart = clamp(time, 0, trimEnd - 0.1);
      onTrimChange(newStart, trimEnd);
    } else if (isDragging === 'end') {
      const newEnd = clamp(time, trimStart + 0.1, duration);
      onTrimChange(trimStart, newEnd);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="trim-bar" ref={containerRef}>
      <div
        className="trim-handle start"
        style={{ left: `${(trimStart / duration) * 100}%` }}
        onMouseDown={(e) => handleMouseDown(e, 'start')}
      />
      <div
        className="trim-handle end"
        style={{ left: `${(trimEnd / duration) * 100}%` }}
        onMouseDown={(e) => handleMouseDown(e, 'end')}
      />
      <div
        className="trim-selection"
        style={{
          left: `${(trimStart / duration) * 100}%`,
          width: `${((trimEnd - trimStart) / duration) * 100}%`,
        }}
      />
    </div>
  );
} 