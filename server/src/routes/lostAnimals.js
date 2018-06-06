import { Router } from 'express';
// import { tokenMiddleware, isLoggedIn } from '../middleware/auth.mw';
import Table from '../table';
import { callProcedure } from '../config/db';
// import { generateHash } from '../utils/bcrypt'

let router = Router();
const lostAnimalsTable = new Table('lostanimals');

router.get('/', (req, res) => {
	lostAnimalsTable
		.getAll()
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});

router.get('/:id', (req, res) => {
	lostAnimalsTable
		.getOne(req.params.id)
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});

router.post('/', (req, res) => {
	lostAnimalsTable.insert(req.body)
		.then(results => {
			res.json(results).send(200)
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
})

router.put('/:id', (req, res) => {
	lostAnimalsTable
		.update(req.params.id, req.body)
			.then(results => {
				res.json(results);
			})
			.catch(err => {
				console.log(err);
				res.sendStatus(500);
			});
});

router.delete('/:id', (req, res) => {
	lostAnimalsTable
		.delete(req.params.id)
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});

export default router;