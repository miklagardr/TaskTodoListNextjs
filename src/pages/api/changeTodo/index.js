import { updateDataByAny } from "../../../../services/serviceOperations";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { id, completed } = req.body;
      if (!id) throw new Error("ID alanı zorunludur.");
      const updatedData = await updateDataByAny("todo", id, completed);
      return res.status(200).json({ status: "success", data: updatedData });
    } catch (error) {
      return res.status(500).json({ status: "error", error: error.message });
    }
  } else {
    return res.status(405).json({ status: "error", error: "Method not allowed" });
  }
}