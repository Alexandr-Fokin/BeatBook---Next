"use client";

import { newSignup, SignupState } from "./actions";
import styles from "../login/login.module.scss";
import Link from "next/link";
import { useActionState, useState } from "react";
import FeatherIcon from "feather-icons-react";

export default function SignupPage() {
  const initialState: SignupState = { error: undefined };
  const [state, action, isPending] = useActionState(newSignup, initialState);
  const [passwordType, setPasswordType] = useState("password");

  const togglePasswordType = () => {
    setPasswordType((prev) => {
      if (prev === "password") return "text";
      else return "password";
    });
  };

  return (
    <div className={styles.login}>
      <img src="/logo-id.svg" alt="Логотип" className={styles.logo_id} />
      <h1 className={styles.login_title}>Создайте аккаунт</h1>
      <form action={action} className={styles.login_form}>
        <div className={styles.form_input_box}>
          {/* <label htmlFor="name">Имя:</label> */}
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Имя пользователя"
            required
            defaultValue={state.values?.name}
          />
        </div>
        <div className={styles.form_input_box}>
          {/* <label htmlFor="email">Email:</label> */}
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
            defaultValue={state.values?.email}
          />
        </div>
        <div className={styles.form_input_box}>
          {/* <label htmlFor="password">Пароль:</label> */}
          <input
            id="password"
            name="password"
            type={passwordType}
            placeholder="Пароль"
            required
          />
          <FeatherIcon
            icon={passwordType === "password" ? "eye" : "eye-off"}
            className={styles.form_login_password_eye}
            onClick={togglePasswordType}
          />
        </div>

        <button className={styles.form_login_btn} disabled={isPending}>
          {isPending ? "Создаем аккаунт..." : "Зарегистрироваться"}
        </button>
        <p className={styles.form_login_descr}>
          Уже есть аккаунт? <Link href="/login">Войдите в него</Link>
        </p>
        {state.error && <p className={styles.form_login_error}>{state.error}</p>}
      </form>
    </div>
  );
}
