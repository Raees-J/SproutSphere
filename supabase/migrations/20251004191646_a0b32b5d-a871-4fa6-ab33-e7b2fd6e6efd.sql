-- Add SELECT policy for donations table
CREATE POLICY "Anyone can view donations"
ON public.donations
FOR SELECT
USING (true);