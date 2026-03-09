import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useAuth } from "@/features/auth/hooks/useAuth";
import * as authService from "@/features/auth/services/loginService";
import type { UserCredential } from "firebase/auth";

vi.mock("@/features/auth/services/loginService");

describe("useAuth hook", () => {
  const mockUser = { uid: "123", email: "test@mail.com" };
  const mockCredential = {} as UserCredential;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("subscribes to auth changes and updates user", () => {
    const unsubscribeMock = vi.fn();

    vi.spyOn(authService, "subscribeToAuthChanges").mockImplementation((cb) => {
      cb(mockUser as any);
      return unsubscribeMock;
    });

    const { result, unmount } = renderHook(() => useAuth());

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.loading).toBe(false);

    unmount();
    expect(unsubscribeMock).toHaveBeenCalled();
  });

  it("login success", async () => {
    vi.spyOn(authService, "loginService").mockResolvedValue(mockCredential);

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login("test@mail.com", "123456");
    });

    expect(authService.loginService).toHaveBeenCalledWith(
      "test@mail.com",
      "123456"
    );
    expect(result.current.error).toBeNull();
  });

  it("login error", async () => {
    vi.spyOn(authService, "loginService").mockRejectedValue(
      new Error("Login failed")
    );

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login("test@mail.com", "123456");
    });

    expect(result.current.error).toBe("Login failed");
  });

  it("register success", async () => {
    vi.spyOn(authService, "registerService").mockResolvedValue(mockCredential);

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.register("test@mail.com", "123456");
    });

    expect(authService.registerService).toHaveBeenCalledWith(
      "test@mail.com",
      "123456"
    );
    expect(result.current.error).toBeNull();
  });

  it("register error", async () => {
    vi.spyOn(authService, "registerService").mockRejectedValue(
      new Error("Register failed")
    );

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.register("test@mail.com", "123456");
    });

    expect(result.current.error).toBe("Register failed");
  });

  it("logout calls logoutService", async () => {
    vi.spyOn(authService, "logoutService").mockResolvedValue(undefined);

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.logout();
    });

    expect(authService.logoutService).toHaveBeenCalled();
  });
});