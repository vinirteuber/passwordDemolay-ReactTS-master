import React, { useState, useEffect } from "react";
import PasswordForm from "./components/PasswordForm";
import PasswordList from "./components/PasswordList";
import "./index.css";
import CarouselGold from "./components/CarouselGold";
import CarouselBronze from "./components/CarouselBronze";
import CarouselApoiador from "./components/CarouselApoiador";
import soundFile from "./assets/effect.mp3";

interface Password {
  id: string;
  value: string;
  chamada: boolean;
}

const App: React.FC = () => {
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [currentPassword, setCurrentPassword] = useState<string | null>(null);
  const [currentCarousel, setCurrentCarousel] = useState<string>("gold");

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
      chamada: false,
    };
    setPasswords([newPassword, ...passwords]);
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
      setCurrentPassword(clickedPassword.value);

      const audio = new Audio(soundFile);
      audio.play();
    }
  };

  const preparacaoPasswords = passwords
    .filter((password) => !password.chamada)
    .slice(0, 3);

  const halfIndex = Math.ceil(preparacaoPasswords.length / 2);
  const firstColumnPasswords = preparacaoPasswords.slice(0, halfIndex);
  const secondColumnPasswords = preparacaoPasswords.slice(halfIndex);

  useEffect(() => {
    const carouselTimeout = setTimeout(() => {
      if (currentCarousel === "gold") {
        setCurrentCarousel("bronze");
      } else if (currentCarousel === "bronze") {
        setCurrentCarousel("apoiador");
      } else {
        setCurrentCarousel("gold");
      }
    }, getCarouselTimeout(currentCarousel));

    return () => clearTimeout(carouselTimeout);
  }, [currentCarousel]);

  const getCarouselTimeout = (carousel: string): number => {
    if (carousel === "gold") {
      return 5 * 60 * 1000; // 5 minutos em milissegundos
    } else if (carousel === "bronze") {
      return 3 * 60 * 1000; // 3 minutos em milissegundos
    } else {
      return 1 * 60 * 1000; // 1 minuto em milissegundos
    }
  };

  return (
    <>
      {currentCarousel === "gold" && <CarouselGold />}
      {currentCarousel === "bronze" && <CarouselBronze />}
      {currentCarousel === "apoiador" && <CarouselApoiador />}
      <div className="container">
        <div className="left-side">
          <div className="password-container">
            {currentPassword ? (
              <div className="password">{currentPassword}</div>
            ) : (
              <div className="password"></div>
            )}
          </div>
          <PasswordForm onAddPassword={addPassword} />
        </div>
        <div className="right-side">
          <div className="preparacao-passwords">
            <h2>Senhas em preparação</h2>
            <div className="password-columns">
              <div className="password-column">
                <PasswordList
                  passwords={firstColumnPasswords}
                  onClickPassword={handleClickPassword}
                />
              </div>
              <div className="password-column">
                <PasswordList
                  passwords={secondColumnPasswords}
                  onClickPassword={handleClickPassword}
                />
              </div>
            </div>
          </div>
          <div className="chamada-passwords">
            <PasswordList
              passwords={passwords
                .filter((password) => password.chamada)
                .slice(0, 3)}
              onClickPassword={handleClickPassword}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
