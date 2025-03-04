/**
 * Utilidades para manipulação de datas
 */

/**
 * Formata uma data para exibição no formato local (DD/MM/YYYY)
 * @param date Data para formatar
 * @returns String formatada da data
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

/**
 * Formata uma data para exibição no formato local com hora (DD/MM/YYYY HH:MM)
 * @param date Data para formatar
 * @returns String formatada da data com hora
 */
export const formatDateTime = (date: Date): string => {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Obtém a data de hoje no início do dia (00:00:00)
 * @returns Data de hoje no início do dia
 */
export const getStartOfDay = (): Date => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
};

/**
 * Obtém a data de hoje no final do dia (23:59:59)
 * @returns Data de hoje no final do dia
 */
export const getEndOfDay = (): Date => {
  const date = new Date();
  date.setHours(23, 59, 59, 999);
  return date;
};

/**
 * Obtém a data de início do mês atual
 * @returns Data de início do mês atual
 */
export const getStartOfMonth = (): Date => {
  const date = new Date();
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
};

/**
 * Verifica se duas datas são do mesmo dia
 * @param date1 Primeira data
 * @param date2 Segunda data
 * @returns true se as datas forem do mesmo dia
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};
