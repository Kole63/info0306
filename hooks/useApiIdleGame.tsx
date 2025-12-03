import { useEffect, useState } from "react";

export type GameDataApi = {
  id: string;
  points: number;
  upgrades: number;
  currentCost: number;
};

export default function useData() {
  const [data, setData] = useState<GameDataApi | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 
  const postJson = async (path: string, data: GameDataApi) => {
    try {
      const response = await fetch(path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Erreur serveur " + response.status);

      const json = await response.json();
      setData(json); // éventuellement mettre à jour
      return json;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };
const sendRecord = async (record: GameDataApi) => {
    try {
        const json = await postJson(process.env.EXPO_API_URL!, record);
        setData(json);
    } catch (error) {
        console.error(error);
    }
}
return { data, loading, error, sendRecord };
}
