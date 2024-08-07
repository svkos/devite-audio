import { Checkbox as MantineCheckbox, CheckboxProps } from "@mantine/core";
import { useColors } from "theme/theme";
import { useIsMobile } from "utils/hooks/useIsMobile/useIsMobile";

export const Checkbox = (props: CheckboxProps) => {
    const isMobile = useIsMobile();
    const colors = useColors();

    return (
        <MantineCheckbox
            variant="outline"
            color={colors.black}
            c={colors.black}
            size="sm"
            styles={{
                label: { fontSize: isMobile ? 16 : 20 },
                input: { borderColor: colors.black },
            }}
            {...props}
        />
    );
};
