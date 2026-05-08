# Tests Diagnostic IA — Le Médecin

Projet SénSanté — Lab IA v0.5  
Date : 07/05/2026

---

## Test 1 — Nafissatou Faye (Dakar)

Symptômes : Fièvre, Toux, Fatigue

Diagnostic IA : Pneumonie ou infection respiratoire, possibilité de paludisme ou d'autres infections spécifiques à la région de Dakar.

Confiance : 60%

Pertinent ? Oui. Les symptômes sont classiques et l'IA a bien pris en compte la région de Dakar pour orienter vers le paludisme. Le résultat est cohérent avec ce qu'on attendait.

---

## Test 2 — Omar Kane (Sédhiou)

Symptômes : Fièvre, Toux, Frissons  
Notes : Patient âgé de 29 ans, potentiellement grippé

Diagnostic IA : Infection respiratoire aiguë, potentiellement la grippe ou une autre infection virale, avec possibilité de paludisme en raison de la localisation géographique.

Confiance : 60%

Pertinent ? Oui. L'IA a bien utilisé la note de l'agent pour confirmer la piste grippe, tout en ajoutant le paludisme lié à la région de Sédhiou qui est une zone à risque. C'est exactement ce qu'on attendait.

---

## Test 3 — Omar Kane (Sédhiou)

Symptômes : Éruption cutanée, Douleur thoracique, Essoufflement

Diagnostic IA : Infection respiratoire ou maladie tropicale telle que le paludisme ou la dengue, fréquentes dans la région de Sédhiou. L'éruption cutanée et la douleur thoracique pourraient également être liées à une infection bactérienne ou virale.

Confiance : 60%

Pertinent ? Partiellement. Les symptômes sont assez atypiques et peu liés entre eux, donc le diagnostic est logiquement flou. L'IA propose plusieurs pistes sans trancher, ce qui est correct vu les règles du prompt. Cas difficile à diagnostiquer même pour un médecin.

---

## Test 4 — Bigue Samb (Kaolack)

Symptômes : Maux de tête, Fièvre, Douleur abdominale

Diagnostic IA : Infection bactérienne ou virale, possiblement liée à une gastroentérite ou à une infection respiratoire, avec une possibilité de paludisme en raison de la fièvre et de la localisation dans la région de Kaolack.

Confiance : 60%

Pertinent ? Oui. La fièvre combinée aux douleurs abdominales oriente bien vers une gastroentérite ou une fièvre typhoïde. La mention du paludisme est justifiée par la région. J'aurais aimé voir la fièvre typhoïde mentionnée plus explicitement mais le résultat reste acceptable.

---

## Test 5 — Bigue Samb (Kaolack)

Symptômes : Fièvre, Toux, Maux de tête, Fatigue  
Notes : Grippe

Diagnostic IA : Infection respiratoire aiguë, potentiellement une grippe ou une infection virale saisonnière, mais il est également important de considérer d'autres causes telles que la pneumonie ou la malaria dans le contexte sénégalais.

Confiance : 60%

Pertinent ? Oui. L'IA confirme la note de l'agent (grippe) et élargit aux pathologies locales. Quand la note est claire, le diagnostic suit bien. Bon résultat.

---

## Test 6 — Arame Diop (Tambacounda)

Symptômes : Éruption cutanée  
Notes : Patient de 28 ans, sans antécédents particuliers, consulte pour une éruption cutanée apparue il y a 2 jours. Lésions érythémateuses et prurigineuses localisées au niveau du tronc et des membres supérieurs. Pas de fièvre associée. Le patient signale avoir consommé des fruits de mer la veille. Pas d'antécédents allergiques connus.

Diagnostic IA : Réaction allergique ou dermatite de contact, potentiellement liée à la consommation de fruits de mer, ou éventuellement une réaction à une piqûre d'insecte ou une exposition à une plante allergène.

Confiance : 60%

Pertinent ? Oui, très pertinent. C'est le meilleur résultat de tous les tests. L'IA a bien exploité les détails de la note pour identifier la piste allergie alimentaire aux fruits de mer. Ca montre que plus la note est précise, meilleur est le diagnostic.

---

## Ce que j'ai observé

Le contexte géographique a bien influencé les diagnostics. A chaque fois que le patient était dans une région comme Sédhiou, Kaolack ou Tambacounda, l'IA mentionnait le paludisme ou les maladies tropicales locales. C'est une vraie valeur ajoutée du prompt.

J'ai aussi remarqué que le niveau de confiance reste bloqué à 60% sur tous les tests, peu importe les symptômes. C'est une limite que j'ai notée, le prompt pourrait être amélioré pour forcer plus de variabilité dans ce score.

Le test avec la note détaillée (Arame Diop) a clairement donné le meilleur résultat. Ca confirme que les notes de l'agent sont très importantes pour la qualité du diagnostic IA.

Dans tous les cas l'IA n'a jamais posé de diagnostic définitif, elle utilise toujours des formulations comme "possibilité de" ou "potentiellement". C'est conforme aux règles éthiques du projet.

---

Rédigé par : Le Médecin  
SénSanté — Lab IA — ESP/UCAD Licence 3 GLSI 2025-2026