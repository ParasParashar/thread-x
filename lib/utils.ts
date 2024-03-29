import { format, isToday, isYesterday } from "date-fns";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${time} - ${formattedDate}`;
}

export function formatThreadCount(count: number): string {
  if (count === 0) {
    return "No Threads";
  } else {
    const threadCount = count.toString().padStart(2, "0");
    const threadWord = count === 1 ? "Thread" : "Threads";
    return `${threadCount} ${threadWord}`;
  }
}
export function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  if (isToday(date)) {
    return `today at ${format(date, "p")}`;
  } else if (isYesterday(date)) {
    return `yesterday at ${format(date, "p")}`;
  } else {
    return format(date, "MMM dd yyyy 'at' p");
  }
}

export function debounce(fn: Function, time: number) {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    // @ts-ignore
    let context: any = this;
    timeoutId = setTimeout(() => {
      fn.apply(context, args);
      timeoutId = null;
    }, time);
  };
}
