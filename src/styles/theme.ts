export const lightTheme = {
    primary: '#2563eb',
    secondary: '#7c3aed',
    background: '#f8fafc',
    cardBackground: '#ffffff',
    listBackground: '#f1f5f9',
    dragBackground: '#e2e8f0',
    textPrimary: '#1e293b',
    textSecondary: '#64748b',
    borderColor: '#e2e8f0',
    error: '#ef4444',
    success: '#22c55e'
};

export const darkTheme = {
    primary: '#60a5fa',
    secondary: '#a78bfa',
    background: '#0f172a',
    cardBackground: '#1e293b',
    listBackground: '#1e293b',
    dragBackground: '#334155',
    textPrimary: '#e2e8f0',
    textSecondary: '#94a3b8',
    borderColor: '#334155',
    error: '#f87171',
    success: '#4ade80'
};

export type Theme = typeof lightTheme;

declare module 'styled-components' {
    export interface DefaultTheme extends Theme {}
} 