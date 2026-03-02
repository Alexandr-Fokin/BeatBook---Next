import styles from "./confirm-email.module.scss";
export default function Page() {
  return (
    <div className={styles.message}>
      <h1 className={styles.message_title}>Аккаунт создан!</h1>
      <div className={styles.message_confirm}>
        <p>
          На вашу почту пришло письмо с ссылкой. Подтвердите email, перейдя по
          ссылке, чтобы получить доступ к личному кабинету
        </p>
      </div>
    </div>
  );
}
