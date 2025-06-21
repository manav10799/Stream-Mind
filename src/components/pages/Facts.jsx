import React, { useEffect, useMemo, useState } from "react";
import FACTS from "../../utils/TriviaFacts.json";
import { Typewriter } from "react-simple-typewriter";

const Facts = () => {
  const [random, setRandom] = useState(0);
  const getRandomNumber = () => {
    setRandom(Math.floor(Math.random() * FACTS.length));
  };
  useEffect(() => {
    getRandomNumber();
  }, []);

  return (
    <div className="text-center mt-10">
      <h1 className="mb-2 text-2xl font-semibold">
        Did you know about{" "}
        <span className="text-red-500">{FACTS[random].movie}!</span>
      </h1>

      <div className="flex items-center justify-center">
        <h2 className="text-xl font-mono w-1/2">
          <Typewriter
            words={[FACTS[random].fact]}
            cursor
            cursorStyle="|"
            typeSpeed={75}
            deleteSpeed={50}
            s
            delaySpeed={1500}
          />
        </h2>
      </div>
    </div>
  );
};

export default Facts;
