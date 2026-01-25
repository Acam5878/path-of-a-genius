import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Bookmark, Quote, CheckCircle, BookOpen, Brain, Lightbulb, Play } from 'lucide-react';
import { getGeniusById, getSubjectsByGeniusId } from '@/data/geniuses';
import { useLearningPath } from '@/contexts/LearningPathContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SubjectCard } from '@/components/cards/SubjectCard';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const GeniusProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { addAllSubjectsFromGenius, userSubjects } = useLearningPath();
  
  const genius = getGeniusById(id || '');
  const subjects = getSubjectsByGeniusId(id || '');
  
  // Check if user has started this curriculum
  const hasStarted = userSubjects.some(us => us.geniusId === id);
  const subjectsInPath = userSubjects.filter(us => us.geniusId === id).length;
  
  if (!genius) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Genius not found</p>
      </div>
    );
  }

  // Group subjects by category
  const subjectsByCategory = subjects.reduce((acc, subject) => {
    if (!acc[subject.category]) acc[subject.category] = [];
    acc[subject.category].push(subject);
    return acc;
  }, {} as Record<string, typeof subjects>);

  const categoryLabels: Record<string, string> = {
    language: 'Languages',
    math: 'Mathematics',
    science: 'Sciences',
    philosophy: 'Philosophy',
    arts: 'Arts',
  };

  // Timeline data
  const timeline = [
    { age: 3, label: 'Early Learning', subjects: subjects.filter(s => s.ageStarted <= 5) },
    { age: 8, label: 'Foundational', subjects: subjects.filter(s => s.ageStarted > 5 && s.ageStarted <= 10) },
    { age: 12, label: 'Intermediate', subjects: subjects.filter(s => s.ageStarted > 10 && s.ageStarted <= 15) },
    { age: 16, label: 'Advanced', subjects: subjects.filter(s => s.ageStarted > 15) },
  ].filter(t => t.subjects.length > 0);

  const handleStartCurriculum = () => {
    addAllSubjectsFromGenius(id || '');
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-transparent">
        <Button
          variant="ghost"
          size="icon"
          className="bg-background/80 backdrop-blur-sm rounded-full"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-background/80 backdrop-blur-sm rounded-full"
          >
            <Share2 className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-background/80 backdrop-blur-sm rounded-full"
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-secondary text-secondary' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-64 gradient-hero"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[120px] font-heading text-cream/20">{genius.name.charAt(0)}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-transparent p-6 pt-20">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider text-cream/70">{genius.field}</span>
            <span className="text-cream/40">•</span>
            <span className="text-xs text-cream/70">{genius.era} Era</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-cream">{genius.name}</h1>
          <p className="text-sm text-cream/80 mt-1">
            {genius.birthYear > 0 ? genius.birthYear : Math.abs(genius.birthYear) + ' BC'} - {genius.deathYear > 0 ? genius.deathYear : Math.abs(genius.deathYear) + ' BC'}
          </p>
          <div className="mt-3 flex items-center gap-3">
            <span className="inline-block bg-secondary text-secondary-foreground text-sm font-mono font-bold px-3 py-1 rounded-full">
              IQ {genius.iqMin}-{genius.iqMax}
            </span>
            {hasStarted && (
              <span className="inline-block bg-success/20 text-success text-xs font-medium px-3 py-1 rounded-full">
                {subjectsInPath}/{subjects.length} subjects added
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="px-4 mt-4">
        <TabsList className="w-full bg-muted">
          <TabsTrigger value="overview" className="flex-1 text-xs">Overview</TabsTrigger>
          <TabsTrigger value="timeline" className="flex-1 text-xs">Timeline</TabsTrigger>
          <TabsTrigger value="curriculum" className="flex-1 text-xs">Curriculum</TabsTrigger>
          <TabsTrigger value="approach" className="flex-1 text-xs">Approach</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-6">
          {/* Biography */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-2">Biography</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{genius.biography}</p>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-3">Key Achievements</h3>
            <div className="space-y-2">
              {genius.achievements.map((achievement, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground">{achievement}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Curriculum Overview */}
          <div className="bg-muted/50 rounded-xl p-4">
            <h3 className="font-heading font-semibold text-foreground mb-2">Curriculum Overview</h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="text-center bg-background rounded-lg p-3">
                <p className="font-mono text-2xl font-bold text-secondary">{subjects.length}</p>
                <p className="text-xs text-muted-foreground">Subjects</p>
              </div>
              <div className="text-center bg-background rounded-lg p-3">
                <p className="font-mono text-2xl font-bold text-secondary">{Object.keys(subjectsByCategory).length}</p>
                <p className="text-xs text-muted-foreground">Categories</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Includes {subjects.reduce((acc, s) => acc + (s.resources?.length || 0), 0)} curated study resources
            </p>
          </div>

          {/* Famous Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-5 border border-border"
          >
            <Quote className="w-5 h-5 text-secondary mb-2" />
            <p className="font-heading text-lg text-foreground italic leading-relaxed">
              "{genius.famousQuote}"
            </p>
            <p className="text-sm text-muted-foreground mt-3">— {genius.name}</p>
          </motion.div>

          {/* CTA */}
          <Button 
            className="w-full bg-secondary text-secondary-foreground hover:bg-gold-light h-12 text-base font-semibold"
            onClick={handleStartCurriculum}
          >
            {hasStarted ? (
              <>
                <Play className="w-4 h-4 mr-2" />
                Continue Curriculum
              </>
            ) : (
              <>
                <BookOpen className="w-4 h-4 mr-2" />
                Start This Curriculum
              </>
            )}
          </Button>
        </TabsContent>

        <TabsContent value="timeline" className="mt-4">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
            
            <div className="space-y-6">
              {timeline.map((period, i) => (
                <motion.div
                  key={period.age}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="relative pl-10"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-2 w-5 h-5 rounded-full bg-secondary border-4 border-background" />
                  
                  <div className="bg-card rounded-xl border border-border p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-lg font-bold text-secondary">Age {period.age}+</span>
                      <span className="text-sm text-muted-foreground">{period.label}</span>
                    </div>
                    <div className="space-y-2">
                      {period.subjects.map(subject => (
                        <div key={subject.id} className="flex items-center gap-2 text-sm">
                          <BookOpen className="w-4 h-4 text-muted-foreground" />
                          <span className="text-foreground">{subject.subjectName}</span>
                          {subject.resources && subject.resources.length > 0 && (
                            <span className="text-[10px] text-secondary ml-auto">
                              {subject.resources.length} resources
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="curriculum" className="mt-4 space-y-4">
          <Accordion type="multiple" className="space-y-2" defaultValue={Object.keys(subjectsByCategory)}>
            {Object.entries(subjectsByCategory).map(([category, catSubjects]) => (
              <AccordionItem key={category} value={category} className="border border-border rounded-xl overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:no-underline bg-card">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-semibold text-foreground">
                      {categoryLabels[category] || category}
                    </span>
                    <span className="text-xs text-muted-foreground">({catSubjects.length})</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 space-y-3 bg-background">
                  {catSubjects.map(subject => (
                    <SubjectCard key={subject.id} subject={subject} />
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {subjects.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No curriculum data available yet</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="approach" className="mt-4 space-y-6">
          <div className="space-y-4">
            <div className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5 text-secondary" />
                <h3 className="font-heading font-semibold text-foreground">How They Learned</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {genius.name} followed an intensive education regimen from a very early age, 
                emphasizing direct engagement with primary texts rather than simplified versions. 
                Daily practice, rigorous questioning, and continuous writing were core methods.
              </p>
            </div>

            <div className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-secondary" />
                <h3 className="font-heading font-semibold text-foreground">Advice for Modern Learners</h3>
              </div>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  Start with fundamentals and build systematically
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  Engage with primary sources whenever possible
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  Practice active recall through discussion and writing
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  Make learning a daily habit, not an occasional effort
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GeniusProfile;
