export type BannerMediaType = "IMAGE" | "VIDEO";

export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  subtitleAlt: string;
  mediaUrl: string;
  mediaType: BannerMediaType;
  displayOrder: number;
  enabled: boolean;
  startAt: string;
  endAt: string | null;
  buttonLabel?: string;
  buttonUrl?: string;
  status: string;
}
