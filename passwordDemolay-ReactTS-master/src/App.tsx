import React, { useState, useEffect } from "react";
import PasswordForm from "./components/PasswordForm";
import PasswordList from "./components/PasswordList";
import "./index.css";
import CarouselGold from "./components/CarouselGold";
import soundFile from "./assets/effect.mp3";

interface Password {
  id: string;
  value: string;
  chamada: boolean;
}

const App: React.FC = () => {
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [currentPassword, setCurrentPassword] = useState<Password | null>(null);

  useEffect(() => {
    const storedPasswords = localStorage.getItem("passwords");
    if (storedPasswords) {
      setPasswords(JSON.parse(storedPasswords));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("passwords", JSON.stringify(passwords));
  }, [passwords]);

  const addPassword = (password: string) => {
    const newPassword: Password = {
      id: Date.now().toString(),
      value: password,
      chamada: true,
    };

    if (currentPassword) {
      setPasswords([currentPassword, ...passwords]);
    }

    setCurrentPassword(newPassword);
  };

  const handleClickPassword = (id: string) => {
    const updatedPasswords = passwords.map((password) => {
      if (password.id === id) {
        password.chamada = !password.chamada;
      }
      return password;
    });
    setPasswords(updatedPasswords);

    const clickedPassword = updatedPasswords.find(
      (password) => password.id === id
    );
    if (clickedPassword) {
      setCurrentPassword(clickedPassword);

      const audio = new Audio(soundFile);
      audio.play();
    }
  };

  const preparacaoPasswords = passwords.filter((password) => !password.chamada);
  const chamadaPasswords = passwords.filter((password) => password.chamada);

  return (
    <>
      <CarouselGold />
      <div className="container">
        <div className="left-side">
          <div className="password-container">
            {currentPassword ? (
              <div className="password">{currentPassword.value}</div>
            ) : (
              <div className="password"></div>
            )}
          </div>
          <PasswordForm onAddPassword={addPassword} />
        </div>
        <div className="right-side">
          <div className="preparacao-passwords">
            <h2>Senhas anteriores</h2>
            <PasswordList
              passwords={chamadaPasswords.slice(0, 4)}
              onClickPassword={handleClickPassword}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
