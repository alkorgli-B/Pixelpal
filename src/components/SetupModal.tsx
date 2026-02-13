import { useState } from 'react'
import { usePixelPalStore } from '../store/pixelPalStore'
import { Sparkles, Heart, Star } from 'lucide-react'

interface SetupModalProps {
  onComplete: () => void
}

export function SetupModal({ onComplete }: SetupModalProps) {
  const [name, setName] = useState('')
  const [step, setStep] = useState(0)
  const { setName: setPetName } = usePixelPalStore()

  const handleSubmit = () => {
    if (name.trim()) {
      setPetName(name.trim())
      setStep(1)
      setTimeout(() => {
        onComplete()
      }, 2000)
    }
  }

  return (
    <div
      className="setup-modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
        animation: 'fadeIn 0.3s ease',
      }}
    >
      <div
        className="setup-modal"
        style={{
          position: 'relative',
          background: 'linear-gradient(135deg, #1a0033, #330066)',
          border: '3px solid var(--neon-pink)',
          borderRadius: '24px',
          padding: '32px 24px',
          width: '100%',
          maxWidth: '400px',
          overflow: 'hidden',
          animation: 'scaleIn 0.3s ease',
        }}
      >
        <div className="setup-bg-effects" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                fontSize: Math.random() * 20 + 10,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${2 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {['💜', '✨', '🌟', '💫', '🎮'][i % 5]}
            </div>
          ))}
        </div>

        {step === 0 ? (
          <>
            <h1
              style={{
                fontFamily: 'var(--pixel-font)',
                fontSize: '16px',
                color: 'var(--neon-cyan)',
                textAlign: 'center',
                margin: '0 0 8px 0',
                textShadow: '0 0 10px var(--neon-cyan)',
              }}
            >
              Welcome to PixelPal!
            </h1>
            <p
              style={{
                fontFamily: 'var(--retro-font)',
                fontSize: '18px',
                color: 'rgba(255, 255, 255, 0.7)',
                textAlign: 'center',
                margin: '0 0 24px 0',
              }}
            >
              Your digital friend from the Y2K era
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
              <div style={{ filter: 'drop-shadow(0 0 20px var(--neon-pink))', animation: 'bounce 1.5s ease-in-out infinite' }}>
                <svg width="120" height="120" viewBox="0 0 100 100">
                  <rect x="20" y="30" width="60" height="50" rx="8" fill="#FF00FF" />
                  <rect x="30" y="45" width="12" height="12" fill="white" />
                  <rect x="33" y="48" width="6" height="6" fill="black" />
                  <rect x="58" y="45" width="12" height="12" fill="white" />
                  <rect x="61" y="48" width="6" height="6" fill="black" />
                  <rect x="40" y="65" width="20" height="8" rx="4" fill="white" />
                  <rect x="22" y="58" width="8" height="6" rx="3" fill="#FF69B4" opacity="0.6" />
                  <rect x="70" y="58" width="8" height="6" rx="3" fill="#FF69B4" opacity="0.6" />
                </svg>
              </div>

              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <label style={{ color: 'white', fontSize: '16px', textAlign: 'center' }}>
                  What should I call you?
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '2px solid var(--neon-cyan)',
                    borderRadius: '12px',
                    padding: '16px',
                    color: 'white',
                    fontFamily: 'var(--retro-font)',
                    fontSize: '20px',
                    textAlign: 'center',
                    outline: 'none',
                  }}
                  maxLength={15}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                />
                <button
                  onClick={handleSubmit}
                  disabled={!name.trim()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    background: 'linear-gradient(135deg, var(--neon-pink), var(--neon-purple))',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '16px',
                    color: 'white',
                    fontFamily: 'var(--pixel-font)',
                    fontSize: '12px',
                    cursor: name.trim() ? 'pointer' : 'not-allowed',
                    opacity: name.trim() ? 1 : 0.5,
                    boxShadow: '0 0 20px rgba(255, 0, 255, 0.5)',
                  }}
                >
                  <Sparkles size={18} />
                  Start Adventure!
                </button>
              </div>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', animation: 'fadeIn 0.5s ease' }}>
            <div style={{ animation: 'scaleIn 0.5s ease' }}>
              <Heart size={64} color="#FF00FF" fill="#FF00FF" />
            </div>
            
            <h2 style={{ color: 'white', textAlign: 'center', margin: 0 }}>
              Nice to meet you, {name}!
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
              {[
                'Feed me when I am hungry',
                'Play games to earn XP',
                'Pet me to make me happy',
                'Watch me grow over time!',
              ].map((feature, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '16px',
                    animation: `slideRight 0.3s ease ${i * 0.1}s both`,
                  }}
                >
                  <Star size={16} color="#FFFF00" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: i === step ? '#FF00FF' : '#333',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
