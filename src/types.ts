export interface PaintColor {
  id: string;
  name: string;
  hex: string;
  type: 'Solid' | 'Metallic' | 'Special' | 'Paint-to-Sample';
  price: number;
}

export interface WheelOption {
  id: string;
  name: string;
  image: string;
  price: number;
}

export interface InteriorOption {
  id: string;
  name: string;
  price: number;
}

export interface WingOption {
  id: string;
  name: string;
  price: number;
}

export interface ConfigState {
  paint: PaintColor;
  wheels: WheelOption;
  interior: InteriorOption;
  brakes: 'Standard' | 'PCCB';
  wing: WingOption;
}

export interface HeritageMilestone {
  year: string;
  generation: string;
  title: string;
  description: string;
  specs: { label: string; value: string }[];
}

export interface TelemetryLog {
  id: string;
  track: string;
  date: string;
  lapTime: string;
  topSpeed: number;
  maxGForce: number;
}

export interface DriverState {
  isRegistered: boolean;
  username: string;
  flrachtId: string;
  accessCode: string;
  licenseClass: 'C' | 'B' | 'A' | 'PRO';
  telemetry: TelemetryLog[];
}
