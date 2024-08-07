import { Colors } from "@atoms/ColorPicker/ColorPicker";
import { ConfiguratorColor } from "organisms/Configurator/types";

export const hexToConfiguratorColor = (color: Colors): ConfiguratorColor => {
    return colorsMap[color];
};

const colorsMap = {
    [Colors.Transparent]: { red: 232, green: 232, blue: 229 },
    [Colors.Black]: { red: 0, green: 0, blue: 0 },
    [Colors.White]: { red: 255, green: 255, blue: 255 },
    [Colors.Blue]: { red: 38, green: 151, blue: 179 },
    [Colors.DeepBlue]: { red: 21, green: 87, blue: 173 },
    [Colors.Indigo]: { red: 55, green: 51, blue: 176 },
    [Colors.Purple]: { red: 110, green: 36, blue: 150 },
    [Colors.Red]: { red: 171, green: 26, blue: 12 },
    [Colors.Pink]: { red: 200, green: 48, blue: 83 },
    [Colors.Orange]: { red: 199, green: 74, blue: 28 },
    [Colors.Yellow]: { red: 219, green: 216, blue: 65 },
    [Colors.Green]: { red: 33, green: 181, blue: 92 },
    [Colors.Turquoise]: { red: 36, green: 181, blue: 135 },
    [Colors.Beige]: { red: 240, green: 233, blue: 218 },
    [Colors.GreenSolid]: { red: 57, green: 150, blue: 60 },
    [Colors.BlueSolid]: { red: 110, green: 201, blue: 199 },
    [Colors.DeepBlueSolid]: { red: 16, green: 40, blue: 163 },
};
