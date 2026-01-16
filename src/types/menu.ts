export type MegaMenuItem = {
  label: string;
  path: string;
};

export type MegaMenuColumn = {
  title: string;
  items: MegaMenuItem[];
};

export type MegaMenuData = MegaMenuColumn[];
