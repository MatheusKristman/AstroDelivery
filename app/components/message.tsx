import { cn } from "@/lib/utils";

interface MessageProps {
  animation: boolean;
  message: string;
  type: "success" | "error" | null;
}

const Message = ({ animation, message, type }: MessageProps) => {
  console.log({ type });

  return (
    <div
      className={cn(
        "w-full rounded-xl px-6 py-4 bg-slate-400 flex items-center justify-center",
        animation ? "animate-fade-in" : "animate-fade-out",
        type === "error" && "bg-red-400",
        type === "success" && "bg-green-400",
      )}
    >
      <span
        className={cn("text-slate-900 text-center text-lg font-semibold", {
          "text-green-900": type === "success",
          "text-red-900": type === "error",
        })}
      >
        {message}
      </span>
    </div>
  );
};

export default Message;
