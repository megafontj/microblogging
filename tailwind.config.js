import daisyui from "daisyui";
import daisyUIThemes from "daisyui/src/theming/themes";

export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.jsx"
    ],
    theme: {
        extend: {},
    },
    plugins: [daisyui],
    daisyui: {
        themes: [
            "green",
            {
                black: {
                    ...daisyUIThemes["black"],
                    primary: "rgb(0, 152, 95)",
                    secondary: "rgb(24, 24, 24)",
                }
            }
        ]
    }
}
