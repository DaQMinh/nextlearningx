import prisma from "@/lib/db";

export default async function getCourse(){
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

