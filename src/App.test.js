import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio hero title', () => {
  render(<App />);
  const titleElement = screen.getByText(/mohamed salem ouissi/i);
  expect(titleElement).toBeInTheDocument();
});
