import { TopType } from "@type/all";

export const isTextureType = (type: TopType) => [TopType.Pearle, TopType.Premium].includes(type);
export const isColorsType = (type: TopType) =>
    [TopType.NotTransparent, TopType.Transparent].includes(type);
