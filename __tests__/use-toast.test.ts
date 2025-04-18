import { renderHook, act } from '@testing-library/react-hooks';
import { useToastHook } from '../src/hooks/use-toast';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => {
  const actualReactToastify = jest.requireActual('react-toastify');
  return {
    ...actualReactToastify,
    toast: jest.fn()
  };
});

describe('useToastHook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns a notify function', () => {
    const { result } = renderHook(() => useToastHook());
    expect(result.current).toHaveProperty('notify');
    expect(typeof result.current.notify).toBe('function');
  });

  it('calls toast with correct message and options', () => {
    const { result } = renderHook(() => useToastHook());
    act(() => {
      result.current.notify('Hello, World!', { type: 'info', autoClose: 5000 });
    });
    expect(toast).toHaveBeenCalledWith('Hello, World!', { type: 'info', autoClose: 5000 });
  });

  it('uses default autoClose when not provided', () => {
    const { result } = renderHook(() => useToastHook());
    act(() => {
      result.current.notify('Default timeout');
    });
    expect(toast).toHaveBeenCalledWith('Default timeout', { type: undefined, autoClose: 3000 });
  });
});
