# Format des symptômes — SénSanté IA

## Objectif
Décrire le format JSON envoyé à l'API Groq (Llama 3)
pour le pré-diagnostic automatique.

## Format d'entrée (symptômes stockés en BDD)
Le champ `symptomes` de la table `Consultation` est un tableau JSON :
["Fièvre", "Toux", "Fatigue"]

## Prompt envoyé à Groq
Le prompt sera construit ainsi :
"Patient présentant les symptômes suivants : Fièvre, Toux, Fatigue.
Propose un pré-diagnostic et un niveau de confiance en %."

## Format de réponse attendu (JSON)
{
  "diagnosticIa": "Paludisme probable",
  "confiance": 78
}

## Champs Prisma concernés
- `diagnosticIa` : string — résultat du modèle
- `confiance`    : number — pourcentage de confiance
- `statut`       : passe de "en_attente" à "termine"
