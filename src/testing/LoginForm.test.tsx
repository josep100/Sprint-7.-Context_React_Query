import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import LoginForm from "../features/auth/component/LoginForm";
import { useAuthContext } from "../features/auth/context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";



vi.mock("../features/auth/context/AuthContext.tsx");
const mockedAuthContext = useAuthContext as unknown as ReturnType<typeof vi.fn>;


vi.mock("react-router-dom", async () => {
  const actual = (await vi.importActual("react-router-dom")) as object;
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});
const mockedNavigate = useNavigate as unknown as ReturnType<typeof vi.fn>;

describe("LoginForm", () => {
  const loginMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockedNavigate.mockReturnValue(vi.fn());
  });

  it("renders form inputs, button, and link", () => {
    mockedAuthContext.mockReturnValue({
      login: loginMock,
      user: null,
      loading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByText(/regístrate/i)).toBeInTheDocument();
  });

  

  it("disables button and shows loading text when loading is true", () => {
    mockedAuthContext.mockReturnValue({
      login: loginMock,
      user: null,
      loading: true,
      error: null,
    });

    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    const btn = screen.getByRole("button", { name: /cargando/i });
    expect(btn).toBeDisabled();
  });

  it("navigates to /movies when user exists", () => {
    const navigateFn = vi.fn();
    mockedNavigate.mockReturnValue(navigateFn);

    mockedAuthContext.mockReturnValue({
      login: loginMock,
      user: { id: "1", email: "test@mail.com" },
      loading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    expect(navigateFn).toHaveBeenCalledWith("/movies");
  });

  it("shows error message when error exists", () => {
    mockedAuthContext.mockReturnValue({
      login: loginMock,
      user: null,
      loading: false,
      error: "Credenciales incorrectas",
    });

    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    expect(screen.getByText(/credenciales incorrectas/i)).toBeInTheDocument();
  });
});