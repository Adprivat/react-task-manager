# React Task Manager

Ein moderner Task-Manager, gebaut mit React und modernen Web-Technologien.

## Features

- 🎯 Aufgaben erstellen, bearbeiten und löschen
- 📋 Kategorisierung von Aufgaben
- 🎨 Drag & Drop Funktionalität
- 💾 Lokale Speicherung
- 🌓 Dark/Light Mode Support
- 📱 Responsive Design

## Technologien

- React 18
- TypeScript
- Styled Components
- React Beautiful DND
- LocalStorage API

## Installation

1. Repository klonen:
```bash
git clone https://github.com/Adprivat/react-task-manager.git
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

## Projektstruktur

```
src/
  ├── components/     # React Komponenten
  ├── hooks/         # Custom Hooks
  ├── context/       # React Context
  ├── types/         # TypeScript Definitionen
  ├── styles/        # Styled Components
  └── utils/         # Hilfsfunktionen
```

## Komponenten

- `TaskBoard`: Hauptkomponente für das Kanban-Board
- `TaskList`: Liste von Aufgaben in einer Kategorie
- `TaskCard`: Einzelne Aufgabenkarte
- `TaskForm`: Formular zum Erstellen/Bearbeiten von Aufgaben
- `ThemeToggle`: Dark/Light Mode Switch

## Verwendung

```jsx
import { TaskBoard } from './components/TaskBoard';

function App() {
  return (
    <div className="App">
      <TaskBoard />
    </div>
  );
}
```

## Lizenz

MIT 