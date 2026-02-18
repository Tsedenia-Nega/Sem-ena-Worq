import PortfolioEntity from "../../Domain/portfolioEntity.js";

class PortfolioController {
  constructor(repository) {
    this.repository = repository;
  }

  async listPortfolios(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query || {};
      const parsedPage = parseInt(page, 10);
      const parsedLimit = parseInt(limit, 10);

      if (isNaN(parsedPage) || parsedPage < 1)
        throw new Error("Page must be a positive integer.");
      if (isNaN(parsedLimit) || parsedLimit < 1)
        throw new Error("Limit must be a positive integer.");

      const portfolios = await this.repository.findAll(parsedPage, parsedLimit);
      const total = await this.repository.count();

      // NOTE: We no longer need to convert images to Base64 here.
      // The frontend will use: src={`http://localhost:5000/uploads/${portfolio.image}`}

      const result = {
        portfolios,
        pagination: {
          page: parsedPage,
          limit: parsedLimit,
          total,
          totalPages: Math.ceil(total / parsedLimit),
        },
      };

      res.json(result);
    } catch (error) {
      console.error("Error in PortfolioController.listPortfolios:", error);
      return res.status(400).json({ error: error.message || "Database error" });
    }
  }

  async getPortfolioById(req, res) {
    try {
      const { id } = req.params;
      const portfolio = await this.repository.findById(id);

      if (!portfolio) {
        return res.status(404).json({ error: "Portfolio not found" });
      }

      // EDIT: Removed the Base64 conversion. Just send the object.
      res.status(200).json(portfolio);
    } catch (error) {
      console.error(
        "Error in PortfolioController.getPortfolioById:",
        error.message,
      );
      res.status(500).json({ error: "Failed to retrieve portfolio" });
    }
  }

  async createPortfolio(req, res) {
    try {
      const { title, description, tags, visibility } = req.body;

      // EDIT: Use req.file.filename instead of buffer
      const image = req.file ? req.file.filename : null;

      const portfolioData = { title, description, tags, visibility, image };
      const portfolioEntity = new PortfolioEntity(portfolioData);

      portfolioEntity.validate();

      const result = await this.repository.create(portfolioData);

      res.status(201).json(result);
    } catch (error) {
      console.error("Error in PortfolioController.createPortfolio:", error);
      return res.status(400).json({ error: error.message || "Database error" });
    }
  }

  async updatePortfolio(req, res) {
    try {
      const { id } = req.params;
      const updatedData = { ...req.body };

      // EDIT: Use req.file.filename if a new file is uploaded
      if (req.file) {
        updatedData.image = req.file.filename;
      }

      const portfolioEntity = new PortfolioEntity(updatedData);
      portfolioEntity.validateOnUpdate();

      const result = await this.repository.updateById(id, updatedData);
      res.json({ message: "Portfolio Updated Successfully.", updated: result });
    } catch (error) {
      console.error("Error in PortfolioController.updatePortfolio:", error);
      res.status(400).json({ error: error.message });
    }
  }

  async deletePortfolio(req, res) {
    try {
      const { id } = req.params;
      const result = await this.repository.deleteById(id);
      res.json({ message: "Portfolio deleted successfully.", result });
    } catch (error) {
      console.error("Error in PortfolioController.deletePortfolio:", error);
      res.status(400).json({ error: error.message });
    }
  }
}

export default PortfolioController;
