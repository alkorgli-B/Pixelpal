import { useEffect, useState } from 'react'
import { usePixelPalStore } from '../store/pixelPalStore'

export function PixelPalCharacter() {
  const { mood, isSleeping, stage, pet } = usePixelPalStore()
  const [blink, setBlink] = useState(false)
  const [bounce, setBounce] = useState(false)

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true)
      setTimeout(() => setBlink(false), 150)
    }, 3000 + Math.random() * 2000)
    return () => clearInterval(blinkInterval)
  }, [])

  useEffect(() => {
    if (mood === 'happy' || mood === 'excited') {
      const bounceInterval = setInterval(() => {
        setBounce(true)
        setTimeout(() => setBounce(false), 300)
      }, 5000)
      return () => clearInterval(bounceInterval)
    }
  }, [mood])

  const handleTap = () => {
    pet()
    setBounce(true)
    setTimeout(() => setBounce(false), 300)
  }

  const getMoodColors = () => {
    switch (mood) {
      case 'happy': return { main: '#FF00FF', accent: '#00FFFF' }
      case 'excited': return { main: '#FFFF00', accent: '#FF00FF' }
      case 'sad': return { main: '#4169E1', accent: '#87CEEB' }
      case 'hungry': return { main: '#FF6B6B', accent: '#FFA500' }
      case 'sleepy': return { main: '#9370DB', accent: '#E6E6FA' }
      case 'sick': return { main: '#808080', accent: '#32CD32' }
      default: return { main: '#FF00FF', accent: '#00FFFF' }
    }
  }

  const colors = getMoodColors()

  const getSize = () => {
    switch (stage) {
      case 'egg': return 60
      case 'baby': return 100
      case 'child': return 130
      case 'teen': return 160
      case 'adult': return 180
      default: return 100
    }
  }

  const size = getSize()

  return (
    <div
      className={`pixelpal-container ${bounce ? 'bounce' : ''}`}
      style={{
        position: 'absolute',
        bottom: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
      }}
      onClick={handleTap}
    >
      <div
        className="glow-effect"
        style={{
          position: 'absolute',
          inset: -20,
          background: `radial-gradient(circle, ${colors.main}40 0%, transparent 70%)`,
          borderRadius: '50%',
          filter: 'blur(20px)',
          animation: 'pulse 2s ease-in-out infinite',
        }}
      />

      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        style={{
          filter: `drop-shadow(0 0 10px ${colors.main})`,
          imageRendering: 'pixelated',
        }}
      >
        <rect x="20" y="30" width="60" height="50" rx="8" fill={colors.main} />
        
        {!isSleeping ? (
          <>
            <rect x="30" y="45" width="12" height={blink ? 2 : 12} fill="white" />
            {!blink && <rect x="33" y="48" width="6" height="6" fill="black" />}
            
            <rect x="58" y="45" width="12" height={blink ? 2 : 12} fill="white" />
            {!blink && <rect x="61" y="48" width="6" height="6" fill="black" />}
            
            {mood === 'happy' && <rect x="40" y="65" width="20" height="8" rx="4" fill="white" />}
            {mood === 'excited' && (
              <>
                <rect x="40" y="65" width="20" height="12" rx="6" fill="white" />
                <rect x="45" y="68" width="4" height="4" fill="#FF6B6B" />
                <rect x="51" y="68" width="4" height="4" fill="#FF6B6B" />
              </>
            )}
            {mood === 'sad' && (
              <path d="M 40 72 Q 50 65 60 72" stroke="white" strokeWidth="3" fill="none" />
            )}
            {mood === 'hungry' && (
              <>
                <rect x="42" y="68" width="16" height="8" rx="4" fill="white" />
                <rect x="46" y="70" width="8" height="4" fill="#FF6B6B" />
              </>
            )}
            {(mood === 'sleepy' || mood === 'sick') && <rect x="45" y="68" width="10" height="4" fill="white" />}
          </>
        ) : (
          <>
            <rect x="30" y="50" width="12" height="2" fill="white" />
            <rect x="58" y="50" width="12" height="2" fill="white" />
            <circle cx="50" cy="70" r="4" fill="white" />
            <text x="70" y="30" fill="white" fontSize="12" fontFamily="monospace" className="zzz-animation">Zzz</text>
          </>
        )}
        
        {(mood === 'happy' || mood === 'excited') && (
          <>
            <rect x="22" y="58" width="8" height="6" rx="3" fill="#FF69B4" opacity="0.6" />
            <rect x="70" y="58" width="8" height="6" rx="3" fill="#FF69B4" opacity="0.6" />
          </>
        )}
        
        {stage === 'child' && <rect x="35" y="25" width="30" height="8" rx="4" fill={colors.accent} />}
        {stage === 'teen' && (
          <>
            <rect x="30" y="22" width="40" height="10" rx="5" fill={colors.accent} />
            <rect x="45" y="25" width="10" height="8" fill="#FFD700" />
          </>
        )}
        {stage === 'adult' && (
          <>
            <path d="M 20 35 L 10 25 L 20 30" fill={colors.accent} stroke={colors.accent} strokeWidth="2" />
            <path d="M 80 35 L 90 25 L 80 30" fill={colors.accent} stroke={colors.accent} strokeWidth="2" />
          </>
        )}
      </svg>

      <div
        className="mood-indicator"
        style={{
          position: 'absolute',
          top: -30,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '24px',
          animation: 'float 1s ease-in-out infinite',
        }}
      >
        {mood === 'happy' && '😊'}
        {mood === 'excited' && '🤩'}
        {mood === 'sad' && '😢'}
        {mood === 'hungry' && '😋'}
        {mood === 'sleepy' && '😴'}
        {mood === 'sick' && '🤒'}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: -25,
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '12px',
          whiteSpace: 'nowrap',
          animation: 'fadePulse 2s ease-in-out infinite',
        }}
      >
        Tap to pet! 👆
      </div>
    </div>
  )
}
