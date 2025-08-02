# 🛡️ githubWorkflows — Ritual Engine for Sponsors & Scrolls

> A mythic fusion of narrative and code. Powers Kyprian badge flows, artifact drops, and sponsor journeys.

---

## 📜 What This Holds

- `bin/` – deployable scripts (badge emission, role grants, shrine echoes)  
- `scripts/` – fixed instructions for campaign rituals  
- `README.md` – this scroll  
- Sponsor-exclusive texts and visual logs  
- Active visual scrolls from campaigns (Discord-integrated)  

---

## 🧭 What This Serves

- Real-time badge assignment and artifact drops  
- Sponsor journey tracking and audit-safe flows  
- Immersive Discord notifications (via webhook shrine logic)  
- Narrative foundation for mythic infrastructure  

---

## 🎟️ Sponsor the Legend

Support Kypria’s infrastructure and unlock epic perks.

| Archetype      | Badge Render                                    | Pledge Link                          |
|----------------|--------------------------------------------------|--------------------------------------|
| Flatform       | ![Flatform Badge](badges/flatform.svg)           | [Pay $1/month](https://pay.link/1)   |
| Patron         | ![Patron Badge](badges/patron.svg)               | [Pay $5/month](https://pay.link/5)   |
| K-6            | ![K-6 Badge](badges/k6.svg)                      | [Pay $10/month](https://pay.link/10) |
| OpenCollective | ![OC Badge](badges/opencollective.svg)           | [Pay $15/month](https://oc.link/)    |
| Tildzin        | ![Tildzin Badge](badges/tildzin.svg)             | [Pay $25/month](https://pay.link/25) |
| Loremory       | ![Loremory Badge](badges/loremory.svg)           | [Pay $50+/month](https://pay.link/50) |

---

## 🌀 Ritual Portals

- **Normal Gateway** – general badge flow  
- **Artifact Active** – real-time artifact campaign logic  
- **Mythic Active** – sponsor-exclusive escalation flow  

---

## ⚔️ Sponsorship Triggers

When a pledge clears, run:

```bash
bin/assign-role.sh \
  --user-id $DISCORD_ID \
  --role-id <ROLE_ID> \
  --badge="badges/${ARCHETYPE}.svg"
