import Transaction from '../server/models/Transaction';
import db from '../server/db';

class TransactionService {

    static async addNewTransaction(userdata, res) {
        return new Promise((resolve, reject) => {
            const { Type, amount, oldbalance, newbalance, cashier, accountId } = userdata;
            db.querydb(Transaction.AddnewTransaction(Type, amount, oldbalance, newbalance, cashier, accountId))
                .then((result) => {
                    console.log(' account created sucessfully');
                    resolve(result.rows[0]);
                })
                .catch((err) => {
                    console.log('account create failed', err);
                    res.status(400).json({
                        status: 400,
                        Data: 'you may have entered wrong Type..',
                    });
                    reject();
                });
        })
    }

     static async getTransaction(id, res) {
        return new Promise((resolve, reject) => {  
            db.querydb(Transaction.GetTransactionById(id))
                .then((result) => {
                    console.log(' account created sucessfully');
                    resolve(result.rows[0]);
                })
                .catch((err) => {
                    console.log('account create failed', err);
                    res.status(400).json({
                        status: 400,
                        Data: 'you may have entered wrong Type..',
                    });
                    reject();
                });
        })
    }

        static async getTransactionbyAccount(id, res) {
        return new Promise((resolve, reject) => {  
            db.querydb(Transaction.GetAllUserTransactionbyAccountId(id))
                .then((result) => {
                    console.log(' Transaction returned sucessfully');
                    resolve(result.rows);
                })
                .catch((err) => {
                    console.log('Transaction failed', err);
                    res.status(500).json({
                        status: 500,
                        Data: 'Server error...',
                    });
                    reject();
                });
        })
    }


}
export default TransactionService;