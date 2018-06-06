import { Router } from 'express';
// import { tokenMiddleware, isLoggedIn } from '../middleware/auth.mw';
import Table from '../table';
import { callProcedure } from '../config/db';
// import { generateHash } from '../utils/bcrypt'

let router = Router();
const foundAnimalsTable = new Table('foundanimals');

router.get('/', (req, res) => {
	foundAnimalsTable
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
	foundAnimalsTable
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
	foundAnimalsTable.insert(req.body)
		.then(results => {
			res.json(results).send(200)
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
})

router.put('/:id', (req, res) => {
	foundAnimalsTable
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
	foundAnimalsTable
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