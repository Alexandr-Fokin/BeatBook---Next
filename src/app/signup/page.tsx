import { signup } from "./actions";
import styles from "../login/login.module.css";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className={styles.login}>
      <img src="/logo-id.svg" alt="Логотип" className={styles.logo_id} />
      <h1 className={styles.login_title}>Создайте аккаунт</h1>
      <form action="" className={styles.login_form}>
        <div className={styles.form_input_box}>
          {/* <label htmlFor="name">Имя:</label> */}
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Имя пользователя"
            required
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

        <button formAction={signup} className={styles.form_login_btn}>
          Зарегистрироваться
        </button>
        <p>
          Уже есть аккаунт? <Link href='/login'>Войдите в него</Link>
        </p>
      </form>
    </div>
  );
}
