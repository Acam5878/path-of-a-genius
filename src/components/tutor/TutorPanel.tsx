import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Brain, Loader2 } from 'lucide-react';
import { useTutor } from '@/contexts/TutorContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

export const TutorPanel = () => {
  const { 
    isOpen, 
    closeTutor, 
    messages, 
    sendMessage, 
    isLoading, 
    lessonContext,
    clearMessages 
  } = useTutor();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const message = input.trim();
    setInput('');
    await sendMessage(message);
  };

  const suggestedQuestions = lessonContext ? [
    `Explain the key concepts of ${lessonContext.lessonTitle || lessonContext.subjectName}`,
    `How did ${lessonContext.geniusName} approach this topic?`,
    `Give me a practice question about this lesson`,
  ] : [
    'How should I structure my learning?',
    'What makes a genius different from others?',
    'Help me understand classical education',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - only covers bottom portion to not interfere with lesson modal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              closeTutor();
            }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[55]"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed inset-x-0 bottom-0 z-[56] bg-card border-t border-border rounded-t-3xl max-h-[60vh] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                  <Brain className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground">AI Tutor</h3>
                  {lessonContext && (
                    <p className="text-xs text-muted-foreground">
                      Context: {lessonContext.lessonTitle || lessonContext.subjectName}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearMessages}
                    className="text-xs text-muted-foreground"
                  >
                    Clear
                  </Button>
                )}
                <Button variant="ghost" size="icon" onClick={closeTutor}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4 min-h-0">
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <Brain className="w-12 h-12 text-secondary/50 mx-auto mb-4" />
                  <h4 className="font-heading font-semibold text-foreground mb-2">
                    Ask me anything!
                  </h4>
                  <p className="text-sm text-muted-foreground mb-6">
                    I'm here to help you learn like the geniuses of history.
                  </p>
                  
                  {/* Suggested questions */}
                  <div className="space-y-2">
                    {suggestedQuestions.map((question, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(question)}
                        disabled={isLoading}
                        className="w-full text-left p-3 bg-muted/50 hover:bg-muted rounded-xl text-sm text-foreground transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((message, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex",
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-3 break-words overflow-hidden",
                        message.role === 'user'
                          ? 'bg-secondary text-secondary-foreground'
                          : 'bg-muted text-foreground'
                      )}
                    >
                      {message.role === 'assistant' ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none break-words">
                          <ReactMarkdown>{message.content.replace(/\$[^$]*\$/g, (match) => {
                            // Strip LaTeX delimiters and show plain text
                            return match.slice(1, -1).replace(/\\varsigma|\\sigma|\\[a-zA-Z]+/g, (cmd) => {
                              const map: Record<string, string> = { '\\varsigma': 'ς', '\\sigma': 'σ', '\\alpha': 'α', '\\beta': 'β', '\\gamma': 'γ', '\\delta': 'δ', '\\epsilon': 'ε', '\\pi': 'π', '\\theta': 'θ', '\\lambda': 'λ', '\\mu': 'μ', '\\phi': 'φ', '\\omega': 'ω' };
                              return map[cmd] || cmd.slice(1);
                            });
                          })}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-sm break-words">{message.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
              
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-border shrink-0">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask your tutor..."
                  disabled={isLoading}
                  className="flex-1 bg-muted rounded-full px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isLoading}
                  className="rounded-full bg-secondary hover:bg-secondary/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
