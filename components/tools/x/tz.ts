// Time zone helpers built on Intl, so daylight saving is applied for the chosen date.
export const ZONES: { id: string; label: string }[] = [
  { id: "UTC", label: "UTC" },
  { id: "Pacific/Honolulu", label: "Honolulu" },
  { id: "America/Anchorage", label: "Anchorage" },
  { id: "America/Los_Angeles", label: "Los Angeles (Pacific)" },
  { id: "America/Vancouver", label: "Vancouver" },
  { id: "America/Denver", label: "Denver (Mountain)" },
  { id: "America/Chicago", label: "Chicago (Central)" },
  { id: "America/Mexico_City", label: "Mexico City" },
  { id: "America/New_York", label: "New York (Eastern)" },
  { id: "America/Toronto", label: "Toronto" },
  { id: "America/Bogota", label: "Bogota" },
  { id: "America/Sao_Paulo", label: "Sao Paulo" },
  { id: "America/Argentina/Buenos_Aires", label: "Buenos Aires" },
  { id: "Atlantic/Reykjavik", label: "Reykjavik" },
  { id: "Europe/London", label: "London" },
  { id: "Europe/Dublin", label: "Dublin" },
  { id: "Europe/Lisbon", label: "Lisbon" },
  { id: "Europe/Paris", label: "Paris" },
  { id: "Europe/Berlin", label: "Berlin" },
  { id: "Europe/Madrid", label: "Madrid" },
  { id: "Europe/Rome", label: "Rome" },
  { id: "Europe/Athens", label: "Athens" },
  { id: "Europe/Istanbul", label: "Istanbul" },
  { id: "Europe/Moscow", label: "Moscow" },
  { id: "Africa/Cairo", label: "Cairo" },
  { id: "Africa/Lagos", label: "Lagos" },
  { id: "Africa/Nairobi", label: "Nairobi" },
  { id: "Africa/Johannesburg", label: "Johannesburg" },
  { id: "Asia/Riyadh", label: "Riyadh" },
  { id: "Asia/Tehran", label: "Tehran" },
  { id: "Asia/Dubai", label: "Dubai" },
  { id: "Asia/Karachi", label: "Karachi" },
  { id: "Asia/Kolkata", label: "India (Kolkata)" },
  { id: "Asia/Dhaka", label: "Dhaka" },
  { id: "Asia/Bangkok", label: "Bangkok" },
  { id: "Asia/Singapore", label: "Singapore" },
  { id: "Asia/Hong_Kong", label: "Hong Kong" },
  { id: "Asia/Shanghai", label: "Shanghai" },
  { id: "Asia/Tokyo", label: "Tokyo" },
  { id: "Asia/Seoul", label: "Seoul" },
  { id: "Australia/Perth", label: "Perth" },
  { id: "Australia/Sydney", label: "Sydney" },
  { id: "Pacific/Auckland", label: "Auckland" },
];

const cache = new Map<string, Intl.DateTimeFormat>();
function dtf(zone: string) {
  let f = cache.get(zone);
  if (!f) {
    f = new Intl.DateTimeFormat("en-US", { timeZone: zone, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" });
    cache.set(zone, f);
  }
  return f;
}

/** Offset of `zone` from UTC in minutes at instant `ts` (positive east of UTC). */
export function offsetMinutes(zone: string, ts: number) {
  const p: Record<string, number> = {};
  for (const x of dtf(zone).formatToParts(new Date(ts))) if (x.type !== "literal") p[x.type] = Number(x.value);
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour % 24, p.minute, p.second);
  return Math.round((asUtc - Math.floor(ts / 1000) * 1000) / 60000);
}

/** Convert a wall clock time in `zone` to a UTC timestamp. In a DST gap the time moves forward. */
export function zonedToUtc(y: number, mo: number, d: number, h: number, mi: number, zone: string) {
  const guess = Date.UTC(y, mo - 1, d, h, mi);
  let utc = guess - offsetMinutes(zone, guess) * 60000;
  const off2 = offsetMinutes(zone, utc);
  utc = guess - off2 * 60000;
  return utc;
}

export function parseLocal(value: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(value);
  return m ? { y: +m[1], mo: +m[2], d: +m[3], h: +m[4], mi: +m[5] } : null;
}

export function fmtZone(ts: number, zone: string, opts?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-US", { timeZone: zone, ...(opts ?? { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" }) }).format(new Date(ts));
}

export function dayKey(ts: number, zone: string) {
  const p = dtf(zone).formatToParts(new Date(ts));
  const g = (t: string) => p.find((x) => x.type === t)?.value ?? "";
  return `${g("year")}-${g("month")}-${g("day")}`;
}

export function offsetLabel(mins: number) {
  const sign = mins < 0 ? "-" : "+";
  const a = Math.abs(mins);
  const h = Math.floor(a / 60), m = a % 60;
  return `${sign}${h ? h + "h" : ""}${h && m ? " " : ""}${m ? m + "m" : ""}` || "0h";
}

export function nowLocalInput(zone: string) {
  const p = dtf(zone).formatToParts(new Date());
  const g = (t: string) => p.find((x) => x.type === t)?.value ?? "00";
  return `${g("year")}-${g("month")}-${g("day")}T${g("hour")}:${g("minute")}`;
}
