import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Trash2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useTutor } from '@/contexts/TutorContext';

interface GeneralNote {
  id: string;
  title: string | null;
  content: string;
  created_at: string;
  updated_at: string;
  lesson_id: string | null;
  module_id: string | null;
}

interface GeneralNoteEditorProps {
  note: GeneralNote | null; // null = new note
  onBack: () => void;
  onSaved: () => void;
  onDeleted?: () => void;
}

export const GeneralNoteEditor = ({ note, onBack, onSaved, onDeleted }: GeneralNoteEditorProps) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();
  const { setLessonContext } = useTutor();

  useEffect(() => {
    setHasChanges(
      title !== (note?.title || '') || content !== (note?.content || '')
    );
  }, [title, content, note]);

  // Set tutor context so AI knows about this note
  useEffect(() => {
    setLessonContext({
      geniusId: 'path-of-genius',
      geniusName: 'Path of a Genius',
      subjectId: 'general-notes',
      subjectName: 'General Notes',
      lessonId: note?.id || 'new-note',
      lessonTitle: title || 'Untitled Note',
      lessonContent: content,
    });
  }, [title, content, note?.id, setLessonContext]);

  const handleSave = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({ title: 'Sign in required', description: 'Please sign in to save notes.', variant: 'destructive' });
      return;
    }

    setIsSaving(true);
    try {
      if (note) {
        const { error } = await supabase
          .from('user_lesson_notes' as any)
          .update({ title, content })
          .eq('id', note.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('user_lesson_notes' as any)
          .insert({
            user_id: user.id,
            title,
            content,
            lesson_id: null,
            module_id: null,
          });
        if (error) throw error;
      }

      setHasChanges(false);
      toast({ title: 'Saved', description: 'Note saved successfully.' });
      onSaved();
    } catch (e) {
      console.error('Save error:', e);
      toast({ title: 'Error', description: 'Could not save note.', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  }, [note, title, content, toast, onSaved]);

  const handleDelete = async () => {
    if (!note) return;
    try {
      const { error } = await supabase
        .from('user_lesson_notes' as any)
        .delete()
        .eq('id', note.id);
      if (error) throw error;
      toast({ title: 'Deleted', description: 'Note deleted.' });
      onDeleted?.();
    } catch (e) {
      console.error('Delete error:', e);
      toast({ title: 'Error', description: 'Could not delete note.', variant: 'destructive' });
    }
  };

  const dateStr = note
    ? new Date(note.updated_at).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
    : new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between gap-2">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-muted-foreground">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <div className="flex items-center gap-2">
          {note && (
            <Button variant="ghost" size="sm" onClick={handleDelete} className="text-destructive hover:text-destructive">
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isSaving || (!hasChanges && !!note)}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            <Save className="w-4 h-4 mr-1" />
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>

      {/* Date */}
      <p className="text-[11px] text-muted-foreground font-mono">{dateStr}</p>

      {/* Title */}
      <Input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Note title…"
        className="font-heading text-lg font-semibold border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-secondary bg-transparent"
      />

      {/* Content */}
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Write your thoughts, reflections, questions…"
        className="w-full min-h-[300px] resize-none bg-transparent text-sm text-foreground leading-relaxed placeholder:text-muted-foreground/50 outline-none border-0"
      />

      {/* AI hint */}
      <div className="flex items-center gap-2 text-[11px] text-muted-foreground bg-muted/30 rounded-lg px-3 py-2">
        <Sparkles className="w-3.5 h-3.5 text-secondary shrink-0" />
        <span>Use the AI tutor button to ask questions about your notes or any course content</span>
      </div>
    </motion.div>
  );
};
