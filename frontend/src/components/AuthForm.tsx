"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { register as doRegister, login as doLogin } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDown, Check, Eye, EyeOff } from "lucide-react";

const getSchema = (isRegister: boolean) =>
  z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(8, { message: "Min 8 chars" }),
    firstName: isRegister
      ? z.string().min(2, { message: "First name required" })
      : z.string().optional(),
    lastName: isRegister
      ? z.string().min(2, { message: "Last name required" })
      : z.string().optional(),
    role: isRegister
      ? z.enum(["admin", "user"], { required_error: "Role required" })
      : z.enum(["admin", "user"]).optional(),
  });

const ROLE_OPTIONS = [
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" },
] as const;

type AuthFormProps = {
  isRegister?: boolean;
  onSuccess?: () => void;
};

export default function AuthForm({
  isRegister = false,
  onSuccess,
}: AuthFormProps) {
  const schema = getSchema(isRegister);
  type AuthFormData = z.infer<typeof schema>;

  const {
    register: rhfRegister,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AuthFormData>({ resolver: zodResolver(schema) });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const selectedRole = watch("role") ?? "";

  const onSubmit = async (data: AuthFormData) => {
    try {
      setLoading(true);

      if (isRegister) {
        if (!data.role) {
          toast.error("Role is required!");
          return;
        }
        await doRegister({
          email: data.email,
          password: data.password,
          role: data.role,
          firstName: data.firstName!,
          lastName: data.lastName!,
        });
        toast.success("Registered successfully!");
        router.push("/login");
      } else {
        await doLogin({
          email: data.email,
          password: data.password,
        });
        toast.success("Logged in!");
        if (onSuccess) onSuccess();
        else router.push("/patients");
      }
    } catch {
      toast.error("Error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {isRegister && (
        <>
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="First Name"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              {...rhfRegister("firstName")}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Last Name"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              {...rhfRegister("lastName")}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          {...rhfRegister("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="relative">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-600"
            {...rhfRegister("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5 text-gray-500" />
            ) : (
              <Eye className="w-5 h-5 text-gray-500" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      {isRegister && (
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Role
          </label>
          <Listbox
            value={selectedRole}
            onChange={(val) =>
              setValue("role", val as "user" | "admin", {
                shouldValidate: true,
              })
            }
          >
            <div className="relative mt-1">
              <Listbox.Button
                className={`relative w-full border border-gray-300 rounded px-3 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  selectedRole ? "text-gray-900" : "text-gray-400"
                }`}
              >
                <span>
                  {selectedRole
                    ? ROLE_OPTIONS.find((o) => o.value === selectedRole)?.label
                    : "Select role"}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow-lg max-h-60 overflow-auto focus:outline-none">
                  {ROLE_OPTIONS.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      value={option.value}
                      className={({ active }) =>
                        `cursor-pointer select-none relative px-4 py-2 ${
                          active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                        }`
                      }
                    >
                      {({ selected }) => (
                        <div className="flex items-center justify-between">
                          <span
                            className={
                              selected ? "font-semibold" : "font-normal"
                            }
                          >
                            {option.label}
                          </span>
                          {selected && (
                            <Check className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
          {errors.role && (
            <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {loading
          ? isRegister
            ? "Registering…"
            : "Logging in…"
          : isRegister
          ? "Register"
          : "Login"}
      </button>
    </form>
  );
}
