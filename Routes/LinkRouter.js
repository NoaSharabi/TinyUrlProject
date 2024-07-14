import express from 'express';
import LinksController from '../Controllers/LinksController.js';

const LinksRouter = express.Router();

LinksRouter.post('/', LinksController.createLink);
LinksRouter.get('/', LinksController.getLinks);
// LinksRouter.get('/:id', LinksController.getLinkById);
LinksRouter.get('/redirect/:id', LinksController.getRedirect);
LinksRouter.get('/:id/clicks', LinksController.getClick);
LinksRouter.put('/:id', LinksController.updateLink);
LinksRouter.delete('/:id', LinksController.deleteLink);

export default LinksRouter;
