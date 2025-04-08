import React, { Fragment, useRef } from "react";
import ChatOllama from "./chat.ollama";
import imgs from "../../assets/imgs";
import { cn } from "../../lib/utils";
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
      <section className={cn(className)}>
        <button
          onClick={handleButtonClick}
          className="rounded-full border p-2 border-gray-100 bg-gray-100"
        >
          <img
            src={imgs.BotImage}
            alt="Ollama"
            className="w-10 h-10 bg-cover object-cover"
          />
        </button>
      </section>
      <section className="absolute sm:bottom-10 sm:right-[2%] z-50">
        <ChatOllama ref={ollamaChatRef} />
      </section>
    </Fragment>
  );
};

export default OllamaButton;
