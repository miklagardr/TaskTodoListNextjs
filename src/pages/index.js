
import { Geist, Geist_Mono } from "next/font/google";
import { getAPI , deleteAPI , postAPI , putAPI } from "../../services/fetchAPI";
import { useState, useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");


  useEffect(() => {
    fetchTodos();
  }, []);

  // GET API: Tüm verileri getir
  const fetchTodos = async () => {
    try {
      const data = await getAPI("/getTodo");
      setTodos(data.data);
    } catch (error) {
      console.error("Veriler alınamadı:", error.message);
    }
  };

  // POST API: Yeni bir todo ekle
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const data = await postAPI("/addTodo", { title: newTodo });
      setTodos([data.data, ...todos]); // Yeni todoyu listeye ekle
      setNewTodo(""); // Inputu temizle
    } catch (error) {
      console.error("Todo eklenemedi:", error.message);
    }
  };

  // PUT API: Todo'yu güncelle
  const toggleComplete = async (id, completed) => {
    try {
      const data = await putAPI("/changeTodo", { id, completed });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: data.data.completed } : todo
        )
      );
    } catch (error) {
      console.error("Todo güncellenemedi:", error.message);
    }
  };

  // DELETE API: Todo'yu sil
  const deleteTodo = async (id) => {
    try {
      await deleteAPI(`/deleteTodo?id=${id}`);
      setTodos(todos.filter((todo) => todo.id !== id)); // Silinen todou listeden çıkar
    } catch (error) {
      console.error("Todo silinemedi:", error.message);
    }
  };

  return (
    <div className="bg-blue-900 min-h-screen  p-8">
      <div className="max-w-lg mx-auto bg-blue-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Todo List</h1>
        <div className="flex mb-6">
          <input
            type="text"
            placeholder="Yeni bir görev ekleyin..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-1 px-4 py-2 border border-blue-700 rounded-l-lg focus:outline-none focus:ring focus:ring-blue-400"
          />
          <button
            onClick={addTodo}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-r-lg font-semibold"
          >
            Ekle
          </button>
        </div>
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-blue-700 p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id, !todo.completed)}
                  className="mr-4 w-5 h-5 text-blue-500 border-blue-500 focus:ring focus:ring-blue-400"
                />
                <span
                  className={`flex-1 ${
                    todo.completed ? "line-through text-blue-300" : ""
                  }`}
                >
                  {todo.title}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="ml-4 px-3 py-1 bg-red-500 hover:bg-red-400 rounded text-sm font-semibold"
              >
                Sil
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
