import prisma from "@/lib/db";

export async function getVideo(subcourseId: string) {
    const subcourseNumber = parseFloat(subcourseId);

    if (!isNaN(subcourseNumber)) {
        const subcourse = await prisma.part.findMany({
            where: {
                subcourseId: parseInt(subcourseId, 10),
            },
        });
        return subcourse;
    } else {
        return null; // Returning null instead of an empty object
    }
}
