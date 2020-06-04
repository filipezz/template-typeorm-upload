import { getRepository } from 'typeorm';
import { isUuid } from 'uuidv4';

import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';

interface Request {
  id: string;
}
class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionRepository = getRepository(Transaction);

    if (!isUuid(id)) {
      throw new AppError('This is not a valid uuid');
    }
    const transaction = await transactionRepository.findOne(id);
    if (!transaction) {
      throw new AppError('This transaction does not exists');
    }
    await transactionRepository.remove(transaction);
  }
}

export default DeleteTransactionService;
