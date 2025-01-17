import { createNewData } from "../../../../services/serviceOperations";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { title, completed = false } = req.body;
      if (!title) throw new Error("Title alanı zorunludur.");
      const newData = await createNewData("todo", { title, completed });
      return res.status(201).json({ status: "success", data: newData });
    } catch (error) {
      return res.status(500).json({ status: "error", error: error.message });
    }
  } else {
    return res.status(405).json({ status: "error", error: "Method not allowed" });
  }
}