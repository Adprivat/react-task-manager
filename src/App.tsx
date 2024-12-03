import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { ThemeProvider } from './context/ThemeContext';
import { TaskBoard } from './components/TaskBoard';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    #root {
        min-height: 100vh;
    }
`;

function App() {
    return (
        <ThemeProvider>
            <GlobalStyle />
            <TaskBoard />
        </ThemeProvider>
    );
}

export default App;
