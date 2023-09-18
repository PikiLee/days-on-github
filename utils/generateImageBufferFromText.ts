import sharp from "sharp";

export const generateImageBufferFromText = async (text: string) => {
    const buffer = await sharp({
        text: {
        text: `<span foreground="black">${text}</span>`,
        rgba: true,
        dpi: 72,
        },
    })
        .png()
        .toBuffer();
    
    return buffer;
}