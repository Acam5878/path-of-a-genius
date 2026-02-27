import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Trophy, Brain, ChevronLeft, Lock, Crown, Zap, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { geniusCognitiveProfiles, getStandardGeniuses, getPremiumGeniuses, type GeniusCognitiveProfile } from '@/data/geniusCognitiveProfiles';
import { generateChallengeQuestions, simulateBotAnswers, calculateChallengeScore, type BotAnswer } from '@/data/challengeEngine';
import { getGeniusPortrait } from '@/data/portraits';
import type { IQQuestion } from '@/data/iqTypes';
import { useNavigate } from 'react-router-dom';

type ChallengeState = 'select' | 'playing' | 'results';

const CHALLENGE_KEY = 'genius-challenge-played';

const Challenge = () => {
  const { user } = useAuth();
  const { isPremium, showPaywall } = useSubscription();
  const navigate = useNavigate();

  const [state, setState] = useState<ChallengeState>('select');
  const [opponent, setOpponent] = useState<GeniusCognitiveProfile | null>(null);
  const [questions, setQuestions] = useState<IQQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [myAnswers, setMyAnswers] = useState<Map<string, string | number>>(new Map());
  const [botAnswers, setBotAnswers] = useState<BotAnswer[]>([]);
  const [myScore, setMyScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [startTime] = useState(Date.now());
  const [questionStart, setQuestionStart] = useState(Date.now());
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);
  
  const hasPlayed = localStorage.getItem(CHALLENGE_KEY) === 'true';
  const canPlay = user || !hasPlayed;

  const startChallenge = useCallback((profile: GeniusCognitiveProfile) => {
    if (profile.difficulty === 'genius' && !isPremium) {
      showPaywall();
      return;
    }
    if (!canPlay) {
      navigate('/auth');
      return;
    }

    const qs = generateChallengeQuestions();
    const bot = simulateBotAnswers(qs, profile);
    
    setOpponent(profile);
    setQuestions(qs);
    setBotAnswers(bot);
    setCurrentQ(0);
    setMyAnswers(new Map());
    setMyScore(0);
    setBotScore(0);
    setSelectedAnswer(null);
    setShowCorrect(false);
    setQuestionStart(Date.now());
    setState('playing');
  }, [isPremium, showPaywall, canPlay, navigate]);

  const handleAnswer = useCallback((answer: string) => {
    if (showCorrect) return;
    setSelectedAnswer(answer);
    setShowCorrect(true);

    const q = questions[currentQ];
    const isCorrect = String(answer) === String(q.correctAnswer);
    const botResult = botAnswers[currentQ];

    const newMyScore = myScore + (isCorrect ? q.points : 0);
    const newBotScore = botScore + (botResult.isCorrect ? q.points : 0);
    setMyScore(newMyScore);
    setBotScore(newBotScore);

    setMyAnswers(prev => new Map(prev).set(q.id, answer));

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(prev => prev + 1);
        setSelectedAnswer(null);
        setShowCorrect(false);
        setQuestionStart(Date.now());
      } else {
        if (!user) localStorage.setItem(CHALLENGE_KEY, 'true');
        setState('results');
      }
    }, 1500);
  }, [currentQ, questions, botAnswers, myScore, botScore, showCorrect, user]);

  // --- RENDER ---

  if (state === 'select') {
    return (
      <AppLayout>
        <Header title="Challenge a Genius" />
        <div className="px-4 pb-24 max-w-2xl mx-auto space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2 pt-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-medium">
              <Swords className="w-4 h-4" /> Head-to-Head IQ Challenge
            </div>
            <h1 className="text-2xl font-bold font-['Playfair_Display'] text-foreground">
              Test Your Mind Against History's Greatest
            </h1>
            <p className="text-sm text-muted-foreground">
              15 questions. You vs a genius bot with real cognitive strengths & weaknesses.
            </p>
            {!user && hasPlayed && (
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 text-sm text-accent-foreground">
                <Lock className="w-4 h-4 inline mr-1" />
                Sign up free to keep challenging geniuses
              </div>
            )}
          </motion.div>

          {/* Standard opponents */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Standard</h2>
            {getStandardGeniuses().map((g, i) => (
              <OpponentCard key={g.geniusId} profile={g} index={i} onSelect={startChallenge} locked={!canPlay} />
            ))}
          </div>

          {/* Genius tier */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-secondary uppercase tracking-wider flex items-center gap-1">
              <Crown className="w-4 h-4" /> Genius Tier
              {!isPremium && <Badge variant="outline" className="ml-2 text-xs border-secondary/40 text-secondary">Premium</Badge>}
            </h2>
            {getPremiumGeniuses().map((g, i) => (
              <OpponentCard key={g.geniusId} profile={g} index={i + 5} onSelect={startChallenge} locked={!isPremium} />
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  if (state === 'playing' && opponent) {
    const q = questions[currentQ];
    const botResult = botAnswers[currentQ];
    const progress = ((currentQ + (showCorrect ? 1 : 0)) / questions.length) * 100;
    const isCorrect = selectedAnswer ? String(selectedAnswer) === String(q.correctAnswer) : null;

    return (
      <AppLayout>
        <div className="px-4 pb-24 max-w-2xl mx-auto pt-4">
          {/* Score bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold text-sm">
                You
              </div>
              <span className="font-['Space_Mono'] text-lg font-bold text-foreground">{myScore}</span>
            </div>
            <div className="text-center">
              <span className="text-xs text-muted-foreground">Q{currentQ + 1}/15</span>
              <Progress value={progress} className="w-24 h-1.5 mt-1" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-['Space_Mono'] text-lg font-bold text-foreground">{botScore}</span>
              <GeniusAvatar geniusId={opponent.geniusId} name={opponent.name} size="sm" />
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
            >
              <Card className="border-border bg-card mb-4">
                <CardContent className="p-5 space-y-4">
                  <p className="text-foreground font-medium leading-relaxed">{q.question}</p>
                  
                  <div className="space-y-2">
                    {(q.options || []).map((opt, oi) => {
                      const isSelected = selectedAnswer === opt;
                      const isAnswer = String(opt) === String(q.correctAnswer);
                      let optClass = 'border-border bg-muted/30 hover:bg-muted/60 text-foreground';
                      if (showCorrect && isAnswer) optClass = 'border-success/60 bg-success/10 text-success-foreground';
                      else if (showCorrect && isSelected && !isAnswer) optClass = 'border-destructive/60 bg-destructive/10 text-destructive';
                      
                      return (
                        <button
                          key={oi}
                          onClick={() => handleAnswer(opt)}
                          disabled={showCorrect}
                          className={`w-full text-left p-3 rounded-lg border transition-all text-sm ${optClass}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {/* Bot result reveal */}
                  {showCorrect && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 pt-2 border-t border-border"
                    >
                      <GeniusAvatar geniusId={opponent.geniusId} name={opponent.name} size="xs" />
                      <span className="text-sm text-muted-foreground">
                        {opponent.name.split(' ').pop()}
                      </span>
                      {botResult.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-success" />
                      ) : (
                        <XCircle className="w-4 h-4 text-destructive" />
                      )}
                      <span className="text-xs text-muted-foreground ml-auto">
                        {botResult.timeSpent}s
                      </span>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </AppLayout>
    );
  }

  if (state === 'results' && opponent) {
    const won = myScore > botScore;
    const tied = myScore === botScore;
    const maxScore = questions.reduce((s, q) => s + q.points, 0);

    return (
      <AppLayout>
        <Header title="Challenge Results" />
        <div className="px-4 pb-24 max-w-2xl mx-auto pt-4 space-y-6">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-3">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${won ? 'bg-secondary/20 text-secondary' : tied ? 'bg-muted text-muted-foreground' : 'bg-accent/20 text-accent-foreground'}`}>
              {won ? <Trophy className="w-5 h-5" /> : tied ? <Swords className="w-5 h-5" /> : <Brain className="w-5 h-5" />}
              {won ? 'Victory!' : tied ? 'Draw!' : 'Defeated'}
            </div>

            <h2 className="text-xl font-bold font-['Playfair_Display'] text-foreground">
              {won ? opponent.defeatQuote : tied ? "A battle of equals." : opponent.victoryQuote}
            </h2>
          </motion.div>

          {/* Scores */}
          <Card className="border-border bg-card">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="text-center flex-1">
                  <p className="text-xs text-muted-foreground mb-1">You</p>
                  <p className="text-3xl font-bold font-['Space_Mono'] text-foreground">{myScore}</p>
                  <p className="text-xs text-muted-foreground">/ {maxScore}</p>
                </div>
                <div className="text-2xl text-muted-foreground font-bold">vs</div>
                <div className="text-center flex-1">
                  <p className="text-xs text-muted-foreground mb-1">{opponent.name}</p>
                  <GeniusAvatar geniusId={opponent.geniusId} name={opponent.name} size="md" className="mx-auto mb-1" />
                  <p className="text-3xl font-bold font-['Space_Mono'] text-foreground">{botScore}</p>
                  <p className="text-xs text-muted-foreground">/ {maxScore}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="space-y-3">
            <Button onClick={() => setState('select')} className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Swords className="w-4 h-4 mr-2" /> Challenge Again
            </Button>
            {!user && (
              <Button onClick={() => navigate('/auth')} variant="outline" className="w-full border-secondary/40 text-secondary">
                Sign up to track your wins
              </Button>
            )}
          </div>
        </div>
      </AppLayout>
    );
  }

  return null;
};

// --- Sub-components ---

function OpponentCard({ profile, index, onSelect, locked }: {
  profile: GeniusCognitiveProfile;
  index: number;
  onSelect: (p: GeniusCognitiveProfile) => void;
  locked: boolean;
}) {
  const portrait = getGeniusPortrait(profile.geniusId);
  const topCategories = Object.entries(profile.accuracy)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([cat]) => cat.replace('-', ' '));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <button
        onClick={() => onSelect(profile)}
        className="w-full text-left"
      >
        <Card className={`border-border bg-card hover:bg-muted/30 transition-all ${locked ? 'opacity-60' : ''}`}>
          <CardContent className="p-4 flex items-center gap-4">
            <GeniusAvatar geniusId={profile.geniusId} name={profile.name} size="md" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground text-sm">{profile.name}</h3>
                {locked && <Lock className="w-3.5 h-3.5 text-muted-foreground" />}
              </div>
              <p className="text-xs text-secondary">{profile.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Strong in: {topCategories.join(', ')}
              </p>
            </div>
            <Swords className="w-5 h-5 text-secondary shrink-0" />
          </CardContent>
        </Card>
      </button>
    </motion.div>
  );
}

function GeniusAvatar({ geniusId, name, size = 'sm', className = '' }: {
  geniusId: string; name: string; size?: 'xs' | 'sm' | 'md'; className?: string;
}) {
  const portrait = getGeniusPortrait(geniusId);
  const sizeClass = size === 'xs' ? 'h-6 w-6' : size === 'sm' ? 'h-8 w-8' : 'h-12 w-12';
  return (
    <Avatar className={`${sizeClass} ${className}`}>
      {portrait && <AvatarImage src={portrait} alt={name} />}
      <AvatarFallback className="bg-muted text-muted-foreground text-xs">
        {name.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
}

export default Challenge;
