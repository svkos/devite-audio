import { Colors } from "@atoms/ColorPicker/ColorPicker";
import { Texture } from "@atoms/TexturePicker/constant";
import { TopType } from "@type/all";

const topColorsTransparent = [
    Colors.Transparent,
    Colors.Black,
    Colors.White,
    Colors.Red,
    Colors.Pink,
    Colors.Orange,
    Colors.Yellow,
    Colors.Green,
    Colors.Turquoise,
    Colors.Blue,
    Colors.DeepBlue,
    Colors.Indigo,
    Colors.Purple,
];

const topColorsNotTransparent = [
    Colors.White,
    Colors.Black,
    Colors.Red,
    Colors.Pink,
    Colors.Orange,
    Colors.Yellow,
    Colors.GreenSolid,
    Colors.BlueSolid,
    Colors.DeepBlueSolid,
    Colors.Beige,
];

export const topColorsType = {
    [TopType.NotTransparent]: topColorsNotTransparent,
    [TopType.Transparent]: topColorsTransparent,
};

const topTexturePremium = [
    Texture.Pearl2,
    Texture.Pearl1,
    Texture.Silver,
    Texture.Gold,
    Texture.Wood1,
    Texture.Wood2,
    Texture.Wood3,
    Texture.Wood4,
    Texture.Wood5,
    Texture.Wood6,
    Texture.WoodGB1,
    Texture.WoodGB2,
];

const topTexturePerl = [
    Texture.Black,
    Texture.Blue,
    Texture.Orange,
    Texture.Pink,
    Texture.Purple,
    Texture.Red,
    Texture.Yellow,
    Texture.Turquoise,
];

export const topTextureType = {
    [TopType.Pearle]: topTexturePerl,
    [TopType.Premium]: topTexturePremium,
};
