import { type UseFormRegisterReturn } from "react-hook-form";

export const formSelectAdapter = (
  useHookFormRegister: UseFormRegisterReturn
) => {
  return {
    ...useHookFormRegister,
    onChange: async (value: string | null) => {
      const simulatedEvent = {
        target: {
          value,
        },
      };
      await useHookFormRegister.onChange(simulatedEvent);
    },
  };
};
