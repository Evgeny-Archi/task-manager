import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

// 00 июля 2021 г., 00:00
const transformToRuString = (value: any): string => {
  const date = new Date(value);
  return date.toLocaleString('ru-Ru', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};

// 5 минут назад / 6 часов назад / 00 июля 2021 г., 00:00
const transformToPassedTime = (diff: number): string => {
  const sec = Math.trunc(diff / 1000);
  const min = Math.trunc(sec / 60);
  const hours = Math.trunc(min / 60);
  if (hours === 0 && min === 0) {
    return 'только что';
  } else if (hours === 0) {
    // Извините, на грамматику не стал тратить время
    return `${min} минут назад`;
  } else {
    return `${hours} часов назад`;
  }
};

@Pipe({
  name: 'customDate',
})
export class CustomRuDatePipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: string): any {
    if (args === 'ruLocaleString') {
      return transformToRuString(value);
    } else if (args === 'passedTime') {
      // Фиксируем текущее время (для демонстрации)
      const date = new Date(1625732028948);
      // Кол-во миллисекунд в одном дне
      const msInDay = 86400000;

      const nowUtc = Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
      );
      const diff = nowUtc - value;

      // Если прошло больше 1 дня - возвращаем полную дату. Наоборот - форматируем в кол-во секунд / минут / часов, прошедших с момента создания
      if (diff > msInDay) {
        return transformToRuString(value);
      } else {
        return transformToPassedTime(diff);
      }
    } else {
      // Возвращаем значение по умолчанию
      return super.transform(value, 'EEEE d MMMM y h:mm a');
    }
  }
}
