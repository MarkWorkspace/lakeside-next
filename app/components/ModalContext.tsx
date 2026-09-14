"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import PrivacyModal from "./PrivacyModal";

interface ModalContextType {
  openPrivacyModal: () => void;
  closePrivacyModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const openPrivacyModal = () => setIsPrivacyOpen(true);
  const closePrivacyModal = () => setIsPrivacyOpen(false);

  return (
    <ModalContext.Provider value={{ openPrivacyModal, closePrivacyModal }}>
      {children}
      <PrivacyModal isOpen={isPrivacyOpen} onClose={closePrivacyModal} />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}

export function PrivacyTrigger({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  const { openPrivacyModal } = useModal();
  return (
    <button type="button" onClick={openPrivacyModal} className={className}>
      {children}
    </button>
  );
}
