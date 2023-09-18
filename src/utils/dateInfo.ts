import { format } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";

export const dateInfo = () => {
  const currentDate = new Date();

  return {
    currentDate,
    format: {
      br: format(currentDate, "dd/MM/yyyy", { locale: ptBR }),
      enUs: format(currentDate, "yyyy-MM-dd", { locale: enUS }),
    },
    minDate: new Date(currentDate.getFullYear() - 73, 0, 1),
  };
};
