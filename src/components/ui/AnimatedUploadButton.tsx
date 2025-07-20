import React, { useRef, useEffect, useState } from 'react';
import styles from './AnimatedUploadButton.module.css';
import { gsap } from 'gsap';

interface AnimatedUploadButtonProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
  isDone: boolean;
}

const AnimatedUploadButton: React.FC<AnimatedUploadButtonProps> = ({ onFileSelect, isLoading, isDone }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [internalState, setInternalState] = useState<'idle' | 'loading' | 'done'>('idle');

  useEffect(() => {
    if (isLoading) setInternalState('loading');
    else if (isDone) setInternalState('done');
    else setInternalState('idle');
  }, [isLoading, isDone]);

  // Animate SVG arrow or checkmark
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = svgRef.current;
    const path = svg.querySelector('path');
    if (!path) return;
    if (internalState === 'loading') {
      gsap.to(path, { y: -8, repeat: -1, yoyo: true, duration: 1, ease: 'power2.inOut' });
    } else {
      gsap.to(path, { y: 0, duration: 0.5, clearProps: 'y' });
    }
    return () => { gsap.killTweensOf(path); };
  }, [internalState]);

  // Animate background color on done
  useEffect(() => {
    if (!buttonRef.current) return;
    if (internalState === 'done') {
      gsap.to(buttonRef.current, { backgroundColor: '#1abc9c', duration: 0.7, ease: 'power2.inOut' });
    } else {
      gsap.to(buttonRef.current, { backgroundColor: '#000', duration: 0.7, ease: 'power2.inOut' });
    }
  }, [internalState]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
    e.target.value = '';
  };

  const handleButtonClick = () => {
    if (buttonRef.current) {
      const input = buttonRef.current.querySelector('input[type="file"]') as HTMLInputElement;
      if (input) input.click();
    }
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      className={[
        styles.button,
        internalState === 'loading' ? styles.loading : '',
        internalState === 'done' ? styles.done : ''
      ].join(' ')}
      onClick={handleButtonClick}
      disabled={internalState === 'loading'}
    >
      <input
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        onChange={handleInputChange}
        tabIndex={-1}
      />
      <span>Import CSV</span>
      <div>
        <svg ref={svgRef} viewBox="0 0 24 24">
          <path d="M12 5v14M12 19l-7-7M12 19l7-7" />
        </svg>
      </div>
    </button>
  );
};

export default AnimatedUploadButton; 