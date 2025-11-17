import { useEffect, useMemo, useState } from 'react';
import type { ChatMessage } from '../../../shared/types';
import { chatApi } from '../services/api';
import './MeatChat.css';

type LocalMessage = ChatMessage & { id: string };

const STORAGE_KEY = 'meatChatMessages';
const MESSAGE_LIMIT = 50;

const WELCOME_MESSAGE: LocalMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Hi! I am your meat coach. Ask me about lean cuts, ideal cooking methods, or which protein fits your macros today.',
};

const clampMessages = (list: LocalMessage[]) => list.slice(-MESSAGE_LIMIT);

const loadInitialMessages = () => {
  if (typeof window === 'undefined') return [WELCOME_MESSAGE];
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length) {
        return parsed as LocalMessage[];
      }
    }
  } catch (err) {
    console.warn('Failed to load chat history from storage', err);
  }
  return [WELCOME_MESSAGE];
};

export function MeatChat() {
  const [messages, setMessages] = useState<LocalMessage[]>(loadInitialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const messageProgress = `${messages.length}/${MESSAGE_LIMIT}`;

  const condensedHistory = useMemo<ChatMessage[]>(() => {
    return messages.slice(-10).map(({ role, content }) => ({ role, content }));
  }, [messages]);

  const clearMessages = () => {
    setMessages([WELCOME_MESSAGE]);
    setError('');
    setInput('');
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: LocalMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
    };

    const nextMessages = clampMessages([...messages, userMessage]);
    setMessages(nextMessages);
    setInput('');
    setError('');
    setLoading(true);

    try {
      const { reply } = await chatApi.askMeatCoach(
        trimmed,
        nextMessages.map(({ role, content }) => ({ role, content })),
      );
      const assistantMessage: LocalMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: reply.trim(),
      };
      setMessages((prev) => clampMessages([...prev, assistantMessage]));
    } catch (err: any) {
      console.error('Failed to fetch chat response:', err);
      const fallback: LocalMessage = {
        id: `assistant-error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I could not reach the meat coach. Please try again in a moment.',
      };
      setMessages((prev) => clampMessages([...prev, fallback]));
      setError(err.response?.data?.message || 'Chat service unavailable.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    sendMessage();
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (err) {
      console.warn('Failed to write chat history to storage', err);
    }
  }, [messages]);

  return (
    <section className="chat-container">
      <div className="chat-header">
        <div>
          <h2>Meat Chat</h2>
          <p>Chat with the AI butcher to pick the right protein for your next meal.</p>
        </div>
        <div className="chat-actions">
          <span className="history-hint">
            Sends last {condensedHistory.length} messages for context · Stored {messageProgress}
          </span>
          <div className={`chat-menu ${menuOpen ? 'open' : ''}`}>
            <button type="button" className="hamburger-button" onClick={toggleMenu} aria-label="Chat options">
              ☰
            </button>
            {menuOpen && (
              <div className="chat-menu-dropdown">
                <button type="button" onClick={clearMessages} disabled={loading}>
                  Clear chat
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="chat-log">
        {messages.map((message) => (
          <div key={message.id} className={`chat-message ${message.role}`}>
            <div className="message-role">{message.role === 'user' ? 'You' : 'Coach'}</div>
            <p>{message.content}</p>
          </div>
        ))}
      </div>

      {error && <div className="chat-error">{error}</div>}

      <form className="chat-input-row" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask about lean steak, grill tips, or macro-friendly meats..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Thinking...' : 'Ask'}
        </button>
      </form>
    </section>
  );
}

