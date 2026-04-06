import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { loginAction } from "../actions/login-action";
import LoginForm from "@/src/features/auth/components/LoginForm";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");

  if (token) {
    redirect("/admin/orders");
  }

  return <LoginForm action={loginAction} />;
}