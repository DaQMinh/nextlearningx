import prisma from "@/lib/db";

export async function getCourse(){
    const course = await prisma.course.findMany({
        include : {
            subcourses : {
                include : {
                    parts : false
                }
            }
        }
    })
    return course
}

