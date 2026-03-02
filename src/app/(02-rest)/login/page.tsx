"use client";

import Link from "next/link";
import { login, LoginState, newLogin } from "./actions";
import styles from "./login.module.scss";
import { useActionState, useState } from "react";
import FeatherIcon from "feather-icons-react";

export default function LoginPage() {
  const initialState: LoginState = { error: undefined };
  const [state, action, isPending] = useActionState(newLogin, initialState);
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
      <h1 className={styles.login_title}>Войдите в аккаунт</h1>
      <form action={action} className={styles.login_form}>
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
            defaultValue={state.values?.password}
          />
          <FeatherIcon
            icon={passwordType === "password" ? "eye" : "eye-off"}
            className={styles.form_login_password_eye}
            onClick={togglePasswordType}
          />
        </div>
        <button className={styles.form_login_btn} disabled={isPending}>
          {isPending ? "Входим..." : "Войти"}
        </button>
        <p className={styles.form_login_descr}>
          Нет аккаунта? <Link href="/signup">Зарегистрироваться</Link>
        </p>
        {state.error && <p className={styles.form_login_error}>Ошибка: {state.error}</p>}
      </form>
    </div>
  );
}
