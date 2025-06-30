import * as VenturesModel from "../models/ventures.model.js";

export const getVenturesByProducerId = async (req, res) => {
  try {
    const producerId = req.user.id;

    const ventures = await VenturesModel.getVenturesByProducerId(producerId);

    res.status(200).json(ventures);
  } catch (error) {
    console.error("Error al obtener ventures:", error);
    res.status(500).json({ message: "Error al obtener los emprendimientos." });
  }
};

export const getVentures = async (req, res) => {
  const ventures = await VenturesModel.getAllVentures();
  res.json(ventures);
};

export const getVenture = async (req, res) => {
  const venture = await VenturesModel.getVentureById(req.params.id);
  if (!venture) return res.status(404).json({ message: "Venture not found" });
  res.json(venture);
};

export const createVenture = async (req, res) => {
  const producer_id = req.user.id;

  const { name, description, image_url } = req.body;
  try {
    const venture = await VenturesModel.createVenture({
      name,
      description,
      image_url,
      producer_id,
    });
    res.status(201).json(venture);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating venture", error: err.message });
  }
};

export const updateVenture = async (req, res) => {
  const updated = await VenturesModel.updateVenture(req.params.id, req.body);
  if (updated === 0)
    return res
      .status(404)
      .json({ message: "Venture not found or no changes made" });
  res.json({ message: "Venture updated successfully" });
};

export const deleteVenture = async (req, res) => {
  const deleted = await VenturesModel.deleteVenture(req.params.id);
  if (deleted === 0)
    return res.status(404).json({ message: "Venture not found" });
  res.json({ message: "Venture deleted successfully" });
};
