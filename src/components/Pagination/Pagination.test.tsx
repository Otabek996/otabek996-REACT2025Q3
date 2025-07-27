import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
  const defaultProps = {
    currentPage: 3,
    totalPages: 5,
    onPageChange: vi.fn(),
    onPrevious: vi.fn(),
    onNext: vi.fn(),
    hasNext: true,
    hasPrevious: true,
    loading: false,
    showPageInfo: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not render when totalPages <= 1', () => {
    const { container } = render(
      <Pagination {...defaultProps} totalPages={1} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders Prev, Next, page numbers, and current page info', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Page 3 of 5')).toBeInTheDocument();

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls onPageChange when a page number is clicked', () => {
    render(<Pagination {...defaultProps} />);
    fireEvent.click(screen.getByText('2'));
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it('does not call onPageChange if current page is clicked again', () => {
    render(<Pagination {...defaultProps} />);
    fireEvent.click(screen.getByText('3'));
    expect(defaultProps.onPageChange).not.toHaveBeenCalled();
  });

  it('calls onPrevious and onNext correctly', () => {
    render(<Pagination {...defaultProps} />);
    fireEvent.click(screen.getByText('Prev'));
    fireEvent.click(screen.getByText('Next'));
    expect(defaultProps.onPrevious).toHaveBeenCalled();
    expect(defaultProps.onNext).toHaveBeenCalled();
  });

  it('disables Prev and Next buttons when hasPrevious/hasNext are false or loading', () => {
    const { rerender } = render(
      <Pagination {...defaultProps} hasPrevious={false} hasNext={false} />
    );

    expect(screen.getByText('Prev')).toBeDisabled();
    expect(screen.getByText('Next')).toBeDisabled();

    rerender(<Pagination {...defaultProps} loading={true} />);
    expect(screen.getByText('Prev')).toBeDisabled();
    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('disables dots and does not call onPageChange on click', () => {
    render(<Pagination {...defaultProps} totalPages={20} currentPage={10} />);
    const dots = screen.getAllByText('...');
    expect(dots.length).toBeGreaterThan(0);
    dots.forEach((dot) => {
      expect(dot).toBeDisabled();
    });
  });

  it('hides page info if showPageInfo is false', () => {
    render(<Pagination {...defaultProps} showPageInfo={false} />);
    expect(screen.queryByText(/Page \d+ of \d+/)).not.toBeInTheDocument();
  });
});
