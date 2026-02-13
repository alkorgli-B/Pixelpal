import { usePixelPalStore } from '../store/pixelPalStore'

export function Room() {
  const { roomTheme, isSleeping } = usePixelPalStore()

  const getThemeColors = () => {
    switch (roomTheme) {
      case 'neon':
        return { bg: 'linear-gradient(135deg, #1a0033 0%, #330066 100%)', floor: '#FF00FF', wall: '#00FFFF' }
      case 'pastel':
        return { bg: 'linear-gradient(135deg, #FFB6C1 0%, #87CEEB 100%)', floor: '#FFA07A', wall: '#DDA0DD' }
      case 'retro':
        return { bg: 'linear-gradient(135deg, #2C1810 0%, #8B4513 100%)', floor: '#654321', wall: '#DEB887' }
      case 'cyber':
        return { bg: 'linear-gradient(135deg, #000000 0%, #1a1a2e 100%)', floor: '#00FF00', wall: '#FF0000' }
      default:
        return { bg: 'linear-gradient(135deg, #1a0033 0%, #330066 100%)', floor: '#FF00FF', wall: '#00FFFF' }
    }
  }

  const colors = getThemeColors()

  return (
    <div
      className="room"
      style={{
        position: 'absolute',
        inset: 0,
        background: colors.bg,
        overflow: 'hidden',
      }}
    >
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              position: 'absolute',
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              background: roomTheme === 'neon' ? '#00FFFF' : '#FFFFFF',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${2 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div
        className="floor"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '30%',
          background: `linear-gradient(180deg, transparent 0%, ${colors.floor}30 100%)`,
          borderTop: `2px solid ${colors.floor}`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '30%',
          backgroundImage: `linear-gradient(${colors.floor}20 1px, transparent 1px), linear-gradient(90deg, ${colors.floor}20 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          transform: 'perspective(100px) rotateX(60deg)',
          transformOrigin: 'bottom',
        }}
      />

      <div
        className="furniture bed"
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          width: 80,
          height: 60,
          background: isSleeping ? '#FF69B4' : '#8B4513',
          borderRadius: 8,
          border: `3px solid ${isSleeping ? '#FF1493' : '#654321'}`,
          boxShadow: `0 0 20px ${isSleeping ? '#FF69B4' : '#8B4513'}40`,
        }}
      >
        <div style={{ position: 'absolute', top: 8, left: 8, width: 24, height: 16, background: 'white', borderRadius: 4 }} />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60%',
            background: `repeating-linear-gradient(45deg, ${isSleeping ? '#FF1493' : '#A0522D'}, ${isSleeping ? '#FF1493' : '#A0522D'} 5px, transparent 5px, transparent 10px)`,
            borderRadius: '0 0 5px 5px',
          }}
        />
      </div>

      <div
        className="furniture lamp"
        style={{
          position: 'absolute',
          bottom: '25%',
          left: '15%',
          width: 40,
          height: 80,
          opacity: isSleeping ? 0.3 : 1,
        }}
      >
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 30, height: 10, background: '#FFD700', borderRadius: 4 }} />
        <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', width: 4, height: 50, background: '#FFD700' }} />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 40,
            height: 25,
            background: 'linear-gradient(180deg, #FFFF00 0%, #FFA500 100%)',
            borderRadius: '20px 20px 5px 5px',
            boxShadow: '0 0 30px #FFFF0080',
          }}
        />
        {!isSleeping && (
          <div
            className="lamp-glow"
            style={{
              position: 'absolute',
              top: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 100,
              height: 100,
              background: 'radial-gradient(circle, #FFFF0040 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
        )}
      </div>

      <div
        className="window"
        style={{
          position: 'absolute',
          top: '10%',
          right: '15%',
          width: 100,
          height: 80,
          background: isSleeping 
            ? 'linear-gradient(180deg, #000428 0%, #004e92 100%)' 
            : 'linear-gradient(180deg, #87CEEB 0%, #E0F6FF 100%)',
          border: '4px solid #8B4513',
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        <div
          className="celestial-body"
          style={{
            position: 'absolute',
            top: isSleeping ? '20%' : '15%',
            right: isSleeping ? '20%' : '15%',
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: isSleeping ? '#F0E68C' : '#FFD700',
            boxShadow: `0 0 20px ${isSleeping ? '#F0E68C' : '#FFD700'}`,
            animation: 'float 3s ease-in-out infinite',
          }}
        />
        
        {isSleeping && [...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 3,
              height: 3,
              background: 'white',
              borderRadius: '50%',
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 20}%`,
              animation: `twinkle ${1 + i * 0.5}s ease-in-out infinite`,
            }}
          />
        ))}

        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 4, background: '#8B4513', transform: 'translateY(-50%)' }} />
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 4, background: '#8B4513', transform: 'translateX(-50%)' }} />
      </div>

      <div
        className="poster"
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: 50,
          height: 70,
          background: 'linear-gradient(135deg, #FF00FF, #00FFFF)',
          border: '3px solid white',
          borderRadius: 4,
          transform: 'rotate(-5deg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
        }}
      >
        💾
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isSleeping ? 'radial-gradient(ellipse at 50% 30%, transparent 0%, rgba(0,0,50,0.5) 100%)' : 'none',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
