// useCharacterById.ts
import { useState, useEffect } from "react";
import { fetchCharacterById } from "@/api/getCharacters";
import { Character } from "@/types/marvel";

export const useCharacterById = (id?: string) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const loadCharacter = async () => {
      setLoading(true);
      try {
        const data = await fetchCharacterById(id);
        setCharacter(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadCharacter();
  }, [id]);

  return { character, loading };
};
