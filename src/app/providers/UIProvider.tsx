"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import styles from "./UIProvider.module.css";
import Image from "next/image";

type UIContextType = {
  showModal: (content: ReactNode) => void;
  closeModal: () => void;
  showToast: (title: string, text: string, type?: "success" | "error" | "info") => void;
};

const UIContext = createContext<UIContextType | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [popupContent, setpopupContent] = useState<ReactNode | null>(null);
  const [toast, setToast] = useState<{
    title: string;
    text: string;
    type: string;
  } | null>(null);

  const showModal = (content: ReactNode) => setpopupContent(content);
  const closeModal = () => setpopupContent(null);

  const showToast = (title: string, text: string, type = "info") => {
    setToast({ title, text, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <UIContext.Provider value={{ showModal, closeModal, showToast }}>
      {children}

      {popupContent && (
        <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
          <div className={styles.popup__overlay} onClick={closeModal}></div>
          <div className={styles.popup__block}>
            <div className={styles.popup__block_inner}>{popupContent}</div>

            <div className={styles.popup__close} onClick={closeModal}>
              ✕
            </div>
          </div>
        </div>
      )}

      <div
        className={`${styles.toast} ${toast ? styles[`toast-${toast.type}`] : ""} ${toast ? styles.show : ""}`}
      >
        <div className={`${styles.toast__icon} ${toast ? toast.type : ""}`}>
          {toast?.type === "success" && (
            <Image
              unoptimized
              src="/icons/success.svg"
              width={16}
              height={16}
              alt="Иконка успеха"
            />
          )}
          {toast?.type === "error" && (
            <Image
              unoptimized
              src="/icons/error.svg"
              width={16}
              height={16}
              alt="Иконка ошибки"
            />
          )}
          {toast?.type === "info" && (
            <Image
              unoptimized
              src="/icons/info.svg"
              width={16}
              height={16}
              alt="Иконка информации"
            />
          )}
        </div>
        <div className={styles.toast__content}>
          {toast && toast.title && (
            <div className={styles.toast__title}>{toast.title}</div>
          )}
          <div className={styles.toast__text}>{toast ? toast.text : ""}</div>
        </div>
      </div>
    </UIContext.Provider>
  );
}

export const useUI = () => {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside UIProvider");
  return ctx;
};
