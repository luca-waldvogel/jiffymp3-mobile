# Kompetenznachweis 335 - Mobile App

Mobile-App mit erarbeiteten Kompetenzen aus dem Modul 335.

Ich habe mich für einen YouTube zu MP3 Converter entschieden, da ich ein Teil des Backends bereits aufgesetzt habe und nun eine App damit bauen will.

# Verwendung:

1. Repo klonen und `npm install` ausführen
2. `.env` im root aufsetzen mit folgenden Daten:

```
EXPO_PUBLIC_FIREBASE_API_KEY=XXX
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=XXX
EXPO_PUBLIC_FIREBASE_PROJECT_ID=XXX
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=XXX
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=XXX
EXPO_PUBLIC_FIREBASE_APP_ID=XXX
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=XXX
EXPO_PUBLIC_API_BASE_URL=http://<PERSÖNLICHE-IP*>:8000
```
_*die persönliche IP ist die IP-Adresse des verwendeten Computers, dieser muss im gleichen Netz wie das verwendete Smartphone oder der verwendete Emulator sein_

3. Docker Engine starten und `docker compose up --build` ausführen
4. `expo start` ausführen
