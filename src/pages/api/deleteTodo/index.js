
import { deleteDataByAny } from "../../../../services/serviceOperations";
export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      if (!id) throw new Error("ID alanı zorunludur.");
      await deleteDataByAny("todo", id);
      return res.status(200).json({ status: "success", message: "Veri silindi" });
    } catch (error) {
      return res.status(500).json({ status: "error", error: error.message });
    }
  } else {
    return res.status(405).json({ status: "error", error: "Method not allowed" });
  }
}