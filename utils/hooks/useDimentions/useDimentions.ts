import { useState, useCallback, useLayoutEffect } from "react";

//@ts-ignore
function getDimensionObject(node: HTMLElement): DimensionObject {
    const rect = node.getBoundingClientRect();

    return {
        width: rect.width,
        height: rect.height,
        right: rect.right,
        bottom: rect.bottom,
    };
}

//@ts-ignore
function useDimensions({ liveMeasure = true }: UseDimensionsArgs = {}): UseDimensionsHook {
    const [dimensions, setDimensions] = useState({});
    const [node, setNode] = useState(null);

    //@ts-ignore
    const ref = useCallback((node) => {
        setNode(node);
    }, []);

    useLayoutEffect(() => {
        if (node) {
            const measure = () =>
                window.requestAnimationFrame(() => setDimensions(getDimensionObject(node)));
            measure();

            if (liveMeasure) {
                window.addEventListener("resize", measure);
                // window.addEventListener("scroll", measure);

                return () => {
                    window.removeEventListener("resize", measure);
                    // window.removeEventListener("scroll", measure);
                };
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [node]);

    return [ref, dimensions, node];
}

export default useDimensions;
