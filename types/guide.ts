export type GuideCategory = {
  slug: string;
  name: string;
  description: string;
};

export type GuideEntry = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  requirements: string[];
  steps: string[];
  officialLink: string;
  phone: string;
  location: string;
  updatedAt: string;
  sourceType: "oficial" | "abierto" | "ciudadano" | "verificado";
  sourceName: string;
  verificationStatus: "vigente" | "pendiente" | "en-revision";
};

export type UsefulPhone = {
  id: string;
  name: string;
  number: string;
  description: string;
  schedule: string;
};
