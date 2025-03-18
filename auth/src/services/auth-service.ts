// Definir la estructura de usuario
interface CustomUser {
   id: string;
   name: string;
   age: number;
 }

const users: Record<string, CustomUser> = {
  "1": { id: "1", name: "Alice", age: 25 },
  "2": { id: "2", name: "Bob", age: 30 },
};

const getUserService = (id: string) => {
   return users[id] || null;
}

export default {
   getUserService
}