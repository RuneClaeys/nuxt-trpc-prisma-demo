<script lang="ts" setup>
import { Blog } from '@prisma/client';

const { blog } = useTrpc();

//#region Blogs
// const { data: blogs, execute } = useFetch('/api/blogs');
const { data: blogs, execute } = blog.getBlogs.useQuery();
//#endregion

//#region New Blog
const newBlog = ref<Pick<Blog, 'name' | 'description'>>({ name: '', description: '' });

async function createBlog() {
   const response = await blog.addBlog.mutate(newBlog.value);

   blogs.value.push(response);
   newBlog.value = { description: '', name: '' };
}

async function deleteBlog(id: number) {
   await blog.deleteBlog.mutate(id);

   blogs.value = blogs.value.filter((blog) => blog.id !== id);
}
//#endregion
</script>

<template>
   <main>
      <form @submit.prevent="createBlog">
         <input v-model="newBlog.name" type="text" name="name" required />
         <input v-model="newBlog.description" type="text" name="description" required />

         <button>Submit</button>
      </form>

      <ul>
         <li v-for="blog in blogs" :key="blog.id">
            <p>{{ blog.name }}</p>
            <button @click="deleteBlog(blog.id)">x</button>
         </li>
      </ul>
   </main>
</template>

<style scoped>
main {
   display: flex;
   flex-direction: column;
   align-items: center;
}

ul {
   list-style: none;
   padding: 0;
}

li {
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 1rem;
   width: 100%;
   max-width: 500px;
   gap: 1rem;
}
</style>
