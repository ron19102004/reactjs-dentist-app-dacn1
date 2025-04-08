import { FC, useEffect, useRef, useState } from "react";
import ListView from "../list";
import { X } from "lucide-react";
interface ChatMessage {
  message: string;
  role: "user" | "ai";
  uuid?: string;
}
interface ChatMessageResponseStream {
  message: string;
  uuid: string;
  finished: boolean;
  prompt: string;
  chatResponse: any;
  responseTime: string;
}
interface ChatOllamaProps {
  ref: React.RefObject<HTMLDivElement | null>;
}
const ChatOllama: FC<ChatOllamaProps> = ({ ref }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const socket = useRef<WebSocket | null>(null);
  const currentBotMessage = useRef<ChatMessage | null>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    socket.current = new WebSocket("wss://toilaron.icu/ai/chat");

    socket.current.onopen = () => console.log("🔵 WebSocket Connected");

    socket.current.onmessage = (event) => {
      const data: ChatMessageResponseStream = JSON.parse(event.data);
      if (
        currentBotMessage.current &&
        currentBotMessage.current.uuid === data.uuid
      ) {
        const updatedMessage: ChatMessage = {
          role: "ai",
          message:
            currentBotMessage.current.message
              .replace(/\*\*(.*?)\*\*/g, `<span class="font-bold">$1</span>`)
              .replace(
                /```([\w-]*)\n([\s\S]*?)\n```/g,
                '<pre><code class="language-$1">$2</code></pre>'
              ) + data.message,
          uuid: data.uuid,
        };
        currentBotMessage.current = updatedMessage;
        setMessages((prev) => [...prev.slice(0, -1), updatedMessage]);
      } else {
        const newMessage: ChatMessage = {
          role: "ai",
          message: data.message,
          uuid: data.uuid,
        };
        currentBotMessage.current = newMessage;
        setMessages((prev) => [...prev, newMessage]);
      }
      if (data.finished) {
        currentBotMessage.current = null;
        handleStatusButtonSend(false);
      }
    };

    return () => socket.current?.close();
  }, []);
  useEffect(() => {
    setTimeout(
      () =>
        chatContainerRef.current?.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: "smooth",
        }),
      100
    );
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([
      ...messages,
      {
        role: "user",
        message: input,
        uuid: "USER",
      },
    ]);
    socket.current?.send(input);
    setInput("");
    currentBotMessage.current = null;
    handleStatusButtonSend(true);
  };
  const handleStatusButtonSend = (isSend: boolean) => {
    if (submitButtonRef.current) {
      if (isSend) {
        submitButtonRef.current.setAttribute("disabled", "");
        submitButtonRef.current.classList.add(
          "opacity-50",
          "cursor-not-allowed"
        );
      } else {
        submitButtonRef.current.removeAttribute("disabled");
        submitButtonRef.current.classList.remove(
          "opacity-50",
          "cursor-not-allowed"
        );
      }
    }
  };
  return (
    // Ref sẽ thay đổi hidden thành flex-col khi được gọi
    <div
      ref={ref}
      className="hidden flex-col items-center justify-center h-[100vh] sm:h-[70vh]"
    >
      <div className="w-screen h-full sm:w-sm bg-white shadow-xl sm:rounded-lg overflow-hidden flex flex-col border border-gray-300">
        {/* Header */}
        <div className="p-4 bg-gray-900 text-white font-semibold text-lg flex items-center justify-between">
          <span>💬 Chatbot AI</span>
          <button
            onClick={() => {
              ref.current?.classList.add("hidden");
              ref.current?.classList.remove("flex");
            }}
            className="text-white px-2 py-1 rounded-lg transition"
          >
            <X/>
          </button>
        </div>

        {/* Chat Container */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-2 xl:h-[400px]   break-words"
        >
          <ListView
            data={messages}
            render={(message) => {
              const key =
                message.uuid + Math.random().toString(36).substring(2, 15);
              return (
                // whitespace-pre-line: Cho phép hiển thị dòng mới với \n
                <div
                  key={key}
                  className={`p-3 rounded-lg text-sm max-w-[75%] whitespace-pre-line border ${
                    message.role === "user"
                      ? "bg-gray-800 text-white self-end ml-auto"
                      : "bg-white text-gray-900 self-start"
                  }`}
                >
                  <div dangerouslySetInnerHTML={{ __html: message.message }} />
                </div>
              );
            }}
          />
        </div>

        {/* Input Box */}
        <div className="p-2 flex items-center border-t border-t-gray-300 bg-gray-50">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none  focus:border-gray-400 transition"
            placeholder="Nhập tin nhắn..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            // onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            ref={submitButtonRef}
            onClick={sendMessage}
            className="ml-3 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            🚀 Gửi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatOllama;
