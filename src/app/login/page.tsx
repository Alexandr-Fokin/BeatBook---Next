import Link from "next/link";
import { login } from "./actions";
import styles from "./login.module.scss";

export default function LoginPage() {
  return (
    <div className={styles.login}>
      <img src="/logo-id.svg" alt="Логотип" className={styles.logo_id} />
      <h1 className={styles.login_title}>Войдите в аккаунт</h1>
      <form action="" className={styles.login_form}>
        <div className={styles.form_input_box}>
          {/* <label htmlFor="email">Email:</label> */}
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div className={styles.form_input_box}>
          {/* <label htmlFor="password">Пароль:</label> */}
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            required
          />
        </div>
        <button formAction={login} className={styles.form_login_btn}>
          Войти
        </button>
        <p className={styles.form_login_descr}>
          Нет аккаунта? <Link href="/signup">Зарегистрируйтесь</Link>
        </p>
      </form>
    </div>
  );
}
