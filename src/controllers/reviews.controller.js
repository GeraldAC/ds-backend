import * as ReviewsModel from "../models/reviews.model.js";

export const getAverageRating = async (req, res) => {
  const { productId } = req.params;
  try {
    const value = await ReviewsModel.getAverageRatingByProductId(productId);
    const average = parseFloat(value);
    res.status(200).json({ average });
  } catch (error) {
    console.error("Error getting average rating:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getReviewsByUserId = async (req, res) => {
  const userId = parseInt(req.params.userId);

  if (isNaN(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const reviews = await ReviewsModel.getUserReviewsWithProduct(userId);
    return res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getReviews = async (req, res) => {
  const reviews = await ReviewsModel.getAllReviews();
  res.json(reviews);
};

export const getReview = async (req, res) => {
  const review = await ReviewsModel.getReviewById(req.params.id);
  if (!review) return res.status(404).json({ message: "Review not found" });
  res.json(review);
};

export const createReview = async (req, res) => {
  const user_id = req.user.id;

  const { product_id, rating, comment } = req.body;

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

  try {
    const review = await ReviewsModel.createReview({
      product_id,
      user_id,
      rating,
      comment,
    });
    res.status(201).json(review);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating review", error: err.message });
  }
};

export const updateReview = async (req, res) => {
  const { rating } = req.body;
  if (rating && (rating < 1 || rating > 5)) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

  const updated = await ReviewsModel.updateReview(req.params.id, req.body);
  if (updated === 0)
    return res
      .status(404)
      .json({ message: "Review not found or no changes made" });
  res.json({ message: "Review updated successfully" });
};

export const deleteReview = async (req, res) => {
  const deleted = await ReviewsModel.deleteReview(req.params.id);
  if (deleted === 0)
    return res.status(404).json({ message: "Review not found" });
  res.json({ message: "Review deleted successfully" });
};
