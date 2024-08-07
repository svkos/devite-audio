import carbon from "./assets/carbon.png";
import mammoth from "./assets/mammoth.png";
import pearl1 from "./assets/pearl1.png";
import pearl2 from "./assets/pearl2.png";
import wood1 from "./assets/wood1.png";
import wood2 from "./assets/wood2.png";
import wood3 from "./assets/wood3.png";
import wood4 from "./assets/wood4.png";
import wood5 from "./assets/wood5.png";
import wood6 from "./assets/wood6.png";
import woodgb1 from "./assets/woodgb1.png";
import woodgb2 from "./assets/woodgb2.png";

import black from "./assets/black.png";
import blue from "./assets/blue.png";
import orange from "./assets/orange.png";
import pink from "./assets/pink.png";
import purple from "./assets/purple.png";
import red from "./assets/red.png";
import turquoise from "./assets/turquoise.png";
import yellow from "./assets/yellow.png";


export enum Texture {
    Carbon = "Карбон",
    Mammoth = "Мамонт",
    Pearl1 = "Перламутр",
    Pearl2 = "Галиотис",
    Wood1 = "Дерево 1",
    Wood2 = "Дерево 2",
    Wood3 = "Дерево 3",
    Wood4 = "Дерево 4",
    Wood5 = "Дерево 5",
    Wood6 = "Дерево 6",
    WoodGB1 = "Гибрид 1",
    WoodGB2 = "Гибрид 2",
    Black = "Черный",
    Blue = "Синий",
    Orange = "Оранжевый",
    Pink = "Розовый",
    Purple = "Фиолетовый",
    Red = "Красный",
    Yellow = "Желтый",
    Turquoise = "Бирюзовый",
}

export const textureImage = {
    [Texture.Carbon]: carbon.src,
    [Texture.Mammoth]: mammoth.src,
    [Texture.Pearl1]: pearl1.src,
    [Texture.Pearl2]: pearl2.src,
    [Texture.Wood1]: wood1.src,
    [Texture.Wood2]: wood2.src,
    [Texture.Wood3]: wood3.src,
    [Texture.Wood4]: wood4.src,
    [Texture.Wood5]: wood5.src,
    [Texture.Wood6]: wood6.src,
    [Texture.WoodGB1]: woodgb1.src,
    [Texture.WoodGB2]: woodgb2.src,
    
    [Texture.Black]: black.src,
    [Texture.Blue]: blue.src,
    [Texture.Orange]: orange.src,
    [Texture.Pink]: pink.src,
    [Texture.Purple]: purple.src,
    [Texture.Red]: red.src,
    [Texture.Turquoise]: turquoise.src,
    [Texture.Yellow]: yellow.src,
};
