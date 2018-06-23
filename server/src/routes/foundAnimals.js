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

// router.get('/:id', (req, res) => {
// 	foundAnimalsTable
// 		.getOne(req.params.id)
// 		.then(results => {
// 			res.json(results);
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			res.sendStatus(500);
// 		});
// });

router.get('/results/:type/:sex', (req, res) => {
	console.log("req.params.type = ", req.params.type);
	console.log("req.params.sex = ", req.params.sex);
	// callProcedure('spGetFoundResults', [req.body.type, req.body.sex, req.body.hairColor])
	callProcedure('spGetFoundResults', [req.params.type, req.params.sex])
		.then(results => {
			res.json(results[0]);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});

// router.get('/:userid/image/:imageid', (req, res) => {
// 	callProcedure('spGetOneUserImage', [req.params.userid, req.params.imageid])
// 		.then(results => {
// 			res.json(results[0]);
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			res.sendStatus(500);
// 		});
// });

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