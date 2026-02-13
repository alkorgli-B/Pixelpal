import { useState, useEffect, useCallback, useRef } from 'react'
import { usePixelPalStore } from '../store/pixelPalStore'
import { X, Trophy, RotateCcw } from 'lucide-react'

interface MiniGameProps {
  game: string
}

function SnakeGame({ onClose }: { onClose: () => void }) {
  const { addXp, endGame, addMessage } = usePixelPalStore()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  const [snake, setSnake] = useState([{ x: 10, y: 10 }])
  const [food, setFood] = useState({ x: 15, y: 15 })
  const [direction, setDirection] = useState({ x: 1, y: 0 })
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const GRID_SIZE = 20
  const CELL_SIZE = 15

  const generateFood = useCallback(() => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    }
  }, [])

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }])
    setFood(generateFood())
    setDirection({ x: 1, y: 0 })
    setGameOver(false)
    setScore(0)
    setIsPaused(false)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 })
          break
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 })
          break
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 })
          break
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 })
          break
        case ' ':
          setIsPaused(p => !p)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [direction, gameOver])

  useEffect(() => {
    if (gameOver || isPaused) return

    const gameInterval = setInterval(() => {
      setSnake(currentSnake => {
        const newSnake = [...currentSnake]
        const head = { ...newSnake[0] }
        head.x += direction.x
        head.y += direction.y

        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setGameOver(true)
          return currentSnake
        }

        if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true)
          return currentSnake
        }

        newSnake.unshift(head)

        if (head.x === food.x && head.y === food.y) {
          setScore(s => s + 10)
          setFood(generateFood())
          addXp(5)
          if (navigator.vibrate) navigator.vibrate(50)
        } else {
          newSnake.pop()
        }

        return newSnake
      })
    }, 150)

    return () => clearInterval(gameInterval)
  }, [direction, food, gameOver, isPaused, generateFood, addXp])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#0a0a0a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = '#1a1a1a'
    ctx.lineWidth = 1
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath()
      ctx.moveTo(i * CELL_SIZE, 0)
      ctx.lineTo(i * CELL_SIZE, canvas.height)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i * CELL_SIZE)
      ctx.lineTo(canvas.width, i * CELL_SIZE)
      ctx.stroke()
    }

    ctx.fillStyle = '#FF00FF'
    ctx.shadowColor = '#FF00FF'
    ctx.shadowBlur = 10
    ctx.fillRect(food.x * CELL_SIZE + 2, food.y * CELL_SIZE + 2, CELL_SIZE - 4, CELL_SIZE - 4)
    ctx.shadowBlur = 0

    snake.forEach((segment, index) => {
      if (index === 0) {
        ctx.fillStyle = '#00FFFF'
        ctx.shadowColor = '#00FFFF'
        ctx.shadowBlur = 10
      } else {
        ctx.fillStyle = '#00FFFF80'
        ctx.shadowBlur = 0
      }
      ctx.fillRect(segment.x * CELL_SIZE + 1, segment.y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2)
    })
    ctx.shadowBlur = 0
  }, [snake, food])

  const handleClose = () => {
    addXp(score)
    addMessage(`Great game! You scored ${score} points!`)
    endGame()
    onClose()
  }

  return (
    <div
      className="minigame-container"
      style={{
        background: 'linear-gradient(135deg, #1a0033, #0a0a0a)',
        border: '3px solid var(--neon-cyan)',
        borderRadius: '24px',
        padding: '20px',
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        animation: 'scaleIn 0.3s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontFamily: 'var(--pixel-font)', fontSize: '14px', color: 'var(--neon-cyan)', margin: 0 }}>
          Snake Game
        </h2>
        <button
          onClick={handleClose}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '8px',
            padding: '8px',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          <X size={24} />
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontFamily: 'var(--pixel-font)', fontSize: '8px', color: 'rgba(255, 255, 255, 0.6)' }}>
            SCORE
          </span>
          <span style={{ fontFamily: 'var(--pixel-font)', fontSize: '18px', color: 'var(--neon-yellow)' }}>
            {score}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontFamily: 'var(--pixel-font)', fontSize: '8px', color: 'rgba(255, 255, 255, 0.6)' }}>
            HIGH
          </span>
          <span style={{ fontFamily: 'var(--pixel-font)', fontSize: '18px', color: 'var(--neon-yellow)' }}>
            {Math.max(score, localStorage.getItem('snakeHighScore') ? parseInt(localStorage.getItem('snakeHighScore')!) : 0)}
          </span>
        </div>
      </div>

      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * CELL_SIZE}
          height={GRID_SIZE * CELL_SIZE}
          style={{
            border: '2px solid var(--neon-purple)',
            borderRadius: '8px',
            background: '#0a0a0a',
            maxWidth: '100%',
          }}
        />

        {gameOver && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.9)',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              animation: 'fadeIn 0.3s ease',
            }}
          >
            <Trophy size={48} color="#FFD700" />
            <h3 style={{ fontFamily: 'var(--pixel-font)', fontSize: '18px', color: 'var(--neon-pink)', margin: 0 }}>
              GAME OVER!
            </h3>
            <p style={{ color: 'white', fontSize: '16px', margin: 0 }}>Score: {score}</p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <button
                onClick={resetGame}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, var(--neon-lime), #2ecc71)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'black',
                  fontFamily: 'var(--retro-font)',
                  fontSize: '16px',
                  cursor: 'pointer',
                }}
              >
                <RotateCcw size={18} />
                Retry
              </button>
              <button
                onClick={handleClose}
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, var(--neon-cyan), #3498db)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'black',
                  fontFamily: 'var(--retro-font)',
                  fontSize: '16px',
                  cursor: 'pointer',
                }}
              >
                Done
              </button>
            </div>
          </div>
        )}

        {isPaused && !gameOver && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.9)',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
            }}
          >
            <h3 style={{ fontFamily: 'var(--pixel-font)', fontSize: '18px', color: 'var(--neon-pink)', margin: 0 }}>
              PAUSED
            </h3>
            <p style={{ color: 'white', fontSize: '14px', margin: 0 }}>Press SPACE to resume</p>
          </div>
        )}
      </div>

      <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
        <p style={{ margin: '4px 0' }}>Use arrow keys to move</p>
        <p style={{ margin: '4px 0' }}>SPACE to pause</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={() => direction.y === 0 && setDirection({ x: 0, y: -1 })}
          style={{
            width: '50px',
            height: '50px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '2px solid var(--neon-cyan)',
            borderRadius: '12px',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
          }}
        >
          ↑
        </button>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => direction.x === 0 && setDirection({ x: -1, y: 0 })}
            style={{
              width: '50px',
              height: '50px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid var(--neon-cyan)',
              borderRadius: '12px',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
            }}
          >
            ←
          </button>
          <button
            onClick={() => direction.y === 0 && setDirection({ x: 0, y: 1 })}
            style={{
              width: '50px',
              height: '50px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid var(--neon-cyan)',
              borderRadius: '12px',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
            }}
          >
            ↓
          </button>
          <button
            onClick={() => direction.x === 0 && setDirection({ x: 1, y: 0 })}
            style={{
              width: '50px',
              height: '50px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid var(--neon-cyan)',
              borderRadius: '12px',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
            }}
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}

export function MiniGame({ game }: MiniGameProps) {
  const { endGame } = usePixelPalStore()

  return (
    <div
      className="minigame-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.95)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
        animation: 'fadeIn 0.3s ease',
      }}
    >
      {game === 'snake' && <SnakeGame onClose={endGame} />}
    </div>
  )
}
