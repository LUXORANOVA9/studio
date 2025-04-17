import { renderHook } from "@testing-library/react";
import { useToast } from "@/hooks/use-toast";
import { useToast as useShadcnToast } from "@/components/ui/use-toast";

// Mock the underlying Shadcn toast hook
jest.mock("@/components/ui/use-toast", () => ({
  useToast: jest.fn(),
}));

describe("useToast Hook", () => {
  it("should return the toast function from the underlying hook", () => {
    // Arrange
    const mockToastFn = jest.fn();
    (useShadcnToast as jest.Mock).mockReturnValue({ toast: mockToastFn });

    // Act
    const { result } = renderHook(() => useToast());

    // Assert
    expect(result.current.toast).toBeDefined();
    expect(result.current.toast).toBe(mockToastFn);

    // Optional: Verify the underlying hook was called
    expect(useShadcnToast).toHaveBeenCalledTimes(1);
  });

  it("should allow calling the returned toast function", () => {
    // Arrange
    const mockToastFn = jest.fn();
    (useShadcnToast as jest.Mock).mockReturnValue({ toast: mockToastFn });
    const { result } = renderHook(() => useToast());
    const toastArgs = { title: "Test Toast", description: "This is a test." };

    // Act
    result.current.toast(toastArgs);

    // Assert
    expect(mockToastFn).toHaveBeenCalledTimes(1);
    expect(mockToastFn).toHaveBeenCalledWith(toastArgs);
  });
});
