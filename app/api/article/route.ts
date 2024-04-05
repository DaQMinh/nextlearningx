import prisma from "@/lib/prisma"
export async function POST(request: Request) {
  const res = await request.json()
  const newArticle = await prisma.article.create({
    data: {
      front: res.front,
      back: res.back,
    },
  })
  return new Response(JSON.stringify(newArticle), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export async function GET() {
  const allArticles = await prisma.article.findMany();
  return new Response(JSON.stringify(allArticles))
}