import RegisterForm from "@/components/auth/RegisterForm";
import { registerAction } from "../actions/register-action";

export default function RegisterFormPage() {
  return <RegisterForm action={registerAction} />;
}
