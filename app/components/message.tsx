import { cn } from "@/lib/utils";

interface MessageProps {
  animation: boolean;
  message: string;
}

const Message = ({ animation, message }: MessageProps) => {
  return (
    <div
      className={cn(
        "w-full rounded-xl px-6 py-4 bg-green-400 flex items-center justify-center",
        animation ? "animate-fade-in" : "animate-fade-out",
      )}
    >
      <span className="text-green-900 text-center text-lg font-semibold">
        {message}
      </span>
    </div>
  );
};

export default Message;
