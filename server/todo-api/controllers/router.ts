import express from 'express';
import controller from './controller';
import validateBodyRequest from '../middlewares/validateBodyRequest';
export default express
  .Router()
  .post('/',validateBodyRequest,  controller.create)
