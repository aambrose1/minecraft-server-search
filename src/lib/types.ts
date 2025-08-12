
export interface ApiResponse {
  online:   boolean;
  ip:       string;
  port:     number;
  hostname: string;
  version:  string;
  protocol: Protocol;
  players:  Players;
  motd:     MOTD;
  icon:     string;
  debug:    object;
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