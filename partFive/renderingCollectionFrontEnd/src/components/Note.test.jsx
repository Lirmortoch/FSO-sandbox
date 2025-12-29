import { render, screen } from "@testing-library/react";
import Note from './Note';
import { expect } from "vitest";

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  }

  render(<Note note={note} />);

  const element = screen.queryByText('do not want this thing to be rendered');
  expect(element).toBeDefined();
});