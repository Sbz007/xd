-- Permitir NULL en candidate_id para votos inválidos (por tiempo expirado)
-- Esto permite que la funcionalidad de "valores nulos" detecte estos votos

-- Primero, eliminar la restricción NOT NULL de candidate_id
ALTER TABLE public.votes
ALTER COLUMN candidate_id DROP NOT NULL;

-- Modificar la foreign key para permitir NULL
-- Primero eliminar la constraint existente
ALTER TABLE public.votes
DROP CONSTRAINT IF EXISTS votes_candidate_id_fkey;

-- Recrear la foreign key con ON DELETE SET NULL para permitir NULLs
ALTER TABLE public.votes
ADD CONSTRAINT votes_candidate_id_fkey
FOREIGN KEY (candidate_id)
REFERENCES public.candidates(id)
ON DELETE SET NULL;

-- Modificar el trigger para que no intente actualizar vote_count cuando candidate_id es NULL
CREATE OR REPLACE FUNCTION public.update_candidate_vote_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Solo actualizar vote_count si candidate_id no es NULL
    IF NEW.candidate_id IS NOT NULL THEN
      UPDATE public.candidates
      SET vote_count = vote_count + 1,
          updated_at = now()
      WHERE id = NEW.candidate_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    -- Solo actualizar vote_count si candidate_id no es NULL
    IF OLD.candidate_id IS NOT NULL THEN
      UPDATE public.candidates
      SET vote_count = vote_count - 1,
          updated_at = now()
      WHERE id = OLD.candidate_id;
    END IF;
  END IF;
  RETURN NULL;
END;
$$;

-- Modificar el trigger para que solo marque al votante como que votó si tiene al menos un voto válido
CREATE OR REPLACE FUNCTION public.mark_voter_as_voted()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Solo marcar como que votó si el voto es válido (candidate_id no es NULL)
  IF NEW.candidate_id IS NOT NULL THEN
    UPDATE public.voters
    SET has_voted = true,
        voted_at = now()
    WHERE dni = NEW.voter_dni;
  END IF;
  RETURN NEW;
END;
$$;

