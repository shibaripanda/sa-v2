export interface IpInfo {
  ip: string;
  hostname?: string;
  city?: string;
  region?: string;
  country?: string;
  loc?: string; // координаты "lat,long"
  org?: string;
  postal?: string;
  timezone?: string;
  readme?: string;
}
