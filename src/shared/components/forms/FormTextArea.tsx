import clsx from "clsx";
import { TextareaHTMLAttributes } from "react";

type FormTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function FormTextArea(props: FormTextAreaProps) {
  const { className, ...rest } = props;
  return (
    <textarea
      className={clsx("w-full rounded-md border p-2", className)}
      {...rest}
    />
  );
}
