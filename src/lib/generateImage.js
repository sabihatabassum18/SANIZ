import { fal } from "@fal-ai/client";

export const generateImage = async (prompt) => {
    fal.config({
        credentials: process.env.FAL_API_KEY,
    });

    try {
        const result = await fal.subscribe("fal-ai/fast-lightning-sdxl", {
            input: {
                prompt: prompt,
            },
            logs: true,
            onQueueUpdate: (update) => {
                if (update.status === "IN_PROGRESS") {
                    update.logs.map((log) => log.message).forEach(console.log);
                }
            },
        });

        return result?.data?.images[0]?.url;
    } catch (error) {
        console.error('Error generating image:', error);
        return null;
    }
};
