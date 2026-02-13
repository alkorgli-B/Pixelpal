import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type PetMood = 'happy' | 'hungry' | 'sad' | 'sleepy' | 'excited' | 'sick'
export type PetStage = 'egg' | 'baby' | 'child' | 'teen' | 'adult'

export interface PetStats {
  hunger: number
  happiness: number
  energy: number
  health: number
  xp: number
  level: number
}

export interface PixelPalState {
  name: string
  stage: PetStage
  mood: PetMood
  stats: PetStats
  lastFed: number
  lastPlayed: number
  bornAt: number
  roomColor: string
  roomTheme: 'neon' | 'pastel' | 'retro' | 'cyber'
  furniture: string[]
  isSleeping: boolean
  isPlaying: boolean
  currentGame: string | null
  messages: string[]
}

interface PixelPalContextType extends PixelPalState {
  setName: (name: string) => void
  feed: () => void
  play: () => void
  sleep: () => void
  wakeUp: () => void
  pet: () => void
  clean: () => void
  addXp: (amount: number) => void
  setMood: (mood: PetMood) => void
  setRoomColor: (color: string) => void
  setRoomTheme: (theme: 'neon' | 'pastel' | 'retro' | 'cyber') => void
  addMessage: (message: string) => void
  startGame: (game: string) => void
  endGame: () => void
  updateStats: () => void
}

const initialStats: PetStats = {
  hunger: 80,
  happiness: 70,
  energy: 90,
  health: 100,
  xp: 0,
  level: 1,
}

const initialState: PixelPalState = {
  name: 'Pixel',
  stage: 'baby',
  mood: 'happy',
  stats: initialStats,
  lastFed: Date.now(),
  lastPlayed: Date.now(),
  bornAt: Date.now(),
  roomColor: '#FF00FF',
  roomTheme: 'neon',
  furniture: ['bed', 'lamp'],
  isSleeping: false,
  isPlaying: false,
  currentGame: null,
  messages: ['Welcome to PixelPal!'],
}

const PixelPalContext = createContext<PixelPalContextType | null>(null)

export function PixelPalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PixelPalState>(() => {
    const saved = localStorage.getItem('pixelpal-storage')
    if (saved) {
      return { ...initialState, ...JSON.parse(saved) }
    }
    return initialState
  })

  const setName = useCallback((name: string) => {
    setState(prev => {
      const newState = { ...prev, name }
      localStorage.setItem('pixelpal-storage', JSON.stringify(newState))
      return newState
    })
  }, [])

  const feed = useCallback(() => {
    setState(prev => {
      if (prev.isSleeping) return prev
      if (navigator.vibrate) navigator.vibrate([50, 30, 50])
      
      const newState = {
        ...prev,
        stats: {
          ...prev.stats,
          hunger: Math.min(100, prev.stats.hunger + 30),
          health: Math.min(100, prev.stats.health + 5),
        },
        lastFed: Date.now(),
        mood: 'happy' as PetMood,
        messages: [...prev.messages.slice(-9), 'Yummy!'],
      }
      localStorage.setItem('pixelpal-storage', JSON.stringify(newState))
      return newState
    })
  }, [])

  const play = useCallback(() => {
    setState(prev => {
      if (prev.isSleeping || prev.stats.energy < 20) return prev
      if (navigator.vibrate) navigator.vibrate([30, 20, 30, 20, 30])
      
      const newState = {
        ...prev,
        stats: {
          ...prev.stats,
          happiness: Math.min(100, prev.stats.happiness + 20),
          energy: Math.max(0, prev.stats.energy - 15),
          hunger: Math.max(0, prev.stats.hunger - 10),
        },
        lastPlayed: Date.now(),
        mood: 'excited' as PetMood,
        messages: [...prev.messages.slice(-9), 'That was fun!'],
      }
      localStorage.setItem('pixelpal-storage', JSON.stringify(newState))
      return newState
    })
  }, [])

  const sleep = useCallback(() => {
    if (navigator.vibrate) navigator.vibrate([100, 50, 100])
    setState(prev => {
      const newState = {
        ...prev,
        isSleeping: true,
        mood: 'sleepy' as PetMood,
        messages: [...prev.messages.slice(-9), 'Goodnight...'],
      }
      localStorage.setItem('pixelpal-storage', JSON.stringify(newState))
      return newState
    })
  }, [])

  const wakeUp = useCallback(() => {
    if (navigator.vibrate) navigator.vibrate([50, 100, 50])
    setState(prev => {
      const newState = {
        ...prev,
        isSleeping: false,
        stats: {
          ...prev.stats,
          energy: 100,
        },
        mood: 'happy' as PetMood,
        messages: [...prev.messages.slice(-9), 'Good morning!'],
      }
      localStorage.setItem('pixelpal-storage', JSON.stringify(newState))
      return newState
    })
  }, [])

  const pet = useCallback(() => {
    setState(prev => {
      if (prev.isSleeping) return prev
      if (navigator.vibrate) navigator.vibrate(20)
      
      const newState = {
        ...prev,
        stats: {
          ...prev.stats,
          happiness: Math.min(100, prev.stats.happiness + 10),
        },
        mood: 'happy' as PetMood,
        messages: [...prev.messages.slice(-9), 'Hehe, that tickles!'],
      }
      localStorage.setItem('pixelpal-storage', JSON.stringify(newState))
      return newState
    })
  }, [])

  const clean = useCallback(() => {
    setState(prev => {
      if (prev.isSleeping) return prev
      if (navigator.vibrate) navigator.vibrate([40, 40, 40])
      
      const newState = {
        ...prev,
        stats: {
          ...prev.stats,
          health: Math.min(100, prev.stats.health + 10),
        },
        messages: [...prev.messages.slice(-9), 'Sparkling clean!'],
      }
      localStorage.setItem('pixelpal-storage', JSON.stringify(newState))
      return newState
    })
  }, [])

  const addXp = useCallback((amount: number) => {
    setState(prev => {
      const newXp = prev.stats.xp + amount
      let newLevel = prev.stats.level
      let newStage = prev.stage
      
      if (newXp >= prev.stats.level * 100) {
        newLevel = prev.stats.level + 1
        if (newLevel === 5) newStage = 'child'
        if (newLevel === 10) newStage = 'teen'
        if (newLevel === 20) newStage = 'adult'
      }
      
      const newState = {
        ...prev,
        stats: {
          ...prev.stats,
          xp: newXp,
          level: newLevel,
        },
        stage: newStage,
      }
      localStorage.setItem('pixelpal-storage', JSON.stringify(newState))
      return newState
    })
  }, [])

  const setMood = useCallback((mood: PetMood) => {
    setState(prev => {
      const newState = { ...prev, mood }
      localStorage.setItem('pixelpal-storage', JSON.stringify(newState))
      return newState
    })
  }, [])

  const setRoomColor = useCallback((roomColor: string) => {
    setState(prev => {
      const newState = { ...prev, roomColor }
      localStorage.setItem('pixelpal-storage', JSON.stringify(newState))
      return newState
    })
  }, [])

  const setRoomTheme = useCallback((roomTheme: 'neon' | 'pastel' | 'retro' | 'cyber') => {
    setState(prev => {
      const newState = { ...prev, roomTheme }
      localStorage.setItem('pixelpal-storage', JSON.stringify(newState))
      return newState
    })
  }, [])

  const addMessage = useCallback((message: string) => {
    setState(prev => {
      const newState = {
        ...prev,
        messages: [...prev.messages.slice(-9), message],
      }
      localStorage.setItem('pixelpal-storage', JSON.stringify(newState))
      return newState
    })
  }, [])

  const startGame = useCallback((game: string) => {
    setState(prev => {
      const newState = {
        ...prev,
        currentGame: game,
        isPlaying: true,
      }
      localStorage.setItem('pixelpal-storage', JSON.stringify(newState))
      return newState
    })
  }, [])

  const endGame = useCallback(() => {
    setState(prev => {
      const newState = {
        ...prev,
        currentGame: null,
        isPlaying: false,
      }
      localStorage.setItem('pixelpal-storage', JSON.stringify(newState))
      return newState
    })
  }, [])

  const updateStats = useCallback(() => {
    setState(prev => {
      const now = Date.now()
      const hoursSinceFed = (now - prev.lastFed) / (1000 * 60 * 60)
      const hoursSincePlayed = (now - prev.lastPlayed) / (1000 * 60 * 60)
      
      let newStats = { ...prev.stats }
      let newMood: PetMood = prev.stats.happiness > 70 ? 'happy' : prev.stats.happiness > 40 ? 'sleepy' : 'sad'
      
      if (!prev.isSleeping) {
        newStats.hunger = Math.max(0, prev.stats.hunger - hoursSinceFed * 5)
        newStats.happiness = Math.max(0, prev.stats.happiness - hoursSincePlayed * 3)
        newStats.energy = Math.max(0, prev.stats.energy - 0.5)
      }
      
      if (newStats.hunger < 20 || newStats.happiness < 20) {
        newStats.health = Math.max(0, newStats.health - 1)
        newMood = 'sick'
      }
      
      if (newStats.hunger < 30) newMood = 'hungry'
      
      const newState = {
        ...prev,
        stats: newStats,
        mood: newMood,
      }
      localStorage.setItem('pixelpal-storage', JSON.stringify(newState))
      return newState
    })
  }, [])

  const contextValue: PixelPalContextType = {
    ...state,
    setName,
    feed,
    play,
    sleep,
    wakeUp,
    pet,
    clean,
    addXp,
    setMood,
    setRoomColor,
    setRoomTheme,
    addMessage,
    startGame,
    endGame,
    updateStats,
  }

  return (
    <PixelPalContext.Provider value={contextValue}>
      {children}
    </PixelPalContext.Provider>
  )
}

export function usePixelPalStore() {
  const context = useContext(PixelPalContext)
  if (!context) {
    throw new Error('usePixelPalStore must be used within PixelPalProvider')
  }
  return context
}
