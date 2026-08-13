import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import StatusBadge from '@/components/ui/StatusBadge';

describe('StatusBadge', () => {
  it('renders the label for each status', () => {
    render(<StatusBadge status="built" />);
    expect(screen.getByText('Implemented')).toBeInTheDocument();
  });

  it('renders the in-development label', () => {
    render(<StatusBadge status="progress" />);
    expect(screen.getByText('In Development')).toBeInTheDocument();
  });

  it('renders the not-yet-implemented label', () => {
    render(<StatusBadge status="planned" />);
    expect(screen.getByText('Not Yet Implemented')).toBeInTheDocument();
  });
});
