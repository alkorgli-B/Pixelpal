interface ChatBubbleProps {
  message: string
  delay?: number
}

export function ChatBubble({ message }: ChatBubbleProps) {
  return (
    <div
      className="chat-bubble"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 0, 255, 0.9), rgba(191, 0, 255, 0.9))',
        padding: '12px 16px',
        borderRadius: '16px 16px 16px 4px',
        color: 'white',
        fontSize: '14px',
        fontFamily: 'var(--retro-font)',
        maxWidth: '80%',
        alignSelf: 'flex-start',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 4px 20px rgba(255, 0, 255, 0.3)',
        position: 'relative',
        backdropFilter: 'blur(10px)',
        animation: 'popIn 0.3s ease',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: -8,
          left: 0,
          width: 0,
          height: 0,
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderTop: '8px solid rgba(255, 0, 255, 0.9)',
        }}
      />
      <span>{message}</span>
      <div
        style={{
          position: 'absolute',
          top: -5,
          right: -5,
          fontSize: '12px',
          animation: 'spin 2s linear infinite',
        }}
      >
        ✨
      </div>
    </div>
  )
}
