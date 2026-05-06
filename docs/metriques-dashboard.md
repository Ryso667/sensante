# Métriques IA — Dashboard SénSanté

## Objectif
Définir les métriques issues des diagnostics IA à afficher
sur le tableau de bord de SénSanté.

---

## Métriques proposées

### 1. Nombre total de diagnostics IA
- **Description** : Nombre de consultations ayant reçu un diagnostic IA
- **Affichage** : StatCard — ex: "42 diagnostics générés"
- **Source BDD** : COUNT sur consultations WHERE diagnosticIa IS NOT NULL

### 2. Taux d'urgence
- **Description** : Répartition des diagnostics par niveau d'urgence
- **Affichage** : 3 StatCards séparées
  - 🟢 Faible : X diagnostics
  - 🟠 Moyen : X diagnostics
  - 🔴 Urgent : X diagnostics
- **Source BDD** : COUNT GROUP BY urgence (à stocker en BDD)

### 3. Confiance moyenne
- **Description** : Moyenne du score de confiance de tous les diagnostics
- **Affichage** : StatCard — ex: "74% de confiance moyenne"
- **Source BDD** : AVG sur colonne confiance

### 4. Diagnostics ce mois-ci
- **Description** : Nombre de diagnostics générés dans le mois en cours
- **Affichage** : StatCard avec évolution vs mois précédent
- **Source BDD** : COUNT WHERE createdAt >= début du mois

### 5. Top pathologies détectées
- **Description** : Les diagnostics les plus fréquents
- **Affichage** : Liste ou graphique bar
- **Source BDD** : GROUP BY diagnosticIa ORDER BY COUNT DESC LIMIT 5

---

## Maquette proposée pour le Dashboard

| Ligne 1 | Ligne 1 | Ligne 1 |
|---|---|---|
| Total diagnostics | Confiance moyenne | Diagnostics ce mois |

| Ligne 2 | Ligne 2 | Ligne 2 |
|---|---|---|
| Urgence faible | Urgence moyen | Urgence urgent |

---

## Questions ouvertes
- Faut-il filtrer par région sur le dashboard ?
- Afficher un graphique d'évolution temporelle ?
- Alerter si trop de cas urgents dans une région ?

---

*Rédigé par : Le Pilote*
*Lab IA — SénSanté v0.5*
