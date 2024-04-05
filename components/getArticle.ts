import prisma from "@/lib/prisma";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
    const article = await prisma.article.findMany();
    return { props: article };
};