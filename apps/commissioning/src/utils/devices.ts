import { Battery } from "@src/integrations/youdera/batteries/types";
import { ApiFile } from "@src/integrations/youdera/files/types";
import { Inverter } from "@src/integrations/youdera/inverters/types";
import { Meter } from "@src/integrations/youdera/meters/types";

export type DeviceType = 'Inverter' | 'Battery' | 'Meter';

export type Device = (
  | Inverter & { type: 'Inverter' }
  | Battery & { type: 'Battery' }
  | Meter & {
    type: 'Meter',
    /** copy of `number` */
    serial_number: string
  }
) & { imageUrl: string };

function toImageUrl(file?: ApiFile) {
  // TODO: get proper placeholder image
  return file?.url_thumb || "https://picsum.photos/100";
}

export const commStatusToIcon = {
  success: 'StatusOk',
  failed: 'StatusError',
  pending: 'StatusPending'
} as const;

export function toDevice(thing: Inverter | Battery | Meter, type: DeviceType) {
  return {
    ...thing,
    type,
    ...(type === 'Meter' && { serial_number: (thing as Meter).number }),
    imageUrl: toImageUrl(thing?.files?.[0]),
  } as Device;
}

