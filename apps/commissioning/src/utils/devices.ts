import { ApiFile, Battery, Inverter, Meter, Site, VerificationTestStatus } from "@src/integrations/youdera/apiTypes";
import { reverse, sortBy } from "lodash";
import { useMemo } from "react";

export type DeviceType = 'Inverter' | 'Battery' | 'Meter';

/**
 * Type to unify inverters, batteries and meters for when they're rendered in
 * the same list.
 */
export type Device = (
  | Inverter & { type: 'Inverter' }
  | Battery & { type: 'Battery' }
  | Meter & {
    type: 'Meter',
    /** copy of `number` for Meter. Inverter and Battery already have this field */
    serial_number: string;
  }
) & {
  imageUrl: string;
  verificationTestStatus?: VerificationTestStatus;
};

function toThumbnailUrl(file?: ApiFile) {
  // TODO: get proper placeholder image
  return file?.url_thumb || "https://picsum.photos/100";
}

export const commStatusToIcon = {
  success: 'StatusOk',
  failed: 'StatusError',
  pending: 'StatusPending'
} as const;

export function toDevice(thing: Inverter | Battery | Meter, type: DeviceType) {
  const newestFirstTestLogs = reverse(sortBy(thing.testlogs || [], ['created_at']));
  return {
    ...thing,
    type,
    ...(type === 'Meter' && { serial_number: (thing as Meter).number }),
    imageUrl: toThumbnailUrl(thing?.files?.[0]),
    verificationTestStatus: newestFirstTestLogs?.[0]?.status, 
    testlogs: newestFirstTestLogs,
  } as Device;
}

/**
 * Convenience hook to transform inverters, batteries and meters of a site to the `Device` type
 */
export function useExtractDevices({ inverters, batteries, meters }: Site) {
  return useMemo(() => [
    ...(inverters || []).map(d => toDevice(d, 'Inverter')),
    ...(batteries || []).map(d => toDevice(d, 'Battery')),
    ...(meters || []).map(d => toDevice(d, 'Meter'))
  ], [inverters, batteries, meters]);
}