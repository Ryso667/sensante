# Plan IA – Intégration Groq

## Fournisseur choisi
- **Groq** : https://console.groq.com
- Choisi pour sa rapidité (réponse en ~24ms) et son accès gratuit

## Modèle utilisé
- `llama-3.3-70b-versatile`
- Modèle LLaMA 3.3 hébergé par Groq

## Test effectué

Requête curl vers l'endpoint `/v1/chat/completions` :

```bash
curl https://api.groq.com/openai/v1/chat/completions \
  -H "Authorization: Bearer $GROQ_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama-3.3-70b-versatile",
    "messages": [{"role": "user", "content": "Bonjour !"}]
  }'
```

**Réponse obtenue :** "Bonjour ! Comment puis-je vous aider aujourd'hui ?"  
**Temps de réponse :** 24ms ✅

## Sécurité
- La clé API est stockée dans `.env` (jamais commitée)
- `.env` est ajouté au `.gitignore`
