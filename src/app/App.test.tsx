import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';
import { t } from '../i18n/i18n';

describe('App', () => {
  it('renders the minimal Kohelet shell', () => {
    render(<App />);

    expect(screen.getByRole('main', { name: t('app.shellLabel') })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Kohelet' })).toBeTruthy();
    expect(screen.getByText(t('app.tagline'))).toBeTruthy();
  });
});
