export type PlantSmartRecord = {
  pid: string;
  name: string;
  animals: string[];
  symptoms: {
    name: string;
    slug: string;
  }[];
  severity: {
    label: string;
    level: number;
    slug: string;
  };
  wikipedia_url: string;
};