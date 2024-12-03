# React Task Manager

Ein moderner Task Manager mit Drag & Drop Funktionalität, gebaut mit React, TypeScript und styled-components.

## Features

- 🎯 Drag & Drop Funktionalität für Tasks
- 🎨 Modernes UI-Design
- 🌓 Dark/Light Mode Unterstützung
- 📱 Responsive Design
- 💾 Lokale Zustandsverwaltung
- 🔄 Echtzeit-Updates
- 🎯 TypeScript für bessere Entwicklererfahrung

## Technologien

- React 18
- TypeScript
- styled-components
- react-beautiful-dnd
- UUID

## Installation

1. Repository klonen:
```bash
git clone [repository-url]
cd react-task-manager
```

2. Abhängigkeiten installieren:
```bash
npm install
```

3. Entwicklungsserver starten:
```bash
npm start
```

Die Anwendung ist dann unter [http://localhost:3000](http://localhost:3000) verfügbar.

## Projektstruktur

```
src/
├── components/        # React Komponenten
├── context/          # React Context
├── styles/           # Styling und Themes
├── types/            # TypeScript Typdefinitionen
└── App.tsx           # Hauptkomponente
```

## Komponenten

### TaskBoard
Die Hauptkomponente, die das Kanban-Board verwaltet.

### TaskList
Verwaltet die einzelnen Listen (Todo, In Progress, Done).

### TaskCard
Repräsentiert eine einzelne Aufgabe.

### TaskForm
Formular zum Erstellen und Bearbeiten von Aufgaben.

### StrictModeDroppable
Ein Wrapper für react-beautiful-dnd Kompatibilität mit React 18.

## Verwendung

1. Neue Aufgabe erstellen:
   - Klicken Sie auf "+ Neue Aufgabe"
   - Füllen Sie Titel und Beschreibung aus
   - Wählen Sie den Status
   - Speichern Sie die Aufgabe

2. Aufgaben verwalten:
   - Ziehen Sie Aufgaben zwischen den Spalten
   - Bearbeiten Sie Aufgaben durch Klick auf den Edit-Button
   - Löschen Sie Aufgaben durch Klick auf den Delete-Button

## Beitragen

1. Fork das Projekt
2. Erstelle einen Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Push zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert.
