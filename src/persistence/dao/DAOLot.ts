import DAO from './interfaces/DAO';
import Lot from '../../models/Lot';
import LotSchema from '../schemas/LotSchema';

class DAOLot implements DAO<Lot, typeof LotSchema, number> {

};