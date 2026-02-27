import AuthLayout from "@/features/auth/component/AuthLayout";
import RegisterForm from "@/features/auth/component/RegisterForm";

const RegisterPage = () => {

  return (
      <AuthLayout title="Registrarse">
          <RegisterForm />
      </AuthLayout>
  )
};

export default RegisterPage;
