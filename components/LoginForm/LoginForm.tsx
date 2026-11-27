"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";
import { login } from "@/lib/api/clientApi";
import styles from "./LoginForm.module.css";

const loginSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),

  password: Yup.string()
    .required("Password is required"),
});

export default function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (formData: FormData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const formValues = Object.fromEntries(formData);
      const validatedValues = await loginSchema.validate(
        formValues,
        {
          abortEarly: false,
        }
      );

      await login(validatedValues);

      toast.success("Login successful");

      router.replace("/");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach(({ path, message }) => {
          toast.error(message, {
            id: `login-${path}`,
          });
        });

        return;
      }

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "Login failed. Please try again."
        );

        return;
      }

      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className={styles.form}
      action={handleSubmit}
      noValidate
    >
      <div className={styles.fields}>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Email address"
          aria-label="Email address"
          autoComplete="email"
          value={values.email}
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              email: event.target.value,
            }))
          }
        />

        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          aria-label="Password"
          autoComplete="current-password"
          value={values.password}
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              password: event.target.value,
            }))
          }
        />
      </div>

      <div className={styles.actions}>
        <button
          className={styles.button}
          type="submit"
          disabled={isSubmitting}
        >
          Log in
        </button>

        <Link href="/register" className={styles.link}>
          Don&apos;t have an account?
        </Link>
      </div>
    </form>
  );
}