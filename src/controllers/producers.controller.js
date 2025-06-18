import * as ProducersModel from "../models/producers.model.js";

export const getProducers = async (req, res) => {
  const producers = await ProducersModel.getAllProducers();
  res.json(producers);
};

export const getProducer = async (req, res) => {
  const producer = await ProducersModel.getProducerById(req.params.id);
  if (!producer) return res.status(404).json({ message: "Producer not found" });
  res.json(producer);
};

export const createProducer = async (req, res) => {
  const user_id = req.user.id;
  const { bio, location, phone } = req.body;
  try {
    const producer = await ProducersModel.createProducer({
      user_id,
      bio,
      location,
      phone,
    });
    res.status(201).json(producer);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating producer", error: err.message });
  }
};

export const updateProducer = async (req, res) => {
  const updated = await ProducersModel.updateProducer(req.params.id, req.body);
  if (updated === 0)
    return res
      .status(404)
      .json({ message: "Producer not found or no changes made" });
  res.json({ message: "Producer updated successfully" });
};

export const deleteProducer = async (req, res) => {
  const deleted = await ProducersModel.deleteProducer(req.params.id);
  if (deleted === 0)
    return res.status(404).json({ message: "Producer not found" });
  res.json({ message: "Producer deleted successfully" });
};
