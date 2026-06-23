import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;
export function FormSubmit(props: Props) {
  return (
    <input
      {...props}
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded cursor-pointer mt-4"
    />
  );
}
