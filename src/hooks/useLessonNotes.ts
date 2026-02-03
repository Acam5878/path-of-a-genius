import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LessonNote {
  id: string;
  user_id: string;
  lesson_id: string;
  module_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export const useLessonNotes = (lessonId: string | undefined, moduleId: string | undefined) => {
  const [note, setNote] = useState<LessonNote | null>(null);
  const [localContent, setLocalContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const { toast } = useToast();

  // Fetch note for current lesson
  const fetchNote = useCallback(async () => {
    if (!lessonId || !moduleId) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setIsLoading(true);
    try {
      // Use type assertion since the table was just created
      const { data, error } = await supabase
        .from('user_lesson_notes' as any)
        .select('*')
        .eq('user_id', user.id)
        .eq('lesson_id', lessonId)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching note:', error);
        return;
      }

      if (data) {
        const noteData = data as unknown as LessonNote;
        setNote(noteData);
        setLocalContent(noteData.content);
      } else {
        setNote(null);
        setLocalContent('');
      }
    } catch (error) {
      console.error('Error fetching note:', error);
    } finally {
      setIsLoading(false);
    }
  }, [lessonId, moduleId]);

  useEffect(() => {
    fetchNote();
    setHasUnsavedChanges(false);
  }, [fetchNote]);

  // Update local content
  const updateLocalContent = (content: string) => {
    setLocalContent(content);
    setHasUnsavedChanges(content !== (note?.content || ''));
  };

  // Save note to database
  const saveNote = async () => {
    if (!lessonId || !moduleId) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to save your notes.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    try {
      if (note) {
        // Update existing note
        const { error } = await supabase
          .from('user_lesson_notes' as any)
          .update({ content: localContent })
          .eq('id', note.id);

        if (error) throw error;

        setNote({ ...note, content: localContent, updated_at: new Date().toISOString() });
      } else {
        // Create new note
        const { data: insertData, error } = await supabase
          .from('user_lesson_notes' as any)
          .insert({
            user_id: user.id,
            lesson_id: lessonId,
            module_id: moduleId,
            content: localContent,
          })
          .select()
          .single();

        if (error) throw error;
        setNote(insertData as unknown as LessonNote);
      }

      setHasUnsavedChanges(false);
      toast({
        title: 'Notes saved',
        description: 'Your notes have been saved successfully.',
      });
    } catch (error) {
      console.error('Error saving note:', error);
      toast({
        title: 'Failed to save',
        description: 'Could not save your notes. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Append content to notes (used by tutor integration)
  const appendToNotes = (content: string) => {
    const newContent = localContent 
      ? `${localContent}\n\n---\n\n${content}` 
      : content;
    updateLocalContent(newContent);
  };

  return {
    note,
    localContent,
    isLoading,
    isSaving,
    hasUnsavedChanges,
    updateLocalContent,
    saveNote,
    appendToNotes,
    refetch: fetchNote,
  };
};
