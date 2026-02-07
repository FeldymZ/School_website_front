export type ActiviteMediaPublic = {
  url: string;
  type: "IMAGE" | "VIDEO";
};

export type ActivitePublic = {
  id: number;
  titre: string;
  contenu: string;
  slug: string;
  medias: ActiviteMediaPublic[];
};
