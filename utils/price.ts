import { Texture } from "@atoms/TexturePicker/constant";
import { models } from "@templates/Steps/ConfiguratorStep/Customizer/ModelCustomize/constants";
import { LogoDeviteType, LR, OrderType } from "@type/all";

export const getTotalPrice = (order: OrderType) => {
    let price = models[order.model].price;

    price += getTexturePrice("left", order);
    price += getTexturePrice("right", order);

    price += getLogoDevitePrice("left", order);
    price += getLogoDevitePrice("right", order);

    price += getCableInfo(order).price;

    return `${price}₽`;
};

export const getCableInfo = (order: OrderType) => {
    const cableCount = Object.values(order.cable).reduce((acc, count) => acc + count, 0);
    const hasMainCable = cableCount > 0;
    const mainCableColor = hasMainCable && (Number(order.cable.black) > 0 ? "Черный" : "Белый");
    const hasAdditionCable = cableCount > 1;
    const additionalCableColor =
        mainCableColor === "Черный" && Number(order.cable.white) > 0 ? "Белый" : mainCableColor;

    return {
        hasMainCable,
        mainCableColor,
        hasAdditionCable,
        additionalCableColor,
        cableCount,
        //один кабель бесплатно, дополнительные + 3400 руб каждый
        price: hasAdditionCable ? cableCount * 3400 - 3400 : 0,
    };
};

export const getLogoDevitePrice = (lr: LR, order: OrderType) => {
    let price = 0;

    // свой лого метал - 1000 руб 1 наушник
    if (order[lr].logoDevite.type === LogoDeviteType.Custom && order[lr].logoDevite.color) {
        price += 1000;
    }

    return price;
};

export const getTexturePrice = (lr: LR, order: OrderType) => {
    let price = 0;

    // Перламутр 1000 руб наушник
    if (order[lr].topTexture === Texture.Pearl1) {
        price += 1000;
    }

    // Галуиотис 1000 руб наушник
    if (order[lr].topTexture === Texture.Pearl2) {
        price += 1000;
    }

    // Гибриды - 1000 руб наушник
    if ([Texture.WoodGB1, Texture.WoodGB2].includes(order[lr].topTexture as Texture)) {
        price += 1000;
    }

    // Мамонт - 1500 руб наушник
    if (order[lr].topTexture === Texture.Mammoth) {
        price += 1500;
    }

    // карбон - 500 руб наушник
    if (order[lr].topTexture === Texture.Carbon) {
        price += 500;
    }

    // Дерево все  - 500 руб наушник
    if (
        [
            Texture.Wood1,
            Texture.Wood2,
            Texture.Wood3,
            Texture.Wood4,
            Texture.Wood5,
            Texture.Wood6,
        ].includes(order[lr].topTexture as Texture)
    ) {
        price += 500;
    }

    return price;
};
