import AuthLayout from "@/features/auth/component/AuthLayout";
import LoginForm from "@/features/auth/component/LoginForm";

const LoginPage = () => {

  return (
      <AuthLayout title="Inicio Sesión">
          <LoginForm />
      </AuthLayout>
  )
};

export default LoginPage;
