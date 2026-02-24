// import {
//   Form,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
//   FormField,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   loginSchema,
//   type LoginSchema,
// } from "@/features/auth/schema/loginSchema";
// import { Button } from "@/components/ui/button";

// import { useAuthContext } from "@/features/auth/context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   // const { login, user, loading, error } = useAuthContext();

//   const form = useForm<LoginSchema>({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = async (data: LoginSchema) => {
//     // await login(data.email, data.password);
//   };

//   // 🔥 Redirección automática cuando haya usuario
//   // useEffect(() => {
//   //   if (user) {
//   //     navigate("/movies");
//   //   }
//   // }, [user, navigate]);

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)}>
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input {...field} placeholder="Escribe tu mail" />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <Input
//                   {...field}
//                   type="password"
//                   placeholder="Escribe tu password"
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button disabled={loading} className="w-full mt-4">
//           {loading ? "Cargando..." : "Iniciar sesión"}
//         </Button>

//         {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//       </form>
//     </Form>
//   );
// };

// export default LoginPage;
