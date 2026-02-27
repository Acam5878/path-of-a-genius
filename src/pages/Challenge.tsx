import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Trophy, Brain, Lock, Crown, Zap, Clock, Flame, Users, TrendingUp, TrendingDown, ArrowRight, BookOpen, CheckCircle2, XCircle } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { getBotOpponents, getGeniusOpponents, type GeniusCognitiveProfile } from '@/data/geniusCognitiveProfiles';
import { generateChallengeQuestions, simulateBotBlitz, getQuestionCategory, BLITZ_DURATION } from '@/data/challengeEngine';
import { getGeniusPortrait } from '@/data/portraits';
import type { IQQuestion, IQCategory } from '@/data/iqTypes';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useIQPersistence } from '@/hooks/useIQPersistence';
import { MatchupScreen } from '@/components/challenge/MatchupScreen';

type ChallengeState = 'select' | 'matchup' | 'playing' | 'results';
type CategoryStats = Record<string, { correct: number; total: number }>;

const CHALLENGE_KEY = 'genius-challenge-played';

// Map IQ categories to Path modules
const CATEGORY_TO_MODULE: Record<string, { moduleId: string; moduleName: string; icon: string }> = {
  verbal: { moduleId: 'ancient-greek', moduleName: 'Ancient Greek & Latin', icon: 'α' },
  numerical: { moduleId: 'mathematics', moduleName: 'Mathematics', icon: 'Σ' },
  logical: { moduleId: 'logic', moduleName: 'Logic', icon: '⊢' },
  spatial: { moduleId: 'natural-philosophy', moduleName: 'Natural Philosophy', icon: '🔭' },
  'pattern-recognition': { moduleId: 'chemistry', moduleName: 'Chemistry & Patterns', icon: '⚗️' },
  memory: { moduleId: 'rhetoric', moduleName: 'Rhetoric & Memory', icon: '🏛️' },
};

const CATEGORY_LABELS: Record<string, string> = {
  verbal: 'Verbal',
  numerical: 'Numerical',
  logical: 'Logical',
  spatial: 'Spatial',
  'pattern-recognition': 'Pattern Recognition',
  memory: 'Memory',
};

const Challenge = () => {
  const { user } = useAuth();
  const { isPremium, showPaywall } = useSubscription();
  const { profile: iqProfile } = useIQPersistence();
  const navigate = useNavigate();

  const [state, setState] = useState<ChallengeState>('select');
  const [opponent, setOpponent] = useState<GeniusCognitiveProfile | null>(null);
  const [questions, setQuestions] = useState<IQQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [myScore, setMyScore] = useState(0);
  const [myCorrect, setMyCorrect] = useState(0);
  const [myTotal, setMyTotal] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(BLITZ_DURATION);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [botResult, setBotResult] = useState<{ correctCount: number; totalAnswered: number; score: number } | null>(null);
  const [comboFlash, setComboFlash] = useState(false);
  const [categoryStats, setCategoryStats] = useState<CategoryStats>({});
  const [memoryPhase, setMemoryPhase] = useState<'memorize' | 'recall' | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  
  const hasPlayed = localStorage.getItem(CHALLENGE_KEY) === 'true';
  const canPlay = user || !hasPlayed;

  // Matchup complete callback
  const handleMatchupComplete = useCallback(() => {
    setState('playing');
    startTimeRef.current = Date.now();
  }, []);

  // Main timer
  useEffect(() => {
    if (state !== 'playing') return;
    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const remaining = Math.max(0, BLITZ_DURATION - elapsed);
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(timerRef.current!);
        finishGame();
      }
    }, 100);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [state]);

  const finishGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!user) localStorage.setItem(CHALLENGE_KEY, 'true');
    setState('results');
  }, [user]);

  // Save challenge results to database
  useEffect(() => {
    if (state !== 'results' || !user || !opponent || !botResult) return;
    const won = myScore > botResult.score;
    supabase.from('challenge_results').insert({
      user_id: user.id,
      opponent_id: opponent.geniusId,
      opponent_name: opponent.name,
      opponent_iq: opponent.iq,
      user_score: myScore,
      bot_score: botResult.score,
      user_correct: myCorrect,
      user_total: myTotal,
      bot_correct: botResult.correctCount,
      bot_total: botResult.totalAnswered,
      max_combo: maxCombo,
      won,
      category_breakdown: categoryStats,
    } as any).then(() => {});
  }, [state, user, opponent, botResult, myScore, myCorrect, myTotal, maxCombo, categoryStats]);

  const startChallenge = useCallback((profile: GeniusCognitiveProfile) => {
    if (profile.difficulty !== 'opponent' && !isPremium) {
      showPaywall();
      return;
    }
    if (!canPlay) {
      navigate('/auth');
      return;
    }

    const qs = generateChallengeQuestions();
    const bot = simulateBotBlitz(qs, profile);
    
    setOpponent(profile);
    setQuestions(qs);
    setBotResult(bot);
    setCurrentQ(0);
    setMyScore(0);
    setMyCorrect(0);
    setMyTotal(0);
    setCombo(0);
    setMaxCombo(0);
    setTimeLeft(BLITZ_DURATION);
    setSelectedAnswer(null);
    setShowCorrect(false);
    setCategoryStats({});
    setMemoryPhase(qs[0]?.type === 'memory-recall' ? 'memorize' : null);
    setState('matchup');
  }, [isPremium, showPaywall, canPlay, navigate]);

  const handleAnswer = useCallback((answer: string) => {
    if (showCorrect || state !== 'playing') return;
    setSelectedAnswer(answer);
    setShowCorrect(true);

    const q = questions[currentQ];
    const isCorrect = String(answer) === String(q.correctAnswer);
    const category = getQuestionCategory(q);

    // Track category stats
    setCategoryStats(prev => {
      const existing = prev[category] || { correct: 0, total: 0 };
      return {
        ...prev,
        [category]: {
          correct: existing.correct + (isCorrect ? 1 : 0),
          total: existing.total + 1,
        },
      };
    });

    if (isCorrect) {
      const newCombo = combo + 1;
      const multiplier = Math.min(newCombo, 5);
      setCombo(newCombo);
      setMaxCombo(m => Math.max(m, newCombo));
      setMyScore(s => s + q.points * multiplier);
      setMyCorrect(c => c + 1);
      setComboFlash(true);
      setTimeout(() => setComboFlash(false), 300);
      if (navigator.vibrate) navigator.vibrate(30);
    } else {
      setCombo(0);
      if (navigator.vibrate) navigator.vibrate([50, 30, 50]);
    }
    setMyTotal(t => t + 1);

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        const nextQ = questions[currentQ + 1];
        const nextIsMemory = nextQ?.type === 'memory-recall';
        setCurrentQ(prev => prev + 1);
        setSelectedAnswer(null);
        setShowCorrect(false);
        setMemoryPhase(nextIsMemory ? 'memorize' : null);
      } else {
        finishGame();
      }
    }, 600);
  }, [currentQ, questions, combo, showCorrect, state, finishGame]);

  // --- SELECT SCREEN ---
  if (state === 'select') {
    return (
      <AppLayout>
        <Header title="Challenge Arena" />
        <div className="px-4 pb-24 max-w-2xl mx-auto space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2 pt-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-medium">
              <Swords className="w-4 h-4" /> 60-Second IQ Blitz
            </div>
            <h1 className="text-2xl font-bold font-heading text-foreground">Choose Your Opponent</h1>
            <p className="text-sm text-muted-foreground">Race against the clock. Build combos. Prove you're smarter.</p>
            {!user && hasPlayed && (
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 text-sm text-accent-foreground">
                <Lock className="w-4 h-4 inline mr-1" /> Sign up free to keep playing
              </div>
            )}
          </motion.div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Opponents</h2>
              <Badge variant="outline" className="text-[10px] border-green-500/40 text-green-400">Free</Badge>
            </div>
            {getBotOpponents().map((g, i) => (
              <BotOpponentCard key={g.geniusId} profile={g} index={i} onSelect={startChallenge} locked={!canPlay} />
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-secondary" />
              <h2 className="text-sm font-semibold text-secondary uppercase tracking-wider">Historical Geniuses</h2>
              {!isPremium && <Badge variant="outline" className="text-[10px] border-secondary/40 text-secondary">Premium</Badge>}
            </div>
            {getGeniusOpponents().map((g, i) => (
              <GeniusOpponentCard key={g.geniusId} profile={g} index={i} onSelect={startChallenge} locked={!isPremium} />
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  // --- MATCHUP SCREEN ---
  if (state === 'matchup' && opponent) {
    return (
      <AppLayout>
        <MatchupScreen
          opponent={opponent}
          userIQ={iqProfile?.overallIQ ?? null}
          onComplete={handleMatchupComplete}
        />
      </AppLayout>
    );
  }

  // --- Helper: parse memory questions into memorize + recall parts ---
  const parseMemoryQuestion = (q: IQQuestion): { memorizeText: string; recallText: string } | null => {
    if (q.type !== 'memory-recall') return null;
    const match = q.question.match(/^(Memorize|Remember|Study)[:\s]+(.+?)\.\s+(.+)$/i);
    if (match) return { memorizeText: match[2].trim(), recallText: match[3].trim() };
    const lastDot = q.question.lastIndexOf('. ');
    if (lastDot > 0) return { memorizeText: q.question.substring(0, lastDot).trim(), recallText: q.question.substring(lastDot + 2).trim() };
    return null;
  };

  // --- PLAYING ---
  if (state === 'playing' && opponent) {
    const q = questions[currentQ];
    if (!q) { finishGame(); return null; }
    
    const timePercent = (timeLeft / BLITZ_DURATION) * 100;
    const isUrgent = timeLeft <= 10;
    const multiplier = Math.min(combo + 1, 5);
    const memoryParsed = parseMemoryQuestion(q);
    const isMemoryMemorize = memoryPhase === 'memorize' && memoryParsed;

    return (
      <AppLayout>
        <div className="px-4 pb-24 max-w-2xl mx-auto pt-2">
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Clock className={`w-4 h-4 ${isUrgent ? 'text-destructive animate-pulse' : 'text-secondary'}`} />
                <span className={`font-mono text-lg font-bold ${isUrgent ? 'text-destructive' : 'text-foreground'}`}>
                  {Math.ceil(timeLeft)}s
                </span>
              </div>
              <div className="flex items-center gap-3">
                <motion.div
                  animate={comboFlash ? { scale: [1, 1.3, 1] } : {}}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                    combo >= 5 ? 'bg-secondary/30 text-secondary' :
                    combo >= 3 ? 'bg-orange-500/20 text-orange-400' :
                    'bg-muted text-muted-foreground'
                  }`}
                >
                  <Zap className="w-3 h-3" /> ×{multiplier}
                </motion.div>
                <span className="font-mono text-sm text-muted-foreground">Q{myTotal + 1}</span>
              </div>
            </div>
            <Progress value={timePercent} className={`h-2 ${isUrgent ? '[&>div]:bg-destructive' : '[&>div]:bg-secondary'}`} />
          </div>

          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                <span className="text-xs font-bold text-secondary">You</span>
              </div>
              <span className="font-mono text-xl font-bold text-foreground">{myScore}</span>
            </div>
            <div className="text-sm text-muted-foreground font-bold">VS</div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xl font-bold text-foreground">?</span>
              <OpponentAvatar profile={opponent} size="sm" />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isMemoryMemorize ? `${q.id}-mem` : q.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.15 }}
            >
              <Card className="border-border bg-card mb-4">
                <CardContent className="p-4 space-y-3">
                  {isMemoryMemorize ? (
                    <div className="space-y-4 text-center py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Brain className="w-5 h-5 text-secondary" />
                        <span className="text-xs font-bold uppercase tracking-wider text-secondary">Memorize</span>
                      </div>
                      <motion.p 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-foreground font-heading text-lg font-semibold leading-relaxed px-2"
                      >
                        {memoryParsed.memorizeText}
                      </motion.p>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                        <Button 
                          onClick={() => setMemoryPhase('recall')}
                          className="mt-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 font-bold px-8"
                        >
                          I'm Ready
                        </Button>
                      </motion.div>
                    </div>
                  ) : (
                    <>
                      <p className="text-foreground font-medium leading-relaxed text-sm">
                        {memoryParsed ? memoryParsed.recallText : q.question}
                      </p>
                      <div className="space-y-2">
                        {(q.options || []).map((opt, oi) => {
                          const isSelected = selectedAnswer === opt;
                          const isAnswer = String(opt) === String(q.correctAnswer);
                          let optClass = 'border-border bg-muted/30 hover:bg-muted/60 text-foreground active:scale-[0.98]';
                          if (showCorrect && isAnswer) optClass = 'border-green-500/60 bg-green-500/10 text-green-400';
                          else if (showCorrect && isSelected && !isAnswer) optClass = 'border-destructive/60 bg-destructive/10 text-destructive';
                          
                          return (
                            <motion.button
                              key={oi}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => handleAnswer(opt)}
                              disabled={showCorrect}
                              className={`w-full text-left p-3 rounded-lg border transition-all text-sm ${optClass}`}
                            >
                              {opt}
                            </motion.button>
                          );
                        })}
                      </div>
                    </>
                  )}
                  {combo >= 2 && !showCorrect && !isMemoryMemorize && (
                    <div className="flex items-center gap-1 justify-center">
                      {Array.from({ length: Math.min(combo, 5) }).map((_, i) => (
                        <Flame key={i} className="w-4 h-4 text-orange-400" />
                      ))}
                      <span className="text-xs text-orange-400 font-bold ml-1">{combo} streak!</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </AppLayout>
    );
  }

  // --- RESULTS WITH MATCH ANALYSIS ---
  if (state === 'results' && opponent && botResult) {
    const won = myScore > botResult.score;
    const tied = myScore === botResult.score;
    const accuracy = myTotal > 0 ? Math.round((myCorrect / myTotal) * 100) : 0;
    const botAccuracy = botResult.totalAnswered > 0 ? Math.round((botResult.correctCount / botResult.totalAnswered) * 100) : 0;

    // Process category analysis
    const categoryAnalysis = Object.entries(categoryStats)
      .map(([cat, stats]) => ({
        category: cat,
        label: CATEGORY_LABELS[cat] || cat,
        correct: stats.correct,
        total: stats.total,
        accuracy: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
        module: CATEGORY_TO_MODULE[cat],
      }))
      .filter(c => c.total > 0)
      .sort((a, b) => b.accuracy - a.accuracy);

    const strengths = categoryAnalysis.filter(c => c.accuracy >= 70);
    const weaknesses = categoryAnalysis.filter(c => c.accuracy < 50);
    const middling = categoryAnalysis.filter(c => c.accuracy >= 50 && c.accuracy < 70);

    return (
      <AppLayout>
        <Header title="Match Analysis" />
        <div className="px-4 pb-24 max-w-2xl mx-auto pt-4 space-y-6">
          {/* Victory/Defeat banner */}
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-3">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
              won ? 'bg-secondary/20 text-secondary' : tied ? 'bg-muted text-muted-foreground' : 'bg-destructive/20 text-destructive'
            }`}>
              {won ? <Trophy className="w-5 h-5" /> : tied ? <Swords className="w-5 h-5" /> : <Brain className="w-5 h-5" />}
              {won ? 'Victory!' : tied ? 'Draw!' : 'Defeated'}
            </div>
            <h2 className="text-xl font-bold font-heading text-foreground">
              {won ? opponent.defeatQuote : tied ? "A battle of equals." : opponent.victoryQuote}
            </h2>
          </motion.div>

          {/* Score comparison */}
          <Card className="border-border bg-card overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-3 divide-x divide-border">
                <div className="p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">You</p>
                  <p className="text-3xl font-bold font-mono text-foreground">{myScore}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{myCorrect}/{myTotal} correct</p>
                  <p className="text-[10px] text-muted-foreground">{accuracy}%</p>
                </div>
                <div className="p-4 flex flex-col items-center justify-center">
                  <span className="text-lg text-muted-foreground font-bold">VS</span>
                  <div className="mt-2 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-secondary" />
                    <span className="text-[10px] text-secondary font-bold">×{maxCombo} max</span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <OpponentAvatar profile={opponent} size="sm" className="mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground mb-1">{opponent.name.split(' ').pop()}</p>
                  <p className="text-3xl font-bold font-mono text-foreground">{botResult.score}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{botResult.correctCount}/{botResult.totalAnswered}</p>
                  <p className="text-[10px] text-muted-foreground">{botAccuracy}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ── MATCH ANALYSIS ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-4 h-4 text-secondary" />
              <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-secondary">Cognitive Breakdown</h3>
            </div>

            {/* Category performance bars */}
            <Card className="border-border bg-card mb-4">
              <CardContent className="p-4 space-y-3">
                {categoryAnalysis.map((cat, i) => (
                  <motion.div
                    key={cat.category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{cat.module?.icon || '🧠'}</span>
                        <span className="text-xs font-semibold text-foreground">{cat.label}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-muted-foreground">{cat.correct}/{cat.total}</span>
                        <span className={`text-xs font-bold font-mono ${
                          cat.accuracy >= 70 ? 'text-green-400' :
                          cat.accuracy >= 50 ? 'text-orange-400' : 'text-destructive'
                        }`}>
                          {cat.accuracy}%
                        </span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          cat.accuracy >= 70 ? 'bg-green-500' :
                          cat.accuracy >= 50 ? 'bg-orange-500' : 'bg-destructive'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.accuracy}%` }}
                        transition={{ delay: 0.4 + i * 0.08, duration: 0.6, ease: 'easeOut' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Strengths */}
          {strengths.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-green-400">Your Strengths</h3>
              </div>
              <div className="space-y-2">
                {strengths.map(s => (
                  <div key={s.category} className="flex items-center gap-3 p-3 rounded-xl bg-green-500/5 border border-green-500/20">
                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground">{s.label}</p>
                      <p className="text-[10px] text-green-400">{s.accuracy}% accuracy • {s.correct}/{s.total} correct</p>
                    </div>
                    <span className="text-lg">{s.module?.icon}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Weaknesses with Train links */}
          {weaknesses.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-4 h-4 text-destructive" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-destructive">Needs Work</h3>
              </div>
              <div className="space-y-2">
                {weaknesses.map(w => (
                  <button
                    key={w.category}
                    onClick={() => {
                      if (w.module) navigate(`/the-path?module=${w.module.moduleId}&lesson=first`);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-destructive/5 border border-destructive/20 hover:bg-destructive/10 transition-all text-left"
                  >
                    <XCircle className="w-4 h-4 text-destructive shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground">{w.label}</p>
                      <p className="text-[10px] text-destructive">{w.accuracy}% accuracy • {w.correct}/{w.total} correct</p>
                      {w.module && (
                        <p className="text-[10px] text-secondary mt-0.5 flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          Train: {w.module.moduleName}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-secondary shrink-0" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Middle ground */}
          {middling.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-orange-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-orange-400">Room to Grow</h3>
              </div>
              <div className="space-y-2">
                {middling.map(m => (
                  <button
                    key={m.category}
                    onClick={() => {
                      if (m.module) navigate(`/the-path?module=${m.module.moduleId}&lesson=first`);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-orange-500/5 border border-orange-500/20 hover:bg-orange-500/10 transition-all text-left"
                  >
                    <span className="text-lg">{m.module?.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground">{m.label}</p>
                      <p className="text-[10px] text-orange-400">{m.accuracy}% accuracy</p>
                      {m.module && (
                        <p className="text-[10px] text-secondary mt-0.5 flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          Train: {m.module.moduleName}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-secondary shrink-0" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-card border border-border rounded-xl p-3 text-center">
              <Clock className="w-4 h-4 text-secondary mx-auto mb-1" />
              <p className="text-lg font-bold font-mono text-foreground">60s</p>
              <p className="text-[10px] text-muted-foreground">Time</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-3 text-center">
              <Flame className="w-4 h-4 text-orange-400 mx-auto mb-1" />
              <p className="text-lg font-bold font-mono text-foreground">{maxCombo}</p>
              <p className="text-[10px] text-muted-foreground">Best Combo</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-3 text-center">
              <Zap className="w-4 h-4 text-secondary mx-auto mb-1" />
              <p className="text-lg font-bold font-mono text-foreground">{myTotal}</p>
              <p className="text-[10px] text-muted-foreground">Answered</p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button onClick={() => startChallenge(opponent)} className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Swords className="w-4 h-4 mr-2" /> Rematch
            </Button>
            <Button onClick={() => setState('select')} variant="outline" className="w-full border-secondary/40 text-secondary">
              Choose Another Opponent
            </Button>
            {weaknesses.length > 0 && weaknesses[0].module && (
              <Button
                onClick={() => navigate(`/the-path?module=${weaknesses[0].module!.moduleId}&lesson=first`)}
                variant="outline"
                className="w-full border-destructive/40 text-destructive"
              >
                <BookOpen className="w-4 h-4 mr-2" /> Train Your Weakest Area
              </Button>
            )}
            {!user && (
              <Button onClick={() => navigate('/auth')} variant="ghost" className="w-full text-muted-foreground">
                Sign up to save your wins
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

function BotOpponentCard({ profile, index, onSelect, locked }: {
  profile: GeniusCognitiveProfile; index: number;
  onSelect: (p: GeniusCognitiveProfile) => void; locked: boolean;
}) {
  const ratingColor = profile.iq >= 140 ? 'text-secondary' :
    profile.iq >= 125 ? 'text-orange-400' :
    profile.iq >= 110 ? 'text-blue-400' : 'text-green-400';

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
      <button onClick={() => onSelect(profile)} className="w-full text-left">
        <Card className={`border-border bg-card hover:bg-muted/30 transition-all ${locked ? 'opacity-60' : ''}`}>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center text-2xl shrink-0">
              {profile.icon || '🤖'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground text-sm">{profile.name}</h3>
                {locked && <Lock className="w-3.5 h-3.5 text-muted-foreground" />}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`font-mono text-xs font-bold ${ratingColor}`}>IQ {profile.iq}</span>
                <span className="text-[10px] text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{profile.subtitle}</span>
              </div>
            </div>
            <Swords className="w-5 h-5 text-secondary shrink-0" />
          </CardContent>
        </Card>
      </button>
    </motion.div>
  );
}

function GeniusOpponentCard({ profile, index, onSelect, locked }: {
  profile: GeniusCognitiveProfile; index: number;
  onSelect: (p: GeniusCognitiveProfile) => void; locked: boolean;
}) {
  const topCategories = Object.entries(profile.accuracy)
    .sort((a, b) => b[1] - a[1]).slice(0, 2)
    .map(([cat]) => cat.replace('-', ' '));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
      <button onClick={() => onSelect(profile)} className="w-full text-left">
        <Card className={`border-secondary/20 bg-card hover:bg-muted/30 transition-all ${locked ? 'opacity-60' : ''}`}>
          <CardContent className="p-4 flex items-center gap-4">
            <OpponentAvatar profile={profile} size="md" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground text-sm">{profile.name}</h3>
                {locked && <Lock className="w-3.5 h-3.5 text-muted-foreground" />}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono text-xs font-bold text-secondary">IQ {profile.iq}</span>
                <span className="text-[10px] text-muted-foreground">•</span>
                <span className="text-xs text-secondary">{profile.title}</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">Strong in: {topCategories.join(', ')}</p>
            </div>
            <Swords className="w-5 h-5 text-secondary shrink-0" />
          </CardContent>
        </Card>
      </button>
    </motion.div>
  );
}

function OpponentAvatar({ profile, size = 'sm', className = '' }: {
  profile: GeniusCognitiveProfile; size?: 'xs' | 'sm' | 'md'; className?: string;
}) {
  const portrait = profile.difficulty === 'genius' ? getGeniusPortrait(profile.geniusId) : null;
  const sizeClass = size === 'xs' ? 'h-6 w-6' : size === 'sm' ? 'h-8 w-8' : 'h-12 w-12';
  
  if (profile.difficulty === 'opponent') {
    const iconSize = size === 'xs' ? 'text-sm' : size === 'sm' ? 'text-lg' : 'text-2xl';
    return (
      <div className={`${sizeClass} rounded-full bg-muted/50 flex items-center justify-center ${iconSize} ${className}`}>
        {profile.icon || '🤖'}
      </div>
    );
  }

  return (
    <Avatar className={`${sizeClass} ${className}`}>
      {portrait && <AvatarImage src={portrait} alt={profile.name} />}
      <AvatarFallback className="bg-muted text-muted-foreground text-xs">{profile.name.charAt(0)}</AvatarFallback>
    </Avatar>
  );
}

export default Challenge;
