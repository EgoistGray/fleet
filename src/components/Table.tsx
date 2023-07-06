import { type ComponentProps } from "react";

export function TableRow({ children, ...props }: ComponentProps<"tr">) {
  return <tr {...props}>{children}</tr>;
}

export function TableHead({ children, ...props }: ComponentProps<"thead">) {
  return (
    <thead
      {...props}
      className="border-0 border-b border-solid  border-neutral-400 text-left "
    >
      {children}
    </thead>
  );
}

export function TableColumn({ children, ...props }: ComponentProps<"th">) {
  return (
    <th {...props} className="max-w-[150px] py-3">
      {children}
    </th>
  );
}

export function TableBody({ children, ...props }: ComponentProps<"tbody">) {
  return <tbody {...props}>{children}</tbody>;
}

export function TableContent({
  className = "",
  children,
  ...props
}: ComponentProps<"td">) {
  return (
    <td {...props} className={`${className} max-w-[150px] py-5`}>
      {children}
    </td>
  );
}

export function Table({ children, ...props }: ComponentProps<"table">) {
  return (
    <div className="w-full table-fixed overflow-hidden rounded-xl bg-white p-5 px-10 shadow-sm shadow-neutral-700/10">
      <table {...props} className=" w-full border-collapse">
        {children}
      </table>
    </div>
  );
}
