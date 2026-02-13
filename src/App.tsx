import { useEffect, useState } from 'react'
import { PixelPalProvider, usePixelPalStore } from './store/pixelPalStore'
import { PixelPalCharacter } from './components/PixelPalCharacter'
import { Room } from './components/Room'
import { StatsBar } from './components/StatsBar'
import { ActionButtons } from './components/ActionButtons'
import { ChatBubble } from './components/ChatBubble'
import { MiniGame } from './components/MiniGame'
import { SetupModal } from './components/SetupModal'
import { Menu, Sparkles, Zap } from 'lucide-react'
import './App.css'

function PixelPalApp() {
  const { 
    name, 
    stats,
    isPlaying, 
    currentGame, 
    messages, 
    updateStats,
    addMessage 
  } = usePixelPalStore()
  
  const [showSetup, setShowSetup] = useState(!name || name === 'Pixel')
  const [showMenu, setShowMenu] = useState(false)
  const [showXpAnimation, setShowXpAnimation] = useState(false)

  useEffect(() => {
    const interval = setInterval(updateStats, 60000)
    return () => clearInterval(interval)
  }, [updateStats])

  useEffect(() => {
    if (name && name !== 'Pixel') {
      setTimeout(() => {
        addMessage(`Hey ${name}! I'm Pixel!`)
      }, 500)
    }
  }, [])

  useEffect(() => {
    if (stats.xp > 0 && stats.xp % 50 === 0) {
      setShowXpAnimation(true)
      setTimeout(() => setShowXpAnimation(false), 2000)
    }
  }, [stats.xp])

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'granted') {
      if (stats.hunger < 20) {
        new Notification('PixelPal', {
          body: `${name} is hungry! Feed me please!`,
          icon: '/icon-192x192.svg',
        })
      }
    }
  }, [stats.hunger, name])

  return (
    <div className="app-container">
      <div className="bg-grid" />
      
      <header className="header">
        <button
          className="menu-btn"
          onClick={() => setShowMenu(!showMenu)}
        >
          <Menu size={24} />
        </button>
        
        <div className="title-section">
          <h1 className="title">PixelPal</h1>
          <div className="level-badge">
            <Sparkles size={14} />
            <span>LVL {stats.level}</span>
          </div>
        </div>
        
        <div className="xp-section">
          <Zap size={16} className="xp-icon" />
          <span>{stats.xp} XP</span>
        </div>
      </header>

      <main className="main-content">
        <StatsBar />
        
        <div className="room-container">
          <Room />
          <PixelPalCharacter />
        </div>
        
        <div className="chat-container">
          {messages.slice(-2).map((msg, i) => (
            <ChatBubble key={i} message={msg} delay={i * 0.1} />
          ))}
        </div>
        
        {showXpAnimation && (
          <div className="xp-popup">
            +XP! 🎉
          </div>
        )}
      </main>

      {!isPlaying && <ActionButtons />}

      {isPlaying && currentGame && <MiniGame game={currentGame} />}

      {showSetup && <SetupModal onComplete={() => setShowSetup(false)} />}

      {showMenu && (
        <div className="menu-drawer">
          <div className="menu-content">
            <h2>Settings</h2>
            <button onClick={() => setShowMenu(false)}>Close</button>
            <div className="menu-items">
              <button className="menu-item">Customize Room 🎨</button>
              <button className="menu-item">Achievements 🏆</button>
              <button className="menu-item">Share 📤</button>
              <button className="menu-item">About ℹ️</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <PixelPalProvider>
      <PixelPalApp />
    </PixelPalProvider>
  )
}

export default App
