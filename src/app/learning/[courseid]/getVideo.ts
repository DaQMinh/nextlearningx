import prisma from "@/lib/db";

export async function getVideo(subcourseId: string) {
    const subcourse = await prisma.part.findMany({
        where: {
            subcourseId : parseInt(subcourseId.toString(), 10),
        },
    });
    return subcourse;
}
