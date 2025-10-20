-- Add status field to events table and category field
ALTER TABLE public.events ADD COLUMN status text NOT NULL DEFAULT 'draft';
ALTER TABLE public.events ADD COLUMN category text;