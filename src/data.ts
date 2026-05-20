import { PaintColor, WheelOption, InteriorOption, WingOption, HeritageMilestone } from './types';

export const PORSCHE_CREST = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBuVRGC0AXO7kp7P-UwNSga4LOR5SX0O8cJYz3CThKyIRiTA-uM9rNeNMgYRzGILvh6-q4IlBc74M34vprfeSAAIIvyTa6S4DjYFoTsGvo5XxBeQX8aCQN05O29GgAXCXERzVGFwB5EyimdJKbz5SZYihRd_8biap2Dck7fRfmRcD7WABby9QvPl1Angn-a0SjKC9OepCcy1HOhrsOBZWpzM1aVXXTxhbnYouKWVuHfbdtxhVRqiPiPnXO8Y-rgSdZDqv2tMmWdzs';

export const IMAGES = {
  hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyC7GURrkyNCmXD_b85FsBWie0y1A0zFm2G1Upz3AbGIQsAn8G2BPnLlzhJtNC75153bcBid2yb_VYD3Z2MqtjFQCtyGoa7Lo7t8Hp47aHzVDvwDsQMs19vFGv-QAv2dElCkqbnw_mvWLgbgbcR3ECQ__Xvz8f8IZ-55EEvFL4O54GxSU7u4bdchBqOfN_Bv1vCR0Z-jNclrLBV-_8yPvgbiFBuJax2x6Z-aUxAcN8oMpnNOwQBfVz7yCJ6fXsf-Pils7-uUDHUGs',
  engineCover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnaYsKVq-ZFBnIolPRRiloSm8FcK9OM-_RbjTDe94ppK0tFt1yvdTDRTn2j3TQZBoY9Ctbh9YxFv-rAttin-nFS_6DK6OQvNVN2kmNeZWzIOkGuPeF7WhD_KZpntelW32yIBccY4vb_3KYXKVznBZGgzwt6td1t63mfGIxjocBKZNITYV4AcVJxLikZQdB0b0HP7azk5bCEEohKlynRRaxYKiY1OQj1JtaBahAIN98YLeH6wY98FsROZaJj31jwSQgzpFrCi7cAMI',
  interior: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0Tqf67P5_mbYylqTI63a3dgIgoSfU-5Dg6oSaFN7g2MxtFu-JFXjn7Zf32rMWWD6SawUoTP1EBcfrXXNNSasPD3tWPVVwFGzd0HbxYjfiaueC4L8OLbRAtHNjJYnhI0Z3AjFaEg3lJ97q9DH4PyxAQGPe-iqlmBsFGToYD6Q0Qklyso7KHOHJWtnnaCBKLz4y0pSzM18NoWd1kVYeV7VLhNJ_vNxZskgugcF9lRldyNcJQY3jJ3P1mAb1_UIDuV1Qs-EuYDmoEc4',
  trackOrange: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgPY9JOuP8mE020tnnBIWI5RDwbSZjuUo3EngAsZU8umAzObUk4-lTZOlM1OCzUk0fl4mnXtoOiOspgs-hZ4gLWgYSkkKcBrFkVIAH33sk3-PN75pCD04UCc3LXXTz9y535vO_FxPgC0Q2Z0YWV0g7QFCmIKUxLZ7M9b_pyBL5IVWoA2wC7vHcwo4gSXlQNte68eo6BQmlQODsjwDyeCT3wqkqwohoFfusveT-tM85UJXQjUtD2CklRty2PAI9U5gndnEzIlECX-U',
  wingDetail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7qm36l4K0TpThxMhtLRTiPKna34bZddUkYUmjxH08zeJ7TAhg_JkQPoXAM8-9ily9jEZQnESLB0jJ5baPIbS0HyDh79qmO85Nspd2sZipINQBRoRFsFSR7uogQMKlQDv_7gQ4DBuW0v6oyva7vOrZZsgDBreCKN8bjRz0SmgLhiPnRYmDv_ZuBnFXlAiGruCMitbfIP2Cp3T5ZA85VDV9DRL81FSQ-rwsH-zUU2q3TyscUmx-CKqm1BxlDsGL3_v6HnEXibWWds4',
  engineTopDown: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUz-u9TulQOxuL_LJOF6Gu9rhIOBCGrtqqJsnjALUwZI5UPmL0DCW6-s3qUFoHYSDrPTGlZBWNfXuykDa5el_UdfgNAfCmi57b7Lq6nm6mMXUUhCkwwy8JyLwg1TJqb56JNnrayezq7QqLze48OI6gluAJC99POfB1sh3oyjPXgjRMplCStAcHsI-XN0ggDwDP_tVzWPnlZEIF_1i1HrIg6rFZ00MKn-fvHBP_scQYkC4YIom1xVQElRNbDijICZJpuPhFxcr6ItM',
  rearShadow: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuuDihDpTrg_asc9ukMVemrOxlpw0Bd92hfAvldJg2ada_6UakLYnLXQBYlPgT6t4fXewHr_8te6CcriylL1QnP9kzXXhEl8aTI8s3wDg-7Eb6W6MhujvjWBUQMoAACRgk9aK1zQ6jOmNA7IEadEUBoEwC5wXojCqNg41Vt37S1Ireh5VUrfDbjhBKd6iVHipGc43nuB5CgTrnRTFUhtz-ZHIKeMuqCNleKQEl1twBHBp6jtPHpgyrTNgsG_ziGq8E46XtXsT_Vn8',
  tealDawn: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWEUblBQEwKF6hm1gwqrUwm1SkADKissf5UVClULDPxo24HcapNh84LHOTXnMRzK0Z2HPL-3UFDv5eEiiWwSCam0kNtTo6ZFjU2vCsAsIepttuaqWpiDjuyfzz4Wj4Orf6jkThJ2GrnWehJHMxESo8fic1JDocrZQZc-qlq74cfL5nlKMWQ9ILA8kF0nrzA-adRQmMjqYDy7OkSumckE6EfXuPj1K0da9bMGS7lgXGdT9wct78z3Jnlnqve5CxvsaYjLmHY0rbMdo',
  suspension: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEPeKMLDicEnGhbpigGFu69nwnnwlSVifFMwUTa2w8-O55aQiQdxAtCLFL6iPnmiCSbvvGFT7sTsdVSJws6K41DieYmbQsiIiub2duL7lEqMJNsv5djC3H6vQMtIhKUSAoRiZBBTzFeveaUcxAbL17zyrsGeEi9yf5dRG-Mf9HPBc7EqDANX5Ji0bnyilGI391ozpdYdP_BhtmByxCoVRSxCU-UXn9r-vTtsCekBntQ4FrvE_NE3tApbGlHU4PefXY8qKPanB66zE',
  sideReflect: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpc7_NgJKgaKDdwIlSm8B47G9bwk1kz5XzkGF4MIQtKJaTvLcGhlaEgBfzqSSkTUTKF6Mmz-w0OONRHBux-1YmWlQxjObCwysjap2fKBgCa4FSkxxo0G-g6B2ucQKVvurJ1w4AhOmNaHRVFH977C8g9fX2Qycac7rakOXa7grjAou7akei5yFX2gswy0xz3DZF9J4sFrtmbsfBcXlZtVVuEsDJmJ7G61l_qWvdZ0R5bm24joKCSpGV5H76uYIpBU22joKUYnryqfo'
};

export const PAINT_COLORS: PaintColor[] = [
  { id: 'shark_blue', name: 'Shark Blue', hex: '#0B5FA5', type: 'Special', price: 4220 },
  { id: 'guards_red', name: 'Guards Red', hex: '#D21A2C', type: 'Solid', price: 0 },
  { id: 'chalk', name: 'Chalk', hex: '#DFDDD7', type: 'Special', price: 4220 },
  { id: 'racing_yellow', name: 'Racing Yellow', hex: '#FAD201', type: 'Solid', price: 0 },
  { id: 'gt_silver', name: 'GT Silver Metallic', hex: '#8F9394', type: 'Metallic', price: 840 },
  { id: 'python_green', name: 'Python Green', hex: '#008C45', type: 'Special', price: 4220 },
  { id: 'deep_black', name: 'Deep Black Metallic', hex: '#0D0E10', type: 'Metallic', price: 840 },
  { id: 'pts_mint', name: 'PTS Mint Green', hex: '#77DD77', type: 'Paint-to-Sample', price: 14750 },
  { id: 'pts_ruby', name: 'PTS Rubystone Red', hex: '#C71585', type: 'Paint-to-Sample', price: 14750 }
];

export const WHEEL_OPTIONS: WheelOption[] = [
  { id: 'gt3_silver', name: '20/21" GT3 Wheels - Silver', image: IMAGES.sideReflect, price: 0 },
  { id: 'gt3_dark', name: '20/21" GT3 Wheels - Satin Dark Silver', image: IMAGES.sideReflect, price: 1260 },
  { id: 'gt3_neodyme', name: '20/21" GT3 Wheels - Satin Neodyme (Gold)', image: IMAGES.sideReflect, price: 1260 },
  { id: 'gt3_black', name: '20/21" GT3 Wheels - Satin Black with Shark Blue Rim', image: IMAGES.sideReflect, price: 1950 }
];

export const INTERIOR_OPTIONS: InteriorOption[] = [
  { id: 'race_tex_black', name: 'Race-Tex Cockpit with Grey Stitching', price: 0 },
  { id: 'race_tex_blue', name: 'Race-Tex Cockpit with Shark Blue Stitching', price: 4730 },
  { id: 'leather_exclusive', name: 'Exclusive Manufaktur Two-Tone Leather', price: 7920 }
];

export const WING_OPTIONS: WingOption[] = [
  { id: 'swan_neck', name: 'Fixed High Swan-Neck Motorsport Wing', price: 0 },
  { id: 'touring', name: 'Touring Package (Deleted Wing, Automatic Spoiler)', price: 1200 }
];

export const REFRESH_RATE_DATA = [
  { engineSpeed: 3000, speed: 65, torque: 340, hp: 150 },
  { engineSpeed: 4000, speed: 90, torque: 390, hp: 220 },
  { engineSpeed: 5000, speed: 115, torque: 420, hp: 300 },
  { engineSpeed: 6000, speed: 140, torque: 470, hp: 400 },
  { engineSpeed: 6100, speed: 145, torque: 470, hp: 410 }, // Max torque at 6100
  { engineSpeed: 7000, speed: 165, torque: 450, hp: 450 },
  { engineSpeed: 8000, speed: 200, torque: 410, hp: 490 },
  { engineSpeed: 8400, speed: 215, torque: 390, hp: 502 }, // Max HP at 8400
  { engineSpeed: 9000, speed: 230, torque: 370, hp: 480 }  // Redline at 9000
];

export const AERO_DATA = [
  { speed: 100, standardForce: 40, performanceForce: 60 },
  { speed: 140, standardForce: 80, performanceForce: 120 },
  { speed: 180, standardForce: 140, performanceForce: 210 },
  { speed: 220, standardForce: 220, performanceForce: 330 },
  { speed: 260, standardForce: 320, performanceForce: 480 },
  { speed: 300, standardForce: 410, performanceForce: 680 } // Dynamic wing mode downforce in kg
];

export const HERITAGE_MILESTONES: HeritageMilestone[] = [
  {
    year: '1999',
    generation: '996.1 GT3',
    title: 'The Inception of GT3',
    description: 'Born for motorsport. Homologated to compete in premium GT racing, the 996 GT3 features the legendary motorsport-derived "Mezger" 3.6L flat-six engine pumping out 360 horsepower directly to the rear wheels via a manual gearbox.',
    specs: [
      { label: 'Engine', value: '3.6L Flat-6 Mezger' },
      { label: 'Power', value: '360 HP (355 bhp)' },
      { label: '0-100 km/h', value: '4.8s' },
      { label: 'Nürburgring Lap', value: '7:56.33' }
    ]
  },
  {
    year: '2006',
    generation: '997.1 GT3',
    title: 'Chassis Revolution',
    description: 'Porsche introduces Porsche Active Suspension Management (PASM) to a track-honed weapon. Generating 415 HP from a revved-up 3.6-liter naturally aspirated flat-six, it matches incredible power with unmatched mechanical grip.',
    specs: [
      { label: 'Engine', value: '3.6L Flat-6 NA' },
      { label: 'Power', value: '415 HP' },
      { label: '0-100 km/h', value: '4.3s' },
      { label: 'Max RPM', value: '8,400' }
    ]
  },
  {
    year: '2013',
    generation: '991.1 GT3',
    title: 'PDK Speed & Active Steer',
    description: 'A revolutionary transition. The 991 GT3 shifts paradigms with a lightning-fast PDK dual-clutch transmission, active rear-axle steering, and a brand-new direct-injection engine block reaching a thrilling 9,000 RPM.',
    specs: [
      { label: 'Engine', value: '3.8L Flat-6 DI' },
      { label: 'Power', value: '475 HP' },
      { label: '0-100 km/h', value: '3.5s' },
      { label: 'Nürburgring Lap', value: '7:25.00' }
    ]
  },
  {
    year: '2021',
    generation: '992.1 GT3',
    title: 'Flracht Motorsport Crucible',
    description: 'Perfecting aerodynamic force. Borrowing the double-wishbone front suspension and high swan-neck wing of the GT3 R racer, the 992.1 GT3 makes high-speed tracks feel like visual playgrounds, packing 502 HP and sub-7 lap times.',
    specs: [
      { label: 'Engine', value: '4.0L Motorsport Flat-6' },
      { label: 'Power', value: '502 HP' },
      { label: '0-100 km/h', value: '3.4s (PDK) / 3.9s (M)' },
      { label: 'Nürburgring Lap', value: '6:59.92' }
    ]
  }
];

export const INITIAL_TELEMETRY: any[] = [
  { id: '1', track: 'Nürburgring Nordschleife (DE)', date: '2026-04-12', lapTime: '06:59.92', topSpeed: 298, maxGForce: 1.62 },
  { id: '2', track: 'Spa-Francorchamps (BE)', date: '2026-04-20', lapTime: '02:29.45', topSpeed: 278, maxGForce: 1.55 },
  { id: '3', track: 'Laguna Seca (US)', date: '2026-05-02', lapTime: '01:28.12', topSpeed: 236, maxGForce: 1.48 }
];
