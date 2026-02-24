export type LabelProps = {
    title: string;
    subtitle?: string;
    year?: number;
    extra?: string;
    template: keyof typeof backgrounds;
    font: keyof typeof fonts;
    color: string;
};

export const fonts = {
    "": "Standard",
    "Indie Flower": "Indie Flower",
    "Caveat": "Caveat",
    "Gloria Hallelujah": "Gloria Hallelujah",
    "Patrick Hand": "Patrick Hand",
    "Nunito": "Nunito",
    "Quicksand": "Quicksand",
    "Roboto": "Roboto",
    "Open Sans": "Open Sans",
}

export const backgrounds = {
    "empty": ["Kein Hintergrund", ""],
    "circles": ["Kreise", "circles.jpg"],
    "grid": ["Karopapier", "grid.jpg"],
}