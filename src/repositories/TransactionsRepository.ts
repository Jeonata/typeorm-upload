import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const income = transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((sum, transaction) => sum + Number(transaction.value), 0);

    const outcome = transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((sum, transaction) => sum + Number(transaction.value), 0);

    const total: number = income - outcome;

    const balace = { income, outcome, total };

    return balace;
  }
}

export default TransactionsRepository;
