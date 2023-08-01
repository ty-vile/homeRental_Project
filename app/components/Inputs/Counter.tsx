"use client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [value, onChange]);

  const onSubtract = useCallback(() => {
    if (value === 1) {
      return;
    }

    onChange(value - 1);
  }, [value, onChange]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-500">{subtitle}</div>
      </div>
      <div className="flex items-center gap-4">
        <div
          onClick={onSubtract}
          className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition"
        >
          <AiOutlineMinus size={24} />
        </div>
        <div className="font-light text-xl text-gray-500">{value}</div>
        <div
          onClick={onAdd}
          className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition"
        >
          <AiOutlinePlus size={24} />
        </div>
      </div>
    </div>
  );
};

export default Counter;
