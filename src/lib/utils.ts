import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export interface Apiresponse {
  online:   boolean;
  ip:       string;
  port:     number;
  hostname: string;
  version:  string;
  protocol: Protocol;
  players:  Players;
  motd:     MOTD;
  icon:     string;
}

export interface MOTD {
  raw:   string;
  clean: string;
  html:  string;
}

export interface Players {
  online: number;
  max:    number;
}

export interface Protocol {
  version: number;
  name:    string;
}

