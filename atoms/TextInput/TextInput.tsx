import { TextInput as MantineTextInput, TextInputProps } from "@mantine/core";
import { useColors } from "theme/theme";
import { useIsMobile } from "utils/hooks/useIsMobile/useIsMobile";

export const TextInput = (props: TextInputProps) => {
    const colors = useColors();
    const isMobile = useIsMobile();

    return (
        <MantineTextInput
            size={isMobile ? "lg" : "xl"}
            styles={{
                input: {
                    borderRadius: 8,
                    borderColor: colors.grey600,
                    paddingLeft: 16,
                    fontSize: isMobile ? 18 : 20,
                },
            }}
            {...props}
        />
    );
};
