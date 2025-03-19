import React, { Fragment, useRef } from "react";
import ChatOllama from "./chat.ollama";
import imgs from "../../assets/imgs";
interface OllamaButtonProps {
  className?: string;
}
const OllamaButton: React.FC<OllamaButtonProps> = ({ className }) => {
  const ollamaChatRef = useRef<HTMLDivElement | null>(null);
  const handleButtonClick = () => {
    if (ollamaChatRef.current) {
      ollamaChatRef.current.classList.remove("hidden");
      ollamaChatRef.current.classList.add("flex");
    }
  };
  return (
    <Fragment>
      <section className={className}>
        <button
          onClick={handleButtonClick}
          className="rounded-full border p-2 border-blue-100 bg-blue-100"
        >
          <img
            src={imgs.BotImage}
            alt="Ollama"
            className="w-10 h-10 bg-cover object-cover"
          />
        </button>
      </section>
      <section className="absolute xl:bottom-10 xl:right-[2%]">
        <ChatOllama ref={ollamaChatRef} />
      </section>
    </Fragment>
  );
};

export default OllamaButton;
