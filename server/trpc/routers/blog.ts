import { z } from 'zod';
import prisma from '../../prisma';
import { publicProcedure, router } from '../trpc';

const CreateBlogValidation = z.object({
   name: z.string(),
   description: z.string().nullable(),
});

export const blogRouter = router({
   getBlogs: publicProcedure.query(() => {
      return prisma.blog.findMany();
   }),

   addBlog: publicProcedure.input(CreateBlogValidation).mutation((req) => {
      return prisma.blog.create({ data: req.input });
   }),

   deleteBlog: publicProcedure.input(z.number()).mutation((req) => {
      return prisma.blog.delete({ where: { id: req.input } });
   }),
});
