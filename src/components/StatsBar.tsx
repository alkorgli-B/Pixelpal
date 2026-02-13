import { usePixelPalStore } from '../store/pixelPalStore'
import { Heart, Pizza, Zap, Smile } from 'lucide-react'

interface StatItemProps {
  icon: React.ReactNode
  value: number
  color: string
}

function StatItem({ icon, value, color }: StatItemProps) {
  const getColor = (val: number) => {
    if (val > 70) return '#39FF14'
    if (val > 40) return '#FFFF00'
    return '#FF4444'
  }

  return (
    <div className="stat-item">
      <div className="stat-icon" style={{ color }}>
        {icon}
      </div>
      <div className="stat-bar-container">
        <div
          className="stat-bar"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${getColor(value)}, ${color})`,
            boxShadow: `0 0 10px ${color}50`,
            transition: 'width 0.3s ease',
          }}
        />
      </div>
      <span className="stat-value" style={{ color: getColor(value) }}>
        {Math.round(value)}
      </span>
    </div>
  )
}

export function StatsBar() {
  const { stats, mood } = usePixelPalStore()

  return (
    <div className="stats-bar" style={{ animation: 'slideDown 0.3s ease' }}>
      <div className="stats-grid">
        <StatItem icon={<Pizza size={18} />} value={stats.hunger} color="#FF6B6B" />
        <StatItem icon={<Smile size={18} />} value={stats.happiness} color="#FF00FF" />
        <StatItem icon={<Zap size={18} />} value={stats.energy} color="#00FFFF" />
        <StatItem icon={<Heart size={18} />} value={stats.health} color="#39FF14" />
      </div>

      <div
        className="mood-badge"
        style={{
          background: 'linear-gradient(135deg, var(--neon-pink), var(--neon-purple))',
          animation: 'pulse 2s ease-in-out infinite',
        }}
      >
        <span className="mood-label">{mood.toUpperCase()}</span>
      </div>
    </div>
  )
}
