import prisma from '../../prisma';

export default defineEventHandler(async (event) => {
   const body = await readBody(event);
   return prisma.blog.create({ data: body });
});
