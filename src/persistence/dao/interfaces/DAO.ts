import { Model } from 'sequelize';
interface DAO<M, S, K> {
    toModel: (schema: S) => M;
    toSchema: (model: M) => S;

    create: (model: M) => Promise<M>;
    findAll: (where?: Object) => Promise<M[]>;
};

export default DAO;