exports.getData = async (req, res) => {
    try {
      // Placeholder: replace with actual data retrieval logic
      const data = { message: "Data fetched successfully", user: req.user };
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send({ message: "Failed to fetch data", error: error.message });
    }
  };
