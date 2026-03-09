import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import RegisterForm from "@/features/auth/component/RegisterForm";
import { useAuthContext } from "@/features/auth/context/AuthContext";
import { MemoryRouter } from "react-router-dom";

// ---------- MOCKS ----------

const registerMock = vi.fn();
const navigateMock = vi.fn();

vi.mock("@/features/auth/context/AuthContext", () => ({
  useAuthContext: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

const mockedUseAuthContext = useAuthContext as unknown as vi.Mock;

// ---------- TESTS ----------

describe("RegisterForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockedUseAuthContext.mockReturnValue({
      register: registerMock,
      user: null,
      loading: false,
      error: null,
    });
  });

  it("renders the form fields", () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /registrarse/i })
    ).toBeInTheDocument();
  });

  it("calls register on submit", async () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), "test@mail.com");
    await user.type(screen.getByLabelText(/^password$/i), "Password1!");
    await user.type(screen.getByLabelText(/confirmar password/i), "Password1!");

    await user.click(screen.getByRole("button", { name: /registrarse/i }));

    await waitFor(() => {
      expect(registerMock).toHaveBeenCalledWith(
        "test@mail.com",
        "Password1!"
      );
    });
  });

  it("shows loading state", () => {
    mockedUseAuthContext.mockReturnValue({
      register: registerMock,
      user: null,
      loading: true,
      error: null,
    });

    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
    expect(button).toHaveTextContent(/cargando/i);
  });

  it("shows error message", () => {
    mockedUseAuthContext.mockReturnValue({
      register: registerMock,
      user: null,
      loading: false,
      error: "Email ya existe",
    });

    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    expect(screen.getByText(/email ya existe/i)).toBeInTheDocument();
  });

  it("redirects when user exists", () => {
    mockedUseAuthContext.mockReturnValue({
      register: registerMock,
      user: { email: "test@mail.com" },
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    expect(navigateMock).toHaveBeenCalledWith("/movies");
  });
});