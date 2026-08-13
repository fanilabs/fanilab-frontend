import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Header from '@/components/Header';

describe('Header', () => {
  it('renders the wordmark and a link to the GitHub organization', () => {
    render(<Header />);
    expect(screen.getByText('FaniLab')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view on github/i })).toHaveAttribute(
      'href',
      'https://github.com/fanilabs'
    );
  });

  it('toggles the mobile navigation menu', async () => {
    const user = userEvent.setup();
    render(<Header />);

    expect(screen.queryByRole('navigation', { name: /mobile/i })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /open menu/i }));
    expect(screen.getByRole('navigation', { name: /mobile/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /close menu/i }));
    expect(screen.queryByRole('navigation', { name: /mobile/i })).not.toBeInTheDocument();
  });
});
