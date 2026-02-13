import { usePixelPalStore } from '../store/pixelPalStore'
import { Pizza, Gamepad2, Moon, Sun, Sparkles, Bath } from 'lucide-react'

interface ActionButtonProps {
  icon: React.ReactNode
  label: string
  onClick: () => void
  color: string
  disabled?: boolean
}

function ActionButton({ icon, label, onClick, color, disabled }: ActionButtonProps) {
  return (
    <button
      className="action-btn"
      onClick={onClick}
      disabled={disabled}
      style={{
        background: `linear-gradient(135deg, ${color}, ${color}80)`,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      <div className="action-icon" style={{ animation: !disabled ? 'bounce 1.5s ease-in-out infinite' : 'none' }}>
        {icon}
      </div>
      <span className="action-label">{label}</span>
      {!disabled && (
        <div
          className="action-glow"
          style={{
            background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
      )}
    </button>
  )
}

export function ActionButtons() {
  const { feed, sleep, wakeUp, clean, pet, isSleeping, stats, startGame } = usePixelPalStore()

  if (isSleeping) {
    return (
      <div className="action-buttons-container" style={{ animation: 'slideUp 0.3s ease' }}>
        <ActionButton
          icon={<Sun size={28} />}
          label="WAKE UP"
          onClick={wakeUp}
          color="#FFD700"
        />
      </div>
    )
  }

  return (
    <div className="action-buttons-container" style={{ animation: 'slideUp 0.3s ease' }}>
      <ActionButton
        icon={<Pizza size={24} />}
        label="FEED"
        onClick={feed}
        color="#FF6B6B"
        disabled={stats.hunger >= 100}
      />

      <ActionButton
        icon={<Gamepad2 size={24} />}
        label="PLAY"
        onClick={() => startGame('snake')}
        color="#00FFFF"
        disabled={stats.energy < 20}
      />

      <ActionButton
        icon={<Sparkles size={24} />}
        label="PET"
        onClick={() => {
          if (navigator.vibrate) navigator.vibrate(20)
          pet()
        }}
        color="#FF00FF"
      />

      <ActionButton
        icon={<Bath size={24} />}
        label="CLEAN"
        onClick={clean}
        color="#39FF14"
      />

      <ActionButton
        icon={<Moon size={24} />}
        label="SLEEP"
        onClick={sleep}
        color="#9370DB"
      />
    </div>
  )
}
