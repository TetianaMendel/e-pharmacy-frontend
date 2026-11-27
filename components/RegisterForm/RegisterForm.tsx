"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";
import { register, login } from "@/lib/api/clientApi";
import styles from "./RegisterForm.module.css";

const registerSchema = Yup.object({
  username: Yup.string()
    .trim()
    .required("User name is required")
    .min(2, "User name must be at least 2 characters")
    .max(50, "User name must not exceed 50 characters"),

  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),

  phone: Yup.string()
    .required("Phone number is required")
    .matches(
      /^\+380\d{9}$/,
      "Phone number must be in the format +380XXXXXXXXX"
    ),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
      "Password must contain an uppercase letter, a lowercase letter, a number and a special character"
    ),
});

export default function RegisterForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = async (formData: FormData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const formValues = Object.fromEntries(formData);
      const validatedValues = await registerSchema.validate(
        formValues,
        {
          abortEarly: false,
        }
      );

      await register(validatedValues);

      try {
        await login({
          email: validatedValues.email,
          password: validatedValues.password,
        });
      } catch {
        toast.error(
          "Registration successful, but automatic login failed. Please log in."
        );

        router.replace("/login");
        return;
      }

      toast.success("Registration successful");

      router.replace("/");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach(({ path, message }) => {
          toast.error(message, {
            id: `register-${path}`,
          });
        });

        return;
      }

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "Registration failed. Please try again."
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
          type="text"
          name="username"
          placeholder="User Name"
          aria-label="User Name"
          autoComplete="name"
          value={values.username}
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              username: event.target.value,
            }))
          }
        />

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
          type="tel"
          name="phone"
          placeholder="Phone number"
          aria-label="Phone number"
          autoComplete="tel"
          value={values.phone}
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              phone: event.target.value,
            }))
          }
        />

        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          aria-label="Password"
          autoComplete="new-password"
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
          Register
        </button>

        <Link href="/login" className={styles.link}>
          Already have an account?
        </Link>
      </div>
    </form>
  );
}