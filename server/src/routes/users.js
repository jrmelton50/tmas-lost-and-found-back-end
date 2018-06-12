import { Router } from 'express';
import { tokenMiddleware, isLoggedIn } from '../middleware/auth.mw';
import Table from '../table';
import { callProcedure } from '../config/db';
import { generateHash } from '../utils/bcrypt'

let router = Router();
const usersTable = new Table('users');

router.get('/me', tokenMiddleware, isLoggedIn, (req, res) => {
	res.json(req.user);
});

// Get all users
router.get('/', (req, res) => {
	usersTable
		.getAll()
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});

// Get one user by id
router.get('/:id', (req, res) => {
	usersTable
		.getOne(req.params.id)
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});

// creates a user
router.post('/', (req, res) => {
	generateHash(req.body.hash)
	.then(hash => {
		usersTable.insert({
			username: req.body.username,
			hash: hash,
			role: req.body.role
		})
		.then(results => {
			res.json(results).send(200)
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
	})
	.catch(err => {
		console.log(err);
		res.sendStatus(500);
	})
})

// updates user information
router.put('/:id', async (req, res) => {
	let usersHash = req.body.hash;
	if (req.body.password) {
		let hash = await generateHash(req.body.password);
		usersHash = hash;
	}
	usersTable
		.update(req.params.id, {
			username: req.body.username,
			hash: usersHash,
			role: req.body.role,
		})
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);	
		});
});

// deletes user
router.delete('/:id', (req, res) => {
	usersTable
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
