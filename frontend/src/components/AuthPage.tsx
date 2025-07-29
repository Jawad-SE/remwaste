"use client";

import Image from "next/image";
import Link from "next/link";
import AuthForm from "./AuthForm";
import womenImg from "../images/women.jpg";

type AuthPageProps = {
  isRegister?: boolean;
};

export default function AuthPage({ isRegister = false }: AuthPageProps) {
  const title = isRegister ? "Create your account" : "Welcome back";
  const subtitle = isRegister
    ? "Join us and start managing patients today."
    : "Please enter your details";
  const actionLink = isRegister ? "/login" : "/register";
  const actionText = isRegister
    ? "Already have an account? Login"
    : "Don't have an account? Sign up";

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 flex justify-center items-center p-4">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg space-y-6">
          <h1 className="text-2xl font-bold">
            {isRegister ? "REMWASTE" : "REMWASTE"}
          </h1>
          <h1 className="text-2xl font-bold">{title}</h1>

          <p className="text-gray-600">
            {isRegister ? subtitle : `Welcome back 👋 ${subtitle}`}
          </p>

          <AuthForm isRegister={isRegister} />

          <p className="text-center text-sm text-gray-600">
            <Link href={actionLink} className="text-blue-600 hover:underline">
              {actionText}
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2">
        <div className="relative flex-1">
          <Image
            src={womenImg}
            alt="Illustration"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-8">
            <h2 className="text-3xl font-bold text-white mb-2">{subtitle}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
