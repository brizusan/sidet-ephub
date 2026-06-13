import { FormHTMLAttributes } from "react";
import clsx from "clsx";

type Props = FormHTMLAttributes<HTMLFormElement>;

export default function Form(props: Props) {
  const { className } = props;

  return (
    <form {...props} className={clsx("mt-10 p-4  space-y-2", className)}>
      {props.children}
    </form>
  );
}
