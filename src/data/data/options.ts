import { Status } from '../types';

type DataOptions = {
  categories: string[];
  errorTypes: string[];
  equipments: string[];
  grounds: string[];
  resolutions: string[];
  resolutionStatuses: string[];
  states: string[];
  statuses: Status[];
  steps: string[];
};

const options: DataOptions = {
  categories: ['software', 'spacecraft', 'hardware'],
  errorTypes: [
    'Offline',
    'Degraded',
    'Solar panel misalignment',
    'SARM failure',
    'Power degradation',
    'Weak signal',
    'Memory limit reached',
    'Out of disk space',
    'Limited disk space',
    'NOLOCK',
  ],
  equipments: [
    'ANT',
    'BAFB',
    'RVC',
    'SLWS',
    'USP',
    'VAFB',
    'WS',
    'WSB',
    'SFEP',
    'ECEU',
  ],
  grounds: ['CTS', 'DGS', 'GTS', 'TCS', 'VTS', 'NHS', 'TTS', 'HTS'],
  resolutions: ['complete', 'failed', 'pass', 'prepass', 'scheduled'],
  resolutionStatuses: ['normal', 'critical', 'off', 'standby'],
  states: ['executing', 'failed', 'ready', 'updating'],
  statuses: ['caution', 'critical', 'normal', 'off', 'serious', 'standby'],
  steps: [
    'AOS',
    'Command',
    'Configure Operation',
    'Critical Health',
    'DCC',
    'Downlink',
    'Lock',
    'LOS',
    'SARM',
    'Uplink',
  ],
};

export default options;
