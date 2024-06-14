// src/components/PasswordForm.tsx

import React, { useState, FormEvent, ChangeEvent } from "react";

interface PasswordFormProps {
  onAddPassword: (password: string) => void;
}

const PasswordForm: React.FC<PasswordFormProps> = ({ onAddPassword }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAddPassword(password);
    setPassword("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form className="password-form" onSubmit={handleSubmit}>
      <input
        className="password-input"
        type="text"
        placeholder="Digite a senha"
        value={password}
        onChange={handleChange}
      />
      <button className="submit-button" type="submit">
        Adicionar
      </button>
    </form>
  );
};

export default PasswordForm;
