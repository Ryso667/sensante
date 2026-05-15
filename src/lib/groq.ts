import Groq from "groq-sdk";

let groqClient: Groq | undefined;

function getGroq(): Groq {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY manquant. Définissez cette variable d'environnement pour l'API diagnostic IA."
    );
  }
  groqClient ??= new Groq({ apiKey });
  return groqClient;
}

const SYSTEM_PROMPT = `Tu es un assistant médical pour le Sénégal.
Tu analyses les symptômes signalés par un agent de santé communautaire et tu proposes un pré-diagnostic.
Règles :
- Tu donnes un niveau de confiance entre 0 et 100.
- Tu classes l'urgence : "faible", "moyen", "urgent".
- Tu recommandes TOUJOURS de consulter un professionnel de santé.
- Tu tiens compte du contexte sénégalais (paludisme, dengue, etc.).
- Tu NE poses PAS de diagnostic définitif.
Réponds UNIQUEMENT en JSON valide sans aucun texte avant ou après :
{
  "diagnostic": "description du pré-diagnostic",
  "confiance": nombre_entre_0_et_100,
  "recommandation": "conseil pour l'agent",
  "urgence": "faible"
}`;

export async function analyserSymptomes(
  patient: {
    nom: string;
    prenom: string;
    age: number;
    sexe: string;
    region: string;
  },
  symptomes: string[],
  notes: string | null
): Promise<{
  diagnostic: string;
  confiance: number;
  recommandation: string;
  urgence: string;
}> {
  const userMessage = `Patient : ${patient.prenom} ${patient.nom}
Âge : ${patient.age} ans | Sexe : ${patient.sexe}
Région : ${patient.region}
Symptômes : ${symptomes.join(", ")}
${notes ? `Notes : ${notes}` : ""}
Propose un pré-diagnostic.`;

  const completion = await getGroq().chat.completions.create({
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userMessage },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
    max_tokens: 500,
  });

  const response = completion.choices[0]?.message?.content || "{}";
  
  // Nettoyer la réponse au cas où Groq ajoute du texte autour du JSON
  const jsonMatch = response.match(/\{[\s\S]*\}/);
  const cleanResponse = jsonMatch ? jsonMatch[0] : "{}";

  try {
    const parsed = JSON.parse(cleanResponse);
    return {
      diagnostic: parsed.diagnostic || "Analyse impossible. Réessayez.",
      confiance: parsed.confiance ?? parsed.confidence ?? 0,
      recommandation: parsed.recommandation ?? parsed.recommendation ?? "Consultez un professionnel de santé.",
      urgence: parsed.urgence || "moyen",
    };
  } catch {
    return {
      diagnostic: "Analyse impossible. Réessayez.",
      confiance: 0,
      recommandation: "Consultez un professionnel de santé.",
      urgence: "moyen",
    };
  }
}