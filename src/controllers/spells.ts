import { Request, Response } from 'express';
import routable from '../decorators/routable.decorator';
import { ObjectNotFoundError } from '../errors';
import { Spell } from '../models/spell';
import { DbUtilities as Db } from '../utilities/db-utilities';

export default class SpellsController {
    @routable({
        path: '/spells',
        method: 'get',
    })
    async getAllSpells(req: Request, res: Response) {
        Db.Query({}, Spell.getFactory())
            .then((data) => {
                res.status(200);
                res.send(data);
            })
            .catch((e) => {
                if (e instanceof ObjectNotFoundError) {
                    res.sendStatus(404);
                } else {
                    res.sendStatus(500);
                    console.error(e);
                }
            });
    }
}
