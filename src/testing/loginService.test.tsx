import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  loginService,
  registerService,
  logoutService,
  subscribeToAuthChanges,
} from "@/features/auth/services/loginService";

import * as firebaseAuth from "firebase/auth";

vi.mock("firebase/app", () => ({
  initializeApp: vi.fn(() => ({})),
}));

vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => ({})),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn(),
}));

describe("firebase services", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loginService calls signInWithEmailAndPassword", async () => {
    const mockResponse = { user: { email: "test@mail.com" } };

    (firebaseAuth.signInWithEmailAndPassword as any).mockResolvedValue(
      mockResponse
    );

    const result = await loginService("test@mail.com", "123456");

    expect(firebaseAuth.signInWithEmailAndPassword).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });

  it("registerService calls createUserWithEmailAndPassword", async () => {
    const mockResponse = { user: { email: "test@mail.com" } };

    (firebaseAuth.createUserWithEmailAndPassword as any).mockResolvedValue(
      mockResponse
    );

    const result = await registerService("test@mail.com", "123456");

    expect(firebaseAuth.createUserWithEmailAndPassword).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });

  it("logoutService calls signOut", async () => {
    (firebaseAuth.signOut as any).mockResolvedValue(undefined);

    await logoutService();

    expect(firebaseAuth.signOut).toHaveBeenCalled();
  });

  it("subscribeToAuthChanges calls onAuthStateChanged", () => {
    const unsubscribeMock = vi.fn();

    (firebaseAuth.onAuthStateChanged as any).mockReturnValue(unsubscribeMock);

    const callback = vi.fn();

    const unsubscribe = subscribeToAuthChanges(callback);

    expect(firebaseAuth.onAuthStateChanged).toHaveBeenCalled();
    expect(unsubscribe).toBe(unsubscribeMock);
  });
});