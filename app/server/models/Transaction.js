class Transaction {

  static CreatetransactionTable() {
    return `
        CREATE TABLE transactions(
            id BIGSERIAL UNIQUE NOT NULL PRIMARY KEY,
            Type VARCHAR(10) NOT NULL CONSTRAINT acc_type_match CHECK(Type = 'credit' OR Type = 'debit'),
            amount FLOAT NOT NULL,
            oldbalance FLOAT NOT NULL,
            newbalance FLOAT NOT NULL,
            cashier_id BIGINT NOT NULL REFERENCES users (id),
            account_id BIGINT NOT NULL REFERENCES accounts (id),
            createdOn DATE DEFAULT CURRENT_DATE);
        `;
  }

  static DropTransactionTable() {
    return 'DROP TABLE transactions CASCADE';
  }

  static AddnewTransaction(Type, amount, oldbalance, newbalance, cashierId, accountId) {
    const queryString = {
      text: `INSERT INTO transactions (Type, amount, oldbalance, newbalance, cashier_id, account_id)
                                     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      values: [Type, amount, oldbalance, newbalance, cashierId, accountId],
    };
    return queryString;
  }

  static GetTransactionById(id) {
    const queryString = {
      text: 'SELECT * FROM transactions WHERE transactions.id = $1',
      values: [id],
    };
    return queryString;
  }

  static GetAllTransactionbyUser(userid) {
    const queryString = {
      text: `SELECT transactions.createdon,transactions.type, transactions.amount,transactions.oldbalance,transactions.newbalance,accounts.accountnumber FROM transactions
       JOIN accounts ON accounts.id = transactions.account_id WHERE accounts.user_id = $1 ORDER BY transactions.createdon DESC`,
      values: [userid],
    };
    return queryString;
  }

    static GetAllUserTransactionbyAccountId(id) {
    const queryString = {
      text: 'SELECT * FROM transactions WHERE transactions.account_id = $1 ORDER BY transactions.createdon DESC',
      values: [id],
    };
    return queryString;
  }

}
export default Transaction;
