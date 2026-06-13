import { LabelHTMLAttributes } from "react";

type Props = LabelHTMLAttributes<HTMLLabelElement>;

export default function FormLabel(props: Props) {
  return (
    <label {...props} className="block font-semibold text-lg text-slate-600">
      {props.children}
    </label>
  );
}
