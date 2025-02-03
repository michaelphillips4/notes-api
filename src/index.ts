import { Elysia,t } from "elysia";
import { swagger } from '@elysiajs/swagger';


class Note { 
  constructor(public data: string[] = ['Moonhalo']) {} 
} 


const app = new Elysia()
// Apply the swagger plugin
  .use(swagger()) 
  .get("/", () => "Hello Elysia")
  .get("/hello", () => "Hello Elysia")
  .get('/echo', ({ path }) => path) 
  .post("/hello", "Do you miss me?")
  .decorate('note', new Note()) 
  .get('/note', ({ note }) => note.data) 
  .get(
    '/note/:index',
    ({ note, params: { index } }) => {
        return note.data[index]
    },
    { 
        params: t.Object({ 
            index: t.Number() 
        }) 
    } )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
