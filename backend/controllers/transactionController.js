export const getTransanctions = async (req, res, next) => {
  try {
    // const transactions = await Transaction.find();
    return res.status(200).json({
      success: true,
      //   count: transactions.length,
      //   data: transactions,
      message: "Show all transactions",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
