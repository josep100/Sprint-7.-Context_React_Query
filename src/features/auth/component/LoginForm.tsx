import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  type LoginSchema,
} from "@/features/auth/schema/loginSchema";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/features/auth/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";


const LoginForm = () => {
  const navigate = useNavigate();
  const { login, user, loading, error } = useAuthContext();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    await login(data.email, data.password);
  };

  useEffect(() => {
    if (user) {
      navigate("/movies");
    }
  }, [user, navigate]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="
                        bg-white/10
                        border border-white/20
                        text-black
                        placeholder:text-gray-400
                        focus:ring-2
                        focus:ring-cyan-400
                        focus:border-cyan-400
                      "
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200">Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  className="
                        bg-white/10
                        border border-white/20
                        text-white
                        placeholder:text-gray-400
                        focus:ring-2
                        focus:ring-cyan-400
                        focus:border-cyan-400
                      "
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={loading}
          className="
                w-full mt-2
                bg-cyan-500/80
                hover:bg-cyan-500
                backdrop-blur-md
                text-white
                font-semibold
                tracking-wide
                transition-all
                duration-200
                shadow-lg
              "
        >
          {loading ? "Cargando..." : "Iniciar sesión"}
        </Button>
        <div className="flex gap-1">
            <p>¿No tienes cuenta? </p><Link to="/register">Regístrate</Link>
        </div>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
      </form>
    </Form>
  );
};

export default LoginForm;
