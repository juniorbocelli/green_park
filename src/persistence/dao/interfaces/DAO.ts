import { Model } from 'sequelize';
interface DAO<M, S, K> {
    toModel: (schema: S) => M;
    toSchema: (model: M) => S;

    create: (model: M) => Promise<M>;
    findAll: (where?: Object) => Promise<M[]>;
    findByPk: (id: K) => Promise<M | null>;

    selectCount: (where?: object) => Promise<number>;
};

export default DAO;