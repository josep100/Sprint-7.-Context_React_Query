// AuthContext.test.tsx
import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AuthProvider, useAuthContext } from "@/features/auth/context/AuthContext";
import * as useAuthHook from "@/features/auth/hooks/useAuth";

describe("AuthContext", () => {

  it("provides auth context correctly", () => {
    const authMock = {
      user: { email: "test@mail.com" } as any,
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
      loading: false,
      error: null,
    };

    vi.spyOn(useAuthHook, "useAuth").mockReturnValue(authMock);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuthContext(), { wrapper });

    expect(result.current).toBe(authMock);
  });

  it("throws error when used outside AuthProvider", () => {
    expect(() => {
      renderHook(() => useAuthContext());
    }).toThrow("useAuthContext must be used inside AuthProvider");
  });

});