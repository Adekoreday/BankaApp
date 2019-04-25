import db from '../server/db';
import Account from '../server/models/Account';

class AccountService {

    static CheckifAccountExist(accountNumber) {
        return new Promise((resolve, reject) => {
            db.querydb(Account.checkifAccountExist(accountNumber))
                .then((data) => {
                    if (data.rows.length < 1) {
                        resolve(undefined);
                    } else {
                        const { id, accountnumber, status, type, balance, user_id, createdon } = data.rows[0];
                        const payload = {
                            id, accountnumber, status, type, balance, user_id, createdon,
                        };
                        resolve(payload);
                    }
                });
        });
    }

    static addNewAccount(newAccount, res) {
        return new Promise((resolve, reject) => {
            const { accountNumber, status, Type, balance } = newAccount;
            const userId = newAccount.owner;
            db.querydb(Account.AddnewAccount(accountNumber, status, Type, balance, userId))
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


    static patchAccount(userput, accountNumber, res) {

        return new Promise((resolve, reject) => {
            db.querydb(Account.UpdateAccount(userput, accountNumber))
                .then((result) => {
                    console.log(' account modified sucessfully');
                    resolve(result.rows[0]);
                })
                .catch((err) => {
                    console.log('account modify failed', err);
                    res.status(400).json({
                        status: 400,
                        Data: 'you may have entered wrong status keyword ..',
                    });
                    reject();
                });
        });
    }

    static patchAccountBalance(newbalance, accountNumber, res) {

        return new Promise((resolve, reject) => {
            db.querydb(Account.UpdateAccountBalance(newbalance, accountNumber))
                .then((result) => {
                    console.log(' account updated sucessfully');
                    resolve(result.rows[0]);
                })
                .catch((err) => {
                    console.log('account update failed', err);
                    res.status(400).json({
                        status: 400,
                        Data: 'you may have entered wrong status keyword ..',
                    });
                    reject();
                });
        });
    }


    static deleteAccount(accountNumber) {
        return new Promise((resolve, reject) => {
            db.querydb(Account.DeleteAccount(accountNumber))
                .then((result) => {
                    console.log(' account delete sucessfully');
                    resolve(result);
                })
                .catch((err) => {
                    console.log('account modify failed', err);
                    res.status(400).json({
                        status: 400,
                        Data: 'error occoured deleting user..',
                    });
                    reject();
                });
        });
        /*
        const selectedAccount = this.data.find(user => parseInt(user.accountNumber, 10) === parseInt(accountNumber, 10));
        this.data.splice(selectedAccount.id - 1, 1);
        return this.data;
        */
    }
    /*
        Existbefore(accountNumber) {
            const check = this.data.find(account => parseInt(account.accountNumber, 10) === parseInt(accountNumber, 10));
            return check;
        } */
}
export default AccountService;