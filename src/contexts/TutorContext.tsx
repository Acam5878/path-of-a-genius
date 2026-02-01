import { createContext, useContext, useState, ReactNode } from 'react';

interface TutorMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface LessonContext {
  geniusId: string;
  geniusName: string;
  subjectId: string;
  subjectName: string;
  lessonId?: string;
  lessonTitle?: string;
  lessonContent?: string;
}

interface TutorContextType {
  isOpen: boolean;
  openTutor: () => void;
  closeTutor: () => void;
  messages: TutorMessage[];
  addMessage: (message: TutorMessage) => void;
  clearMessages: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  lessonContext: LessonContext | null;
  setLessonContext: (context: LessonContext | null) => void;
  sendMessage: (content: string) => Promise<void>;
}

const TutorContext = createContext<TutorContextType | null>(null);

export const useTutor = () => {
  const context = useContext(TutorContext);
  if (!context) {
    throw new Error('useTutor must be used within a TutorProvider');
  }
  return context;
};

interface TutorProviderProps {
  children: ReactNode;
}

export const TutorProvider = ({ children }: TutorProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<TutorMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lessonContext, setLessonContext] = useState<LessonContext | null>(null);

  const openTutor = () => setIsOpen(true);
  const closeTutor = () => setIsOpen(false);

  const addMessage = (message: TutorMessage) => {
    setMessages(prev => [...prev, message]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const sendMessage = async (content: string) => {
    // Add user message
    const userMessage: TutorMessage = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-tutor`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: [...messages, userMessage],
            context: lessonContext,
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again in a moment.');
        }
        if (response.status === 402) {
          throw new Error('AI credits exhausted. Please try again later.');
        }
        throw new Error('Failed to get response from tutor');
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let assistantContent = '';
      let assistantMessageAdded = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta?.content;
              if (delta) {
                assistantContent += delta;
                
                // Update or add assistant message
                setMessages(prev => {
                  if (!assistantMessageAdded) {
                    assistantMessageAdded = true;
                    return [...prev, { role: 'assistant', content: assistantContent }];
                  }
                  return prev.map((msg, i) => 
                    i === prev.length - 1 && msg.role === 'assistant'
                      ? { ...msg, content: assistantContent }
                      : msg
                  );
                });
              }
            } catch {
              // Ignore parse errors for partial JSON
            }
          }
        }
      }
    } catch (error) {
      console.error('Tutor error:', error);
      addMessage({
        role: 'assistant',
        content: error instanceof Error 
          ? error.message 
          : 'Sorry, I encountered an error. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TutorContext.Provider
      value={{
        isOpen,
        openTutor,
        closeTutor,
        messages,
        addMessage,
        clearMessages,
        isLoading,
        setIsLoading,
        lessonContext,
        setLessonContext,
        sendMessage,
      }}
    >
      {children}
    </TutorContext.Provider>
  );
};
