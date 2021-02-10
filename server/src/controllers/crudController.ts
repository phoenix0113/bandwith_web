import { Request, Response } from 'express';

export class CrudController {
  static async processRequest(req: Request, res: Response, f: () => any) {
    try {
      await f();
    } catch (err) {
      console.log(req.url, 'error', err);
      res.status((err && err.status) || 500).send({
        success: false,
        error: (err && err.message) || err || 'Unknown Error',
      });
    }
  }
}
